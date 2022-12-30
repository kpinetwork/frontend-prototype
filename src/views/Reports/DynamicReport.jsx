import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead, TableFooter } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { YearSelector } from '../../components/YearSelector'
import { MetricSelector } from '../../components/MetricSelector'
import { METRICS, BY_YEAR_METRICS } from '../../utils/constants/Metrics'
import { COMPANY_DESCRIPTION } from '../../utils/constants/CompanyDescription'
import { isEmptyObject } from '../../utils/userFunctions'
import { useDynamicReport } from '../../hooks/useDynamicReport'
import { getFromLocalStorage } from '../../utils/useLocalStorage'
import HeadBodyGrid from '../../components/BodyGrid'
import CustomTooltipTitle from '../../components/CustomTooltip'

const useStyles = makeStyles(theme => ({
  header: {
    background: 'white'
  },
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
  },
  stickyFooter: {
    zIndex: 1000,
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'white',
    '& td': {
      zIndex: 800,
      color: 'black',
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 14
    }
  }
}))

export const DynamicReport = ({ fromUniverseOverview }) => {
  const {
    metrics,
    calendarYear,
    dynamicHeader,
    dynamicCompanyComparison,
    dynamicPeersComparison,
    averages,
    isLoading,
    setMetrics,
    setCalendarYear
  } = useDynamicReport({
    fromUniverseOverview,
    selectedMetrics: getFromLocalStorage('metrics') || ['None'],
    selectedCalendarYear: getFromLocalStorage('calendarYear') || 'None'
  })
  const classes = useStyles()

  const onYearChange = (value, _type) => {
    setCalendarYear(value)
  }

  const getSelectedMetric = (metric) => {
    const baseMetrics = METRICS.concat(BY_YEAR_METRICS)
    return baseMetrics.find(item => item.name === metric)
  }

  const onMetricChange = (value) => {
    if (metrics.includes('None') && value.includes('None')) {
      const newMetrics = value.filter(metric => metric !== 'None')
      setMetrics(newMetrics)
    } else if (!metrics.includes('None') && value.includes('None')) {
      setMetrics(['None'])
    } else {
      setMetrics(value)
    }
  }

  const getCellValue = (row, header, index) => {
    return row?.metrics && index >= 1
      ? getFormatValue(row.metrics[header], header)
      : getFormatValue(row[header], header)
  }

  const getColumnHeader = (column) => {
    const header = [...COMPANY_DESCRIPTION, ...METRICS, ...BY_YEAR_METRICS].find(item => item.name === column)
    if (isEmptyObject(header)) {
      return { label: column, hoverText: null }
    }
    return header
  }

  const getColumnComponentValue = (column) => {
    const header = getColumnHeader(column)
    return header.hoverText == null
      ? header.label
      : <CustomTooltipTitle
        name={header.label}
        title={header.hoverText}
        justifyContent={'flex-start'}
      />
  }

  const getFormatValue = (value, header) => {
    if (value == null) {
      return 'NA'
    }
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    if (!metrics.includes('None') && metrics.length !== 0) {
      const selectedMetric = getSelectedMetric(header)
      return selectedMetric?.position === 'left' ? `${selectedMetric?.symbol} ${value}` : `${value} ${selectedMetric?.symbol}`
    }
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
        </Box>
        <Box sx={{ marginTop: 25 }}>
            <MetricSelector
              nameOfSelect="Metric"
              metric={metrics}
              onChange={(event) => onMetricChange(event.target.value)}
              needEmptyValue={true}
              fromDynamicReport={true}
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
                              {getColumnComponentValue(column)}
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
                            style={
                              (calendarYear !== 'None' && metrics.includes('None'))
                                ? { top: '105px' }
                                : { top: '56.5px' }}
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
                    <TableFooter className={classes.stickyFooter}>
                      <TableRow>
                        <TableCell align={'left'}>Averages</TableCell>
                        {dynamicHeader.slice(1).map((metric, index) => (
                            <TableCell key={index} align="left">
                              {getFormatValue(averages[metric], metric)}
                            </TableCell>
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
