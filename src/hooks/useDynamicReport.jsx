import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getDynamicReport } from '../service/dynamicReport'

export const useDynamicReport = ({ fromUniverseOverview, selectedMetric, selectedCalendarYear, selectedInvestYear }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [metric, setMetric] = useState(selectedMetric)
  const [calendarYear, setCalendarYear] = useState(selectedCalendarYear)
  const [investYear, setInvestYear] = useState(selectedInvestYear)
  const [dynamicHeader, setDynamicHeader] = useState([])
  const [dynamicCompanyComparison, setDynamicCompanyComparison] = useState({})
  const [dynamicPeersComparison, setDynamicPeersComparison] = useState([])
  const [IsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const newCalendarYear = calendarYear !== 'None' ? calendarYear : ''
    const newInvestYear = investYear !== 'None' ? investYear : ''
    const newMetric = metric !== 'None' ? metric : ''

    if (metric === 'None' && calendarYear === 'None' && investYear === 'None') {
      return
    }
    if (fromUniverseOverview) {
      getReport({ metric: newMetric, calendarYear: newCalendarYear, investYear: newInvestYear, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getReport({ company_id: companyID, metric: newMetric, calendarYear: newCalendarYear, investYear: newInvestYear, ...filters })
      }
    }
  }, [filters, metric, calendarYear, investYear, companyID])

  const getReport = async (options) => {
    try {
      setIsLoading(true)
      const result = await getDynamicReport(options)

      const {
        header,
        companyComparisonData,
        peersComparisonDataArray
      } = destructuring(result)
      setDynamicCompanyComparison(companyComparisonData)
      setDynamicPeersComparison(peersComparisonDataArray)
      setDynamicHeader(header)
      setIsLoading(false)
    } catch (_error) {
      setDynamicCompanyComparison({})
      setDynamicPeersComparison([])
      setDynamicHeader([])
      setIsLoading(false)
    }
  }

  return {
    metric,
    calendarYear,
    investYear,
    dynamicHeader,
    dynamicCompanyComparison,
    dynamicPeersComparison,
    IsLoading,
    setMetric,
    setCalendarYear,
    setInvestYear
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    peers_comparison_data: peersComparisonDataArray,
    header
  } = result
  let headerTmp = header || []
  headerTmp = headerTmp.filter(headName => headName !== 'gross_profit')
  return {
    companyComparisonData,
    peersComparisonDataArray,
    header: headerTmp
  }
}
