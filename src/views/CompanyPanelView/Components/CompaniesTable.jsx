import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Settings } from '@material-ui/icons'
import { changeCompanyPublicly } from '../../../service/changeCompanyPublicly'
import useCompanyPanel from '../../../hooks/useCompanyPanel'
import LoadingProgress from './../../../components/Progress'
import ButtonActions from './../../../components/Actions'

const useStyles = makeStyles(theme => ({
  hide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  root: {
    [theme.breakpoints.up('md')]: {
      width: '80vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    color: 'white',
    fontWeight: 'bold'
  },
  textButton: {
    textTransform: 'none',
    marginRight: 10
  },
  row: {
    flexDirection: 'row-reverse',
    display: 'flex',
    paddingBottom: 10
  }
}))

export function CompaniesPanelTable () {
  const { companies, isLoading, getCompanyState } = useCompanyPanel()
  const [wantsChange, setChange] = useState(false)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const classes = useStyles()

  useEffect(() => {
    mapPublicCompanies()
  }, [companies])

  const mapPublicCompanies = () => setSelected(companies.filter(company => company.is_public).map(company => company.id))

  const handleChange = (event, companyId) => {
    const checked = event.target.checked
    setSelected(prev => {
      if (checked) {
        return [...prev, companies.find(company => company.id === companyId)?.id]
      } else {
        return prev.filter(id => id !== companyId)
      }
    })
  }

  const getChangedCompanies = (companies, selected) => {
    return {
      companies: companies.filter(company => {
        // eslint-disable-next-line camelcase
        const { is_public, id } = company
        // eslint-disable-next-line camelcase
        if ((is_public && selected.includes(id)) || (!is_public && !selected.includes(id))) {
          return false
        }
        return true
        // eslint-disable-next-line camelcase
      }).reduce((prev, { id, is_public }) => ({ ...prev, [id]: !is_public }), {})
    }
  }

  const onSave = async (_) => {
    const companiesToChange = getChangedCompanies(companies, selected)
    if (Object.keys(companiesToChange.companies).length > 0) {
      await changeCompanyPublicly(getChangedCompanies(companies, selected))
    }
    setChange(false)
    await getCompanyState()
  }

  const isSelected = (company, selectedIds) => {
    return selectedIds.some(id => id === company?.id)
  }

  const handleChangePage = (_event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const onCancel = async (_) => {
    mapPublicCompanies()
    setChange(false)
  }

  return (
    <div className={classes.root}>
      {!wantsChange &&
        <Box className={classes.row}>
          <Button onClick={(_) => setChange(true)}
          className={classes.textButton}
          startIcon={<Settings style={{ color: '#364b8a' }}/>}
          >
            Change publicly
          </Button>
        </Box>
      }
      {
        wantsChange &&
        <Box pb={5}>
          <Typography variant="body2">Select all the companies that will be shared over KPI.</Typography>
        </Box>
      }
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.head}>Name</TableCell>
              <TableCell className={classes.head}>Sector</TableCell>
              <TableCell className={`${classes.hide} ${classes.head}`}>Vertical</TableCell>
              <TableCell className={classes.head}>Public</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
            {companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.sector}</TableCell>
                <TableCell className={classes.hide}>{company.vertical}</TableCell>
                <TableCell>
                  <Checkbox onChange={(e) => handleChange(e, company.id)}
                  color="primary" disabled={!wantsChange}
                  checked={isSelected(company, selected)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          )}
          {isLoading &&
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  <LoadingProgress />
                </TableCell>
            </TableRow>
            </TableBody>
           }
           {!isLoading &&
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={companies.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                >
                </TablePagination>
              </TableRow>
           </TableFooter>
          }
        </Table>
      </TableContainer>
      {wantsChange &&
        <ButtonActions
        onOk={onSave}
        onCancel={onCancel}
        okName="Save"
        cancelName="Cancel"
       />
      }
    </div>
  )
}
