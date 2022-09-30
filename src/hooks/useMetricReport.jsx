import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getByMetricReport } from '../service/metricReport'
import { addToLocalStorage } from '../utils/useLocalStorage'

export const useMetricReport = ({ fromUniverseOverview, selectedMetric }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [metric, setMetric] = useState(selectedMetric)
  const [years, setYears] = useState([])
  const [metricCompanyComparison, setMetricCompanyComparison] = useState({})
  const [metricPeersComparison, setMetricPeersComparison] = useState([])
  const [metricIsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (metric == null) {
      return
    }
    if (fromUniverseOverview) {
      getMetricReport({ metric, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getMetricReport({ company_id: companyID, metric, ...filters })
      }
    }
    return () => setDefaultValues()
  }, [filters, metric, companyID])

  useEffect(() => {
    addToLocalStorage('metric', metric)
  }, [metric])

  const setDefaultValues = () => {
    setMetricCompanyComparison({})
    setMetricPeersComparison([])
    setYears([])
    setIsLoading(false)
  }

  const getMetricReport = async (options) => {
    try {
      setIsLoading(true)
      const result = await getByMetricReport(options)

      const {
        companyComparisonData,
        peersComparisonDataArray,
        years
      } = destructuring(result)
      setMetricCompanyComparison(companyComparisonData)
      setMetricPeersComparison(peersComparisonDataArray)
      setYears(years)
      setIsLoading(false)
    } catch (_error) {
      setDefaultValues()
    }
  }

  return {
    metric,
    years,
    metricCompanyComparison,
    metricPeersComparison,
    metricIsLoading,
    setMetric
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    peers_comparison_data: peersComparisonDataArray,
    years
  } = result
  return {
    companyComparisonData,
    peersComparisonDataArray,
    years
  }
}
