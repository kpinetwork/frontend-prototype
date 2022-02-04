import React, { useState } from 'react'
import { Box, Button, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Settings } from '@material-ui/icons'
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
  const { companies, isLoading } = useCompanyPanel()
  const [wantsChange, setChange] = useState(false)
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const classes = useStyles()

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

  return (
    <div className={classes.root}>
      {!wantsChange &&
        <Box className={classes.row}>
          <Button onClick={(_) => setChange(true)}
          className={classes.textButton}
          startIcon={<Settings style={{ color: '#364b8a' }}/>}
          >
            Change public data
          </Button>
        </Box>
      }
      {
        wantsChange &&
        <Box pb={5}>
          <Typography variant="body2">Select all the companies that will have their information publicly.</Typography>
        </Box>
      }
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.head}>Name</TableCell>
              <TableCell className={classes.head}>Sector</TableCell>
              <TableCell className={`${classes.hide} ${classes.head}`}>Vertical</TableCell>
              <TableCell className={classes.head}>Public data</TableCell>
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
        onOk={(_) => setChange(false)}
        onCancel={(_) => setChange(false)}
        okName="Save"
        cancelName="Cancel"
       />
      }
    </div>
  )
}
