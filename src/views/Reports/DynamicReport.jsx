import React, { useState } from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { YearSelector } from '../../components/YearSelector'
import { InvestmentYearSelector } from '../../components/InvestmentYearSelector'
import { MetricSelector } from '../../components/MetricSelector'
import { METRICS, BY_YEAR_METRICS } from '../../utils/constants/Metrics'
import { COMPANY_DESCRIPTION } from '../../utils/constants/CompanyDescription'
import { isEmptyObject } from '../../utils/userFunctions'
import { useDynamicReport } from '../../hooks/useDynamicReport'
import HeadBodyGrid from '../../components/BodyGrid'

const useStyles = makeStyles(theme => ({
  header: {
    background: 'white'
  },
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
    top: '105px',
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
    top: '105px',
    background: '#dbdbdb'
  }
}))

export const DynamicReport = ({ fromUniverseOverview }) => {
  // eslint-disable-next-line no-unused-vars
  const [__, setType] = useState('calendar')
  const {
    metric,
    calendarYear,
    investYear,
    dynamicHeader,
    dynamicCompanyComparison,
    dynamicPeersComparison,
    isLoading,
    setMetric,
    setCalendarYear,
    setInvestYear
  } = useDynamicReport({ fromUniverseOverview, selectedMetric: 'None', selectedCalendarYear: 'None', selectedInvestYear: 'None' })
  const classes = useStyles()

  const onYearChange = (value, type) => {
    if (type === 'calendar') {
      setCalendarYear(value)
      setInvestYear('None')
    } else {
      setInvestYear(value)
      setCalendarYear('None')
    }
    setType(type)
  }

  const getSelectedMetric = (metric) => {
    const baseMetrics = METRICS.concat(BY_YEAR_METRICS)
    return baseMetrics.find(item => item.name === metric)
  }

  const onMetricChange = (value) => {
    if (value === 'None') {
      return setMetric('None')
    }
    const selectedMetric = getSelectedMetric(value)
    return setMetric(selectedMetric.name)
  }

  const getCellValue = (row, header, index) => {
    return row?.metrics && index >= 1 ? getFormatValue(row.metrics[header], header) : getFormatValue(row[header], header)
  }

  const getColumnValue = (column) => {
    const headers = [...COMPANY_DESCRIPTION, ...METRICS, ...BY_YEAR_METRICS]
    const header = headers.find(item => item.name === column)
    return header?.label || column
  }

  const getFormatValue = (value, header) => {
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    if (metric !== 'None') {
      const selectedMetric = getSelectedMetric(metric)
      return selectedMetric?.position === 'left' ? `${selectedMetric?.symbol} ${value}` : `${value} ${selectedMetric?.symbol}`
    }
    const selectedMetric = getSelectedMetric(header)
    return selectedMetric?.position === 'left' ? `${selectedMetric?.symbol} ${value}` : `${value} ${selectedMetric?.symbol}`
  }

  return (
    <Box>
        <Box sx={{ display: 'flex', marginLeft: 10 }}>
            <YearSelector
              nameOfSelect="Calendar Year"
              year={calendarYear}
              onChange={(event) => onYearChange(event.target.value, 'calendar')}
              needEmptyValue={true}
            />
            <InvestmentYearSelector
              nameOfSelect="Investment Year"
              year={investYear}
              onChange={(event) => onYearChange(event.target.value, 'investment')}
              needEmptyValue={true}
            />
        </Box>
        <Box sx={{ marginTop: 25 }}>
            <MetricSelector
              nameOfSelect="Metric"
              metric={metric}
              onChange={(event) => onMetricChange(event.target.value)}
              needEmptyValue={true}
            />
        </Box>
        <Box>
          <Box style={{ height: '50vh', display: 'grid', alignSelf: 'left', justifySelf: 'center' }}>
            {!isLoading
              ? <TableContainer component={Paper} >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {dynamicHeader.map(column => {
                          return (
                            <TableCell key={column} align={'left'} style={{ fontWeight: 'bold' }}
                              className={column === 'name' ? classes.stickyHeaderName : classes.stickyHeader}
                            >
                              {getColumnValue(column)}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                        { !fromUniverseOverview && !isEmptyObject(dynamicCompanyComparison) &&
                          <TableRow
                            key={dynamicCompanyComparison?.id}
                            style={{ backgroundColor: '#cececeb9' }}
                          >
                          {dynamicHeader.map((header, index) => (
                            <TableCell key={index} align="left"
                            className={header === 'name' ? classes.stickyCompany : classes.stickyFirstRow}
                            style={(calendarYear !== 'None' && metric === 'None') || (investYear !== 'None' && metric === 'None') ? { top: '105px' } : { top: '56.5px' }}
                            >
                              {getCellValue(dynamicCompanyComparison, header, index)}
                            </TableCell>
                          ))}
                          </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                      {dynamicPeersComparison.map((row) => (
                        <TableRow
                          key={row?.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          {dynamicHeader.map((column, index) => (
                            <TableCell key={index} align="left"
                              className={column === 'name' ? classes.sticky : ''}
                            >
                              {getCellValue(row, column, index)}
                            </TableCell>
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
