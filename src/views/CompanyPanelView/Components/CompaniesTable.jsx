/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Settings } from '@material-ui/icons'
import { changeCompanyPublicly } from '../../../service/changeCompanyPublicly'
import useCompanyPanel from '../../../hooks/useCompanyPanel'
import useCompaniesToChange from '../../../hooks/useCompaniesToChange'
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
  const { total, companies, setCompanies, isLoading, getCompanyPanel } = useCompanyPanel({ limit: rowsPerPage, offset })
  const [wantsChange, setChange] = useState(false)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [totalCompanies, setTotalCompanies] = useState([])
  const { companiesToChange, isCompanyChecked, handleChange, cleanCompaniesToChange } = useCompaniesToChange()
  const classes = useStyles()

  useEffect(() => {
    initCompanies(rowsPerPage, offset)
  }, [])

  const initCompanies = async (limit, offset) => {
    const response = await getCompanyPanel({ limit: limit, offset })
    setTotalCompanies(response)
  }

  const callNextCompanies = async (newPage) => {
    const nextOffset = newPage * rowsPerPage
    setOffset(nextOffset)
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getCompanyPanel({ limit: rowsPerPage, offset: nextOffset })
    setTotalCompanies([...totalCompanies, ...response])
  }

  const setCompaniesFromTotalCompanies = (newPage, newRowsPerPage) => {
    setPage(newPage)
    const offset = newPage * newRowsPerPage
    const max = (newPage - page) < 0 ? page * newRowsPerPage : offset + newRowsPerPage
    setCompanies(totalCompanies.slice(offset, max))
  }

  const onSave = async (_) => {
    if (Object.keys(companiesToChange).length > 0) {
      await changeCompanyPublicly({ companies: companiesToChange })
    }
    setChange(false)
    await getCompanyPanel({ limit: rowsPerPage, offset: page * rowsPerPage })
  }

  const handleChangePage = (_event, newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (newPage > page && firstTimeCalled) {
      callNextCompanies(newPage)
    } else {
      setCompaniesFromTotalCompanies(newPage, rowsPerPage)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    const newOffset = 0
    const nextRowPerPage = +event.target.value
    setRowsPerPage(nextRowPerPage)
    setPage(0)
    setOffset(newOffset)
    setMaxPage(0)
    initCompanies(nextRowPerPage, newOffset)
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
                  <Checkbox onChange={(event) => handleChange({ event, company, field: 'is_public' })}
                  color="primary" disabled={!wantsChange}
                  checked={isCompanyChecked({ company, field: 'is_public' })}
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
        onCancel={() => {
          cleanCompaniesToChange()
          setChange(false)
        }}
        okName="Save"
        cancelName="Cancel"
       />
      }
    </div>
  )
}
