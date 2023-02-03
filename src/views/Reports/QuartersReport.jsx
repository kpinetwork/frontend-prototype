import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableHead, TableBody, TableFooter } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { QuartersMetricSelector } from '../../components/QuartersMetricSelector'
import { TypeOfReportSelector } from '../../components/TypeOfReportSelector'
import { YearSelector } from '../../components/YearSelector'
import { ScenarioSelector } from '../../components/ScenarioSelector'
import { useQuartersReport } from '../../hooks/useQuartersReport'
import HeadBodyGrid from '../../components/BodyGrid'
import { TYPEOFREPORT, SCENARIOS } from '../../utils/constants/QuartersReportOptions'
import { TOTALMETRICS } from '../../utils/constants/Metrics'
import { getFromLocalStorage } from '../../utils/useLocalStorage'

const useStyles = makeStyles(theme => ({
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    zIndex: 900,
    backgroundColor: '#2F5487',
    color: 'white'
  },
  stickyPeriodName: {
    position: 'sticky',
    left: 0,
    background: '#DBDBDB',
    top: '57px',
    zIndex: 800
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 700,
    backgroundColor: '#2F5487',
    color: 'white'
  },
  stickyPeriod: {
    position: 'sticky',
    left: 0,
    background: '#DBDBDB',
    top: '57px',
    zIndex: 700
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
    background: '#DBDBDB'
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
  },
  stickyColumn: {
    position: 'sticky',
    left: 0,
    background: 'white',
    top: '105px',
    zIndex: 700
  }
}))

export const QuartersReport = ({ fromUniverseOverview }) => {
  const {
    metric,
    typeOfReport,
    years,
    scenario,
    headers,
    averages,
    subHeaders,
    metricPeersComparison,
    metricIsLoading,
    setMetric,
    setTypeOfReport,
    setYears,
    setScenario
  } = useQuartersReport({
    fromUniverseOverview,
    selectedTypeOfReport: getFromLocalStorage('typeOfReport') || 'year_to_year',
    selectedYears: getFromLocalStorage('quarters_years') || [],
    selectedScenario: getFromLocalStorage('scenario') || 'Actual',
    selectedMetric: getFromLocalStorage('quarter_metric') || ''
  })

  const classes = useStyles()
  const getColumns = () => {
    const columns = headers
    return columns
  }

  const getCountOfYearsFromHeaders = () => {
    let yearCount = 0
    headers.forEach(header => {
      if (!isNaN(header) && header >= 1000) {
        yearCount++
      }
    })
    return yearCount
  }

  const getSelectedTypeOfReport = (metric) => {
    return TYPEOFREPORT.find(item => item.name === metric)
  }
  const onChangeTypeOfReport = (value) => {
    const selectedTypeOfReport = getSelectedTypeOfReport(value)
    setTypeOfReport(selectedTypeOfReport.name)
  }

  const getSelectedScenario = (scenario) => {
    return SCENARIOS.find(item => item.name === scenario)
  }
  const onChangeScenario = (value) => {
    const selectedScenario = getSelectedScenario(value)
    setScenario(selectedScenario.name)
  }

  const onYearsChange = (value) => {
    const yearsSelected = value.map(item => item)
    setYears(yearsSelected)
  }

  const getFormatValue = (value) => {
    if (value == null) {
      return 'NA'
    }
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    return '$' + value
  }

  const getTableCell = (item, index, property) => {
    return (
      <TableCell key={`${item.id}-${index}-${property}`} align={'center'}>
        {getFormatValue(item.quarters[index][property])}
      </TableCell>
    )
  }

  const renderQuarterCells = (item) => {
    const quarterCells = []
    quarterCells.push(
      <React.Fragment key={`${item.id}-QuartersCells-0`}>
        {getTableCell(item, 0, 'Q1')}
        {getTableCell(item, 0, 'Q2')}
        {getTableCell(item, 0, 'Q3')}
        {getTableCell(item, 0, 'Q4')}
        {getTableCell(item, 0, 'full_year')}
    </React.Fragment>
    )
    for (let yearIndex = 1; yearIndex < getCountOfYearsFromHeaders(); yearIndex++) {
      quarterCells.push(
        <React.Fragment key={`${item.id}-QuartersCells-${yearIndex}`}>
          {getTableCell(item, yearIndex, 'Q1')}
          {getTableCell(item, yearIndex, 'Q2')}
          {getTableCell(item, yearIndex, 'Q3')}
          {getTableCell(item, yearIndex, 'Q4')}
          {getTableCell(item, yearIndex, 'full_year')}
          {getTableCell(item, yearIndex, 'vs')}
        </React.Fragment>
      )
    }
    return quarterCells
  }
  const getSelectedMetric = (metric) => {
    return TOTALMETRICS.find(item => item.tableName === metric)
  }

  const onChangeMetric = (_event, value) => {
    const selectedMetric = getSelectedMetric(value.tableName)
    setMetric(selectedMetric.tableName)
  }

  return (
    <Box>
        <Box >
            <TypeOfReportSelector
              nameOfSelect="Type of report"
              typeOfReport={typeOfReport}
              onChange={(event) => onChangeTypeOfReport(event.target.value)}
              needEmptyValue={false}
            />
        </Box>
        <Box style={{ display: 'flex' }}>
          <Box >
            <ScenarioSelector
              nameOfSelect="Scenario"
              scenario={scenario}
              onChange={(event) => onChangeScenario(event.target.value)}
              needEmptyValue={false}
            />
          </Box>
          <Box style={{ marginLeft: 100 }}>
            <QuartersMetricSelector
              nameOfSelect="Metric"
              metric={metric}
              onChange={onChangeMetric}
              needEmptyValue={false}
            />
          </Box>
          <Box style={{ marginLeft: 100 }}>
            <YearSelector
              nameOfSelect="Calendar Year"
              year={years}
              onChange={(event) => onYearsChange(event.target.value)}
              needEmptyValue={false}
              isMultiple={true}
              sizeOfSelector={'medium'}
            />
          </Box>
        </Box>
        <Box>
          <Box style={{ height: '70vh', display: 'grid', alignSelf: 'left', justifySelf: 'center' }}>
            {!metricIsLoading
              ? <TableContainer component={Paper} >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow >
                        {getColumns().map((column, index) => {
                          return (
                            <TableCell key={`${index}-headers`} align={'center'} style={{ fontWeight: 'bold' }}
                              className={index === 0 ? classes.stickyHeaderName : classes.stickyHeader}>
                              {column}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                      <TableRow >
                        {subHeaders.map((subHeader, index) => {
                          return (
                            <TableCell key={`${index}-subHeaders`} align={'center'} style={{ fontWeight: 'bold' }}
                            className={ index === 0 ? classes.stickyPeriodName : classes.stickyPeriod} >
                              {subHeader}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {metricPeersComparison.map((item) => {
                          return (
                            <TableRow key={item.id} >
                            <TableCell className={classes.stickyColumn}>
                              {item.name}
                            </TableCell>
                              {renderQuarterCells(item)}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                    <TableFooter className={classes.stickyFooter}>
                      <TableRow>
                        <TableCell className={classes.stickyColumn}>Average</TableCell>
                        {
                          subHeaders.slice(1).map((subHeader, index) => {
                            return (
                              <TableCell key={index}>
                                {
                                  getFormatValue(averages[index][subHeader])
                                }
                              </TableCell>
                            )
                          })
                        }
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
