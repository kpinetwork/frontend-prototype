/* eslint-disable camelcase */
import React from 'react'
import { Box, Button, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Settings } from '@material-ui/icons'
import LoadingProgress from './../../../components/Progress'
import ButtonActions from './../../../components/Actions'
import useCompaniesPanelTable from '../../../hooks/useCompaniesPanelTable'

const useStyles = makeStyles(theme => ({
  hide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  root: {
    [theme.breakpoints.up('md')]: {
      width: '80%'
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
  const classes = useStyles()
  const { rowsPerPage, wantsChange, setChange, isLoading, companies, handleChange, isCompanyChecked, total, page, handleChangePage, handleChangeRowsPerPage, cleanCompaniesToChange, onSave } = useCompaniesPanelTable()

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
              <TableCell className={classes.head}>ID</TableCell>
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
                <TableCell>{company.id}</TableCell>
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
