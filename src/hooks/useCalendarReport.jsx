import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getComparisonPeersFromQueryParams, downloadComparisonPeers } from '../service/comparisonPeers'
import { addToLocalStorage } from '../utils/useLocalStorage'

export const useCalendarReport = ({ fromUniverseOverview, selectedYear }) => {
  const [year, setCalendarYear] = useState(selectedYear)
  const { filters, companyID } = useContext(Context).filterFields
  const [companyComparison, setCompanyComparison] = useState({})
  const [peersComparison, setPeersComparison] = useState([])
  const [calendarPeersLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (year == null) {
      return
    }
    if (fromUniverseOverview) {
      getCalendarReport({ year, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getCalendarReport({ company_id: companyID, year, ...filters })
      }
    }
    return () => setDefaultValues()
  }, [filters, year, companyID])

  useEffect(() => {
    addToLocalStorage('year', year)
  }, [year])

  const setDefaultValues = () => {
    setCompanyComparison({})
    setPeersComparison([])
    setIsLoading(false)
  }

  const getCalendarReport = async (options) => {
    const result = await getComparisonPeersFromQueryParams(options)
    const {
      companyComparisonData,
      peersComparisonDataArray
    } = destructuring(result)
    setCompanyComparison(companyComparisonData)
    setPeersComparison(peersComparisonDataArray)
    setIsLoading(false)
  }

  const downloadComparisonCsv = async () => {
    let options = { year, from_main: fromUniverseOverview, ...filters }
    if (!fromUniverseOverview && companyID) {
      options = { company_id: companyID, ...options }
    }
    try {
      const result = await downloadComparisonPeers(options)
      return result
    } catch (_error) {
      return null
    }
  }

  return {
    year,
    companyComparison,
    peersComparison,
    calendarPeersLoading,
    setCalendarYear,
    downloadComparisonCsv
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    peers_comparison_data: peersComparisonDataArray
  } = result
  return {
    companyComparisonData,
    peersComparisonDataArray
  }
}
