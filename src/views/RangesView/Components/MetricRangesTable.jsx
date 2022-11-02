import React, { Fragment } from 'react'
import { Box, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableFooter, Paper, TableContainer } from '@material-ui/core'
import LoadingProgress from '../../../components/Progress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((_theme) => ({
  root: {
    width: '100%'
  },
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    color: 'white',
    fontWeight: 'bold'
  },
  name: {
    '&.MuiTableCell-root': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      width: '50%'
    }
  }
}))

export const MetricRangesTable = ({
  page,
  total,
  ranges,
  isLoading,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  const classes = useStyles()

  return (
    <Box my={2}>
      {
        !isLoading &&
        <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.root}>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.head}>Metric</TableCell>
              <TableCell className={classes.head}>From</TableCell>
              <TableCell className={classes.head}>To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              ranges.map((metric, index) => {
                const metricKey = `${index}-${metric.key}`
                return (
                  <Fragment key={`${metricKey}-name`}>
                    <TableRow>
                      <TableCell
                        rowSpan={metric.ranges.length + 1}
                        className={classes.name}
                      >
                        {metric.name}
                      </TableCell>
                    </TableRow>
                    {
                      metric.ranges.map(range => (
                        <TableRow key={`${metricKey}-${range?.label}`}>
                          <TableCell key={`${metricKey}-from`}>
                            {range?.min_value}
                          </TableCell>
                          <TableCell key={`${metricKey}-to`}>
                            {range?.max_value}
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </Fragment>
                )
              })
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(event) => handleChangeRowsPerPage(event.target.value)}
              >
              </TablePagination>
            </TableRow>
          </TableFooter>
        </Table>
        </TableContainer>
      }
      {
        isLoading &&
        <LoadingProgress/>
      }
    </Box>
  )
}
