import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableHead, TableBody, TableFooter } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { QuartersMetricSelector } from '../../components/QuartersMetricSelector'
import { TypeOfReportSelector } from '../../components/TypeOfReportSelector'
import { YearSelector } from '../../components/YearSelector'
import { ScenarioSelector } from '../../components/ScenarioSelector'
import { PeriodSelector } from '../../components/PeriodSelector'
import { useQuartersReport } from '../../hooks/useQuartersReport'
import { isEmptyObject } from '../../utils/userFunctions'
import HeadBodyGrid from '../../components/BodyGrid'
import { TYPEOFREPORT, SCENARIOS } from '../../utils/constants/QuartersReportOptions'
import { TOTALMETRICS, QUARTERSEXCLUDEDMETRICS, METRIC_PERIOD_NAMES } from '../../utils/constants/Metrics'
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
  stickyHeaderWithLimitator: {
    position: 'sticky',
    left: 0,
    zIndex: 700,
    backgroundColor: '#2F5487',
    color: 'white',
    borderLeftStyle: 'solid',
    borderLeftColor: '#4670ab',
    borderLeftWidth: 1
  },
  stickyFirstPeriod: {
    position: 'sticky',
    left: 0,
    background: '#DBDBDB',
    top: '57px',
    zIndex: 700,
    whiteSpace: 'nowrap',
    borderLeftStyle: 'solid',
    borderLeftColor: '#c9c7c7',
    borderLeftWidth: 1
  },
  stickyPeriod: {
    position: 'sticky',
    left: 0,
    background: '#DBDBDB',
    top: '57px',
    zIndex: 700,
    whiteSpace: 'nowrap'
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
  stickySecondRow: {
    zIndex: 700,
    position: 'sticky',
    top: '114px',
    background: '#DBDBDB'
  },
  stickyFirstCompany: {
    zIndex: 800,
    position: 'sticky',
    top: '114px',
    background: '#F2F2F2'
  },
  stickyStaticCompanyData: {
    zIndex: 700,
    position: 'sticky',
    top: '114px',
    background: '#F2F2F2'
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
  },
  vsCell: {
    backgroundColor: '#F2F2F2',
    color: 'black',
    fontWeight: 'bold',
    borderRightStyle: 'solid',
    borderRightColor: '#F2F2F2',
    borderRightWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: '#F2F2F2',
    borderLeftWidth: 1
  },
  vsStaticCell: {
    zIndex: 700,
    position: 'sticky',
    top: '114px',
    background: '#F2F2F2',
    backgroundColor: '#F2F2F2',
    color: 'black',
    fontWeight: 'bold',
    borderRightStyle: 'solid',
    borderRightColor: '#e3e3e3',
    borderRightWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: '#e3e3e3',
    borderLeftWidth: 1
  },
  normalCell: {
    backgroundColor: 'white',
    color: 'black'
  },
  cellWithLimitator: {
    borderLeftStyle: 'solid',
    borderLeftColor: '#DBDBDB',
    borderLeftWidth: 1
  }
}))

