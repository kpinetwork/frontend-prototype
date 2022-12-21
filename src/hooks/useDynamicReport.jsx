import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getDynamicReport } from '../service/dynamicReport'
import { addToLocalStorage } from '../utils/useLocalStorage'

export const useDynamicReport = ({ fromUniverseOverview, selectedMetrics, selectedCalendarYear }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [metrics, setMetrics] = useState(selectedMetrics)
  const [calendarYear, setCalendarYear] = useState(selectedCalendarYear)
  const [dynamicHeader, setDynamicHeader] = useState([])
  const [dynamicCompanyComparison, setDynamicCompanyComparison] = useState({})
  const [dynamicPeersComparison, setDynamicPeersComparison] = useState([])
  const [averages, setAverages] = useState({})
  const [IsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const newCalendarYear = calendarYear !== 'None' ? calendarYear : ''
    const newMetrics = metrics && !metrics.includes('None') ? metrics.join(',') : ''

    if ((metrics == null || metrics.includes('None') || metrics.length === 0) || (calendarYear === 'None')) {
      setDefaultValues()
      return
    }
    if (fromUniverseOverview) {
      getReport({ metrics: newMetrics, calendarYear: newCalendarYear, investYear: '', from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getReport({ company_id: companyID, metrics: newMetrics, calendarYear: newCalendarYear, investYear: '', ...filters })
      }
    }

    return () => setDefaultValues()
  }, [filters, metrics, calendarYear, companyID])

  useEffect(() => {
    addToLocalStorage('metrics', metrics)
    addToLocalStorage('calendarYear', calendarYear)
  }, [metrics, calendarYear])

  const setDefaultValues = () => {
    setDynamicCompanyComparison({})
    setDynamicPeersComparison([])
    setDynamicHeader([])
    setAverages({})
    setIsLoading(false)
  }

  const getReport = async (options) => {
    try {
      setIsLoading(true)
      const result = await getDynamicReport(options)

      const {
        headers,
        averages,
        companyComparisonData,
        peersComparisonDataArray
      } = destructuring(result)
      setDynamicCompanyComparison(companyComparisonData)
      setDynamicPeersComparison(peersComparisonDataArray)
      setDynamicHeader(headers)
      setAverages(averages)
      setIsLoading(false)
    } catch (_error) {
      setDefaultValues()
    }
  }

  return {
    metrics,
    calendarYear,
    dynamicHeader,
    dynamicCompanyComparison,
    dynamicPeersComparison,
    averages,
    IsLoading,
    setMetrics,
    setCalendarYear
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    peers_comparison_data: peersComparisonDataArray,
    headers,
    averages
  } = result
  return {
    companyComparisonData,
    peersComparisonDataArray,
    headers,
    averages
  }
}
