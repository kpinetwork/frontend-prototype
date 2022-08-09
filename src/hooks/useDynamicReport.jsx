import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getDynamicReport } from '../service/dynamicReport'

export const useDynamicReport = ({ fromUniverseOverview, selectedMetrics, selectedCalendarYear, selectedInvestYear }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [metrics, setMetrics] = useState(selectedMetrics)
  const [calendarYear, setCalendarYear] = useState(selectedCalendarYear)
  const [investYear, setInvestYear] = useState(selectedInvestYear)
  const [dynamicHeader, setDynamicHeader] = useState([])
  const [dynamicCompanyComparison, setDynamicCompanyComparison] = useState({})
  const [dynamicPeersComparison, setDynamicPeersComparison] = useState([])
  const [IsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const newCalendarYear = calendarYear !== 'None' ? calendarYear : ''
    const newInvestYear = investYear !== 'None' ? investYear : ''
    const newMetrics = metrics && !metrics.includes('None') ? metrics.join(',') : ''

    if ((metrics == null || metrics.includes('None') || metrics.length === 0) || (calendarYear === 'None' && investYear === 'None')) {
      setDefaultValues()
      return
    }
    if (fromUniverseOverview) {
      getReport({ metrics: newMetrics, calendarYear: newCalendarYear, investYear: newInvestYear, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getReport({ company_id: companyID, metrics: newMetrics, calendarYear: newCalendarYear, investYear: newInvestYear, ...filters })
      }
    }
  }, [filters, metrics, calendarYear, investYear, companyID])

  const setDefaultValues = () => {
    setDynamicCompanyComparison({})
    setDynamicPeersComparison([])
    setDynamicHeader([])
  }

  const getReport = async (options) => {
    try {
      setIsLoading(true)
      const result = await getDynamicReport(options)

      const {
        headers,
        companyComparisonData,
        peersComparisonDataArray
      } = destructuring(result)
      setDynamicCompanyComparison(companyComparisonData)
      setDynamicPeersComparison(peersComparisonDataArray)
      setDynamicHeader(headers)
      setIsLoading(false)
    } catch (_error) {
      setDefaultValues()
      setIsLoading(false)
    }
  }

  return {
    metrics,
    calendarYear,
    investYear,
    dynamicHeader,
    dynamicCompanyComparison,
    dynamicPeersComparison,
    IsLoading,
    setMetrics,
    setCalendarYear,
    setInvestYear
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    peers_comparison_data: peersComparisonDataArray,
    headers
  } = result
  return {
    companyComparisonData,
    peersComparisonDataArray,
    headers
  }
}