export const QuartersReport = ({ fromUniverseOverview }) => {
  const {
    yearSelectorOpened,
    metric,
    typeOfReport,
    years,
    scenario,
    period,
    headers,
    averages,
    subHeaders,
    metricPeersComparison,
    metricCompanyComparison,
    metricIsLoading,
    setYearSelectorOpened,
    setMetric,
    setTypeOfReport,
    setYears,
    setScenario,
    setPeriod
  } = useQuartersReport({
    fromUniverseOverview,
    selectedTypeOfReport: getFromLocalStorage('typeOfReport') || 'year_to_year',
    selectedYears: getFromLocalStorage('quarters_years') || [],
    selectedScenario: getFromLocalStorage('scenario') || 'Actual',
    selectedMetric: getFromLocalStorage('quarter_metric') || '',
    selectedPeriod: getFromLocalStorage('quarter_period') || 'Q1'
  })

  const classes = useStyles()
  const actualMetric = TOTALMETRICS.concat(QUARTERSEXCLUDEDMETRICS).find(item => item.tableName === metric)
  let headerCounter = 0
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
    if (selectedScenario.name === 'budget' && QUARTERSEXCLUDEDMETRICS.some((excludedMetric) => excludedMetric.tableName === metric)) {
      setMetric(TOTALMETRICS[0].tableName)
    }
  }
  const getSelectedPeriod = (period) => {
    return METRIC_PERIOD_NAMES.find(item => item.name === period)
  }
  const onChangePeriod = (value) => {
    const selectedPeriod = getSelectedPeriod(value)
    setPeriod(selectedPeriod.name)
  }

  const onYearsChange = (value) => {
    const yearsSelected = value.map(item => item)
    setYears(yearsSelected)
    setYearSelectorOpened(false)
  }
  const handleCloseYearSelect = () => {
    setYearSelectorOpened(false)
  }

  const handleOpenYearSelect = () => {
    setYearSelectorOpened(true)
  }

  const getFormatValue = (value, property) => {
    if (value == null) {
      return 'NA'
    }
    if (value === 'NA' || isNaN(value)) {
      return value
    }

    value = Number(value).toFixed(2)
    if (actualMetric.name === 'CAC ratio' || actualMetric.name === 'CLV/CAC ratio') value = value.toFixed(2) + 'x'

    if (property === 'vs') return value + '%'
    return (actualMetric?.position === 'left' ? actualMetric?.symbol + value : value + actualMetric?.symbol)
  }

  const getTableCell = (item, index, isStatic) => {
    headerCounter++
    let cellClassName = classes.normalCell
    if (subHeaders[headerCounter] === 'vs') {
      cellClassName = !isStatic ? classes.vsCell : classes.vsStaticCell
    }
    if (isStatic) {
      cellClassName = classes.stickyStaticCompanyData
    }

    if ((headers[headerCounter] > 2000 && typeOfReport !== 'last_twelve_months')) {
      cellClassName = classes.cellWithLimitator
    }
    return (
      <TableCell key={`${item.id}-${index}-${subHeaders[headerCounter]}`} align={'center'} className= {cellClassName} >
        {getFormatValue(item.quarters[index][subHeaders[headerCounter]], subHeaders[headerCounter])}
      </TableCell>
    )
  }
  const renderRowBySpaces = (numberOfRows, item, index, isStatic) => {
    const allCells = []
    for (let i = 0; i < numberOfRows; i++) {
      allCells.push(
        getTableCell(item, index, isStatic)
      )
    }
    return allCells
  }

  const renderQuarterCells = (item, isStatic) => {
    headerCounter = 0
    const quarterCells = []
    for (let yearIndex = 0; yearIndex < getCountOfYearsFromHeaders(); yearIndex++) {
      quarterCells.push(
        <React.Fragment key={`${item.id}-QuartersCells-${yearIndex}`}>
          {renderRowBySpaces(Object.values(item.quarters[yearIndex]).length - 1, item, yearIndex, isStatic)}
        </React.Fragment>
      )
    }
    return quarterCells
  }
  const getSelectedMetric = (metric) => {
    return TOTALMETRICS.concat(QUARTERSEXCLUDEDMETRICS).find(item => item.tableName === metric)
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
              selectedScenario={scenario}
            />
          </Box>
          <Box style={{ marginLeft: 10 }}>
          {
            typeOfReport === 'year_to_date' && <PeriodSelector
              nameOfSelect="Period"
              period={period}
              onChange={(event) => onChangePeriod(event.target.value)}
            />
          }
          </Box>
          <Box style={{ marginLeft: 35 }}>
            <YearSelector
              nameOfSelect="Calendar Year"
              year={years}
              onChange={(event) => onYearsChange(event.target.value)}
              needEmptyValue={false}
              isMultiple={true}
              sizeOfSelector={'medium'}
              selectAdditionalProps = { { open: yearSelectorOpened, onClose: handleCloseYearSelect, onOpen: handleOpenYearSelect }}
              disabled={metricIsLoading}
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
                              className={index === 0 ? classes.stickyHeaderName : (column > 2000 && typeOfReport !== 'last_twelve_months') ? classes.stickyHeaderWithLimitator : classes.stickyHeader}>
                              {column}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                      <TableRow >
                        {subHeaders.map((subHeader, index) => {
                          return (
                            <TableCell key={`${index}-subHeaders`} align={'center'} style={{ fontWeight: 'bold' }}
                            className={ index === 0 ? classes.stickyPeriodName : (headers[index] > 2000 && typeOfReport !== 'last_twelve_months') ? classes.stickyFirstPeriod : classes.stickyPeriod} >
                              {subHeader}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                      { !fromUniverseOverview && !isEmptyObject(metricCompanyComparison) &&
                          <TableRow
                          key={metricCompanyComparison?.id}
                            style={{ backgroundColor: '#cececeb9' }}
                          >
                            <TableCell align="left" className={classes.stickyFirstCompany}>
                              {metricCompanyComparison.name}
                            </TableCell>
                            {renderQuarterCells(metricCompanyComparison, true)}
                          </TableRow>
                        }
                    </TableHead>
                    <TableBody>
                        {metricPeersComparison.map((item) => {
                          return (
                            <TableRow key={item.id} >
                            <TableCell className={classes.stickyColumn}>
                              {item.name}
                            </TableCell>
                              {renderQuarterCells(item, false)}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                    <TableFooter className={classes.stickyFooter}>
                      <TableRow>
                        <TableCell className={classes.stickyColumn}>Average</TableCell>
                        {
                          subHeaders.slice(1).map((subHeader, index) => {
                            if (averages.length > 0) {
                              return (
                                <TableCell key={index} className={subHeader === 'vs' ? classes.vsCell : (headers[index + 1] > 2000 && typeOfReport !== 'last_twelve_months') ? classes.cellWithLimitator : classes.normalCell}>
                                  {getFormatValue(averages[index][subHeader], subHeader)}
                                </TableCell>)
                            } else {
                              return (
                                <TableCell key={index}> </TableCell>
                              )
                            }
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
