import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead } from '@material-ui/core'
import { MetricSelector } from '../../components/MetricSelector'
import { useMetricReport } from '../../hooks/useMetricReport'
import HeadBodyGrid from '../../components/BodyGrid'
import { isEmptyObject } from '../../utils/userFunctions'
import { METRICS } from '../../utils/constants/Metrics'

export const ByMetricReport = ({ fromUniverseOverview }) => {
  const {
    metric,
    years,
    metricCompanyComparison,
    metricPeersComparison,
    metricIsLoading,
    setMetric
  } = useMetricReport({ fromUniverseOverview, selectedMetric: 'actuals_revenue' })

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
            />
        </Box>
        <Box>
          <Box style={{ height: '50vh', display: 'grid', alignSelf: 'left', justifySelf: 'center' }}>
            {!metricIsLoading
              ? <TableContainer component={Paper} >
                  <Table>
                    <TableHead>
                      <TableRow >
                        {getColumns().map(column => {
                          return (
                            <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold' }}>
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
                            <TableCell align="left">{metricCompanyComparison.name}</TableCell>
                          {years.map((year, index) => (
                            <TableCell key={index} align="center">{getValue(metricCompanyComparison.metrics[year])}</TableCell>
                          ))}
                          </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                      {metricPeersComparison.map((row) => (
                        <TableRow
                          key={row?.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="left">{row.name}</TableCell>
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
