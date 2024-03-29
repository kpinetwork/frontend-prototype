import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead, TableFooter } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MetricSelector } from '../../components/MetricSelector'
import { useMetricReport } from '../../hooks/useMetricReport'
import HeadBodyGrid from '../../components/BodyGrid'
import { isEmptyObject } from '../../utils/userFunctions'
import { METRICS } from '../../utils/constants/Metrics'
import { getFromLocalStorage } from '../../utils/useLocalStorage'

const useStyles = makeStyles(theme => ({
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    zIndex: 900,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 800,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyCompany: {
    position: 'sticky',
    left: 0,
    background: '#dbdbdb',
    top: '57px',
    zIndex: 900
  },
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800
  },
  stickyFirstRow: {
    zIndex: 800,
    position: 'sticky',
    top: '57px',
    background: '#dbdbdb'
  },
  stickyFooter: {
    zIndex: 1000,
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'white',
    '& td': {
      zIndex: 800,
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14
    }
  }
}))

export const ByMetricReport = ({ fromUniverseOverview }) => {
  const {
    metric,
    years,
    metricCompanyComparison,
    metricPeersComparison,
    metricIsLoading,
    setMetric,
    averages
  } = useMetricReport({ fromUniverseOverview, selectedMetric: getFromLocalStorage('metric') || 'actuals_revenue' })
  const classes = useStyles()

  const checkValidAverages = (data) => {
    if (data == null) {
      return []
    } else return data
  }

  const validAverages = checkValidAverages(averages)

  const getColumns = () => {
    const columns = [{ field: 'name', headerName: 'Company', aling: 'left' }]
    const yearsColumns = years.map(year => ({ field: year, headerName: year, align: 'center' }))
    columns.push(...yearsColumns)
    return columns
  }

  const getValue = (value) => {
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    const selectedMetric = getSelectedMetric(metric)
    return selectedMetric.position === 'left' ? `${selectedMetric.symbol} ${value}` : `${value} ${selectedMetric.symbol}`
  }

  const getSelectedMetric = (metric) => {
    return METRICS.find(item => item.name === metric)
  }
  const onChangeMetric = (value) => {
    const selectedMetric = getSelectedMetric(value)
    setMetric(selectedMetric.name)
  }

  return (
    <Box>
        <Box >
            <MetricSelector
              nameOfSelect="Metric"
              metric={metric}
              onChange={(event) => onChangeMetric(event.target.value)}
              needEmptyValue={false}
            />
        </Box>
        <Box>
          <Box style={{ height: '50vh', display: 'grid', alignSelf: 'left', justifySelf: 'center' }}>
            {!metricIsLoading
              ? <TableContainer component={Paper} >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow >
                        {getColumns().map(column => {
                          return (
                            <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold' }}
                              className={column?.field === 'name' ? classes.stickyHeaderName : classes.stickyHeader}
                            >
                              {column.headerName}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                        { !fromUniverseOverview && !isEmptyObject(metricCompanyComparison) &&
                          <TableRow
                          key={metricCompanyComparison?.id}
                            style={{ backgroundColor: '#cececeb9' }}
                          >
                            <TableCell align="left" className={classes.stickyCompany}>
                              {metricCompanyComparison.name}
                            </TableCell>
                          {years.map((year, index) => (
                            <TableCell key={index} align="center" className={classes.stickyFirstRow}>{getValue(metricCompanyComparison.metrics[year])}</TableCell>
                          ))}
                          </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                      {metricPeersComparison.map((row) => (
                        <TableRow
                          key={row?.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="left" className={classes.sticky}>{row.name}</TableCell>
                          {years.map((year, index) => (
                            <TableCell key={index} align="center">{getValue(row.metrics[year])}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter className={classes.stickyFooter}>
                      <TableRow>
                        <TableCell>Average</TableCell>
                        {years.map((year, index) => (
                          <TableCell key={index} align="center">{getValue(validAverages[year])}</TableCell>
                        ))}
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              : <HeadBodyGrid/>}
          </Box>
        </Box>
    </Box>
  )
}
