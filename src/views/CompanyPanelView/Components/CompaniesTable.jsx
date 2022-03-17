/* eslint-disable camelcase */
import React, { useState } from 'react'
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
  const [offset, setOffset] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { total, companies, isLoading, getCompanyPanel } = useCompanyPanel({ limit: rowsPerPage, offset })
  const [wantsChange, setChange] = useState(false)
  const [page, setPage] = useState(0)
  const [companiesToChange, setCompaniesToChange] = useState({})
  const classes = useStyles()

  const isCompanyChecked = (company) => {
    const { is_public, id } = company
    if (id in companiesToChange) {
      return companiesToChange[id]
    }
    return is_public
  }

  const handleChange = (event, company) => {
    const checked = event.target.checked
    const { is_public, id } = company
    setCompaniesToChange(prev => {
      if (checked !== is_public) {
        return ({ ...prev, [id]: !is_public })
      } else {
        delete prev[id]
        return ({ ...prev })
      }
    })
  }

  const onSave = async (_) => {
    if (Object.keys(companiesToChange).length > 0) {
      await changeCompanyPublicly({ companies: companiesToChange })
    }
    setChange(false)
    await getCompanyPanel({ limit: rowsPerPage, offset })
  }

  const handleChangePage = (_event, newPage) => {
    const nextOffset = newPage * rowsPerPage
    setOffset(nextOffset)
    setPage(newPage)
    getCompanyPanel({ limit: rowsPerPage, offset: nextOffset })
  }

  const handleChangeRowsPerPage = (event) => {
    const newOffset = 0
    const nextRowPerPage = +event.target.value
    setRowsPerPage(nextRowPerPage)
    setPage(0)
    setOffset(newOffset)
    getCompanyPanel({ limit: nextRowPerPage, offset: newOffset })
  }

  const onCancel = async (_) => {
    setCompaniesToChange({})
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
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.sector}</TableCell>
                <TableCell className={classes.hide}>{company.vertical}</TableCell>
                <TableCell>
                  <Checkbox onChange={(e) => handleChange(e, company)}
                  color="primary" disabled={!wantsChange}
                  checked={isCompanyChecked(company)}
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
                  count={total}
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
