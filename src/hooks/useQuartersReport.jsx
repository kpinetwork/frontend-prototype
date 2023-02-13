import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { addToLocalStorage } from '../utils/useLocalStorage'
// import { response } from '../utils/fakeResponse.temp'
import { getQuartersReportData } from '../service/quartersReport'

export const useQuartersReport = ({ fromUniverseOverview, selectedTypeOfReport, selectedYears, selectedScenario, selectedPeriod, selectedMetric }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [typeOfReport, setTypeOfReport] = useState(selectedTypeOfReport)
  const [years, setYears] = useState(selectedYears)
  const [metric, setMetric] = useState(selectedMetric)
  const [scenario, setScenario] = useState(selectedScenario)
  const [period, setPeriod] = useState(selectedPeriod)
  const [headers, setHeaders] = useState([])
  const [subHeaders, setSubHeaders] = useState([])
  const [averages, setAverages] = useState([])
  const [metricCompanyComparison, setMetricCompanyComparison] = useState({})
  const [metricPeersComparison, setMetricPeersComparison] = useState([])
  const [metricIsLoading, setIsLoading] = useState(false)
  const [yearSelectorOpened, setYearSelectorOpened] = useState(false)

  useEffect(() => {
    if (typeOfReport == null || years == null || metric == null || scenario == null || period == null) {
      setDefaultValues()
      return
    }
    if (fromUniverseOverview) {
      getQuartersReport({ typeOfReport, years, metric, scenario, period, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getQuartersReport({ company_id: companyID, typeOfReport, years, metric, scenario, period, ...filters })
      }
    }
    return () => setDefaultValues()
  }, [filters, typeOfReport, years, metric, scenario, period, companyID])

  useEffect(() => {
    addToLocalStorage('typeOfReport', typeOfReport)
    addToLocalStorage('quarter_metric', metric)
    addToLocalStorage('scenario', scenario)
    addToLocalStorage('quarter_period', period)
    addToLocalStorage('quarters_years', years)
  }, [typeOfReport, years, metric, scenario, period])

  const setDefaultValues = () => {
    setMetricCompanyComparison({})
    setMetricPeersComparison([])
    setHeaders([])
    setSubHeaders([])
    setIsLoading(false)
  }

  const getQuartersReport = async (options) => {
    console.log(options)
    try {
      setIsLoading(true)
      const result = await getQuartersReportData(options)
      // const result = response
      const {
        companyComparisonData,
        peersComparisonDataArray,
        averages,
        headers,
        subHeaders
      } = destructuring(result)

      setMetricCompanyComparison(companyComparisonData)
      setMetricPeersComparison(peersComparisonDataArray)
      setAverages(averages)
      setHeaders(headers)
      setSubHeaders(subHeaders)
      setIsLoading(false)
    } catch (_error) {
      setDefaultValues()
    }
  }
  return {
    yearSelectorOpened,
    typeOfReport,
    years,
    scenario,
    period,
    metric,
    headers,
    averages,
    subHeaders,
    metricCompanyComparison,
    metricPeersComparison,
    metricIsLoading,
    setYearSelectorOpened,
    setTypeOfReport,
    setYears,
    setScenario,
    setPeriod,
    setMetric
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    peers_comparison_data: peersComparisonDataArray,
    subheaders: subHeaders,
    headers,
    averages
  } = result
  return {
    companyComparisonData,
    peersComparisonDataArray,
    headers,
    subHeaders,
    averages
  }
}
