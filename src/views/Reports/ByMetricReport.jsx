import React, { useEffect } from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MetricSelector } from '../../components/MetricSelector'
import { useMetricReport } from '../../hooks/useMetricReport'
import HeadBodyGrid from '../../components/BodyGrid'
import { isEmptyObject } from '../../utils/userFunctions'
import { METRICS } from '../../utils/constants/Metrics'
import { getLocalStorage, setLocalStorage } from '../../utils/useLocalStorage'

const useStyles = makeStyles(theme => ({
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 900
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800
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
  }
}))

export const ByMetricReport = ({ fromUniverseOverview }) => {
  const {
    metric,
    years,
    metricCompanyComparison,
    metricPeersComparison,
    metricIsLoading,
    setMetric
  } = useMetricReport({ fromUniverseOverview, selectedMetric: JSON.parse(localStorage.getItem('metric')) || 'actuals_revenue' })
  const classes = useStyles()

  useEffect(() => {
    const storedMetric = getLocalStorage('metric')

    if (storedMetric) {
      setMetric(storedMetric)
    }
  }, [])

  useEffect(() => {
    setLocalStorage('metric', metric)
  }, [metric])

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
                  </Table>
                </TableContainer>
              : <HeadBodyGrid/>}
          </Box>
        </Box>
    </Box>
  )
}
