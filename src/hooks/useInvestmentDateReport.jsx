import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getInvestmentDateReport } from '../service/investmentDateReport'
import { addToLocalStorage } from '../utils/useLocalStorage'

export const useInvestmentDateReport = ({ fromUniverseOverview, selectedMetric, secondSelectedMetric }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [firstMetric, setFirstMetric] = useState(selectedMetric)
  const [secondMetric, setSecondMetric] = useState(secondSelectedMetric)
  const [investHeaders, setInvestHeaders] = useState([])
  const [investCompanyComparison, setInvestCompanyComparison] = useState({})
  const [investPeersComparison, setInvestPeersComparison] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (firstMetric == null) {
      setDefaultValues()
      return
    }
    const metrics = [firstMetric, secondMetric].filter(metric => metric && metric !== 'None').join(',')
    if (fromUniverseOverview) {
      getInvestmentReport({ metrics: metrics, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getInvestmentReport({ company_id: companyID, metrics: metrics, ...filters })
      }
    }

    return () => setDefaultValues()
  }, [filters, firstMetric, secondMetric, companyID])

  useEffect(() => {
    addToLocalStorage('firstMetric', firstMetric)
    addToLocalStorage('secondMetric', secondMetric)
  }, [firstMetric, secondMetric])

  const setDefaultValues = () => {
    setInvestCompanyComparison({})
    setInvestPeersComparison([])
    setInvestHeaders([])
    setIsLoading(false)
  }

  const getInvestmentReport = async (options) => {
    try {
      setIsLoading(true)
      const result = await getInvestmentDateReport(options)

      const {
        companyComparisonData,
        peersComparisonDataArray,
        headers
      } = destructuring(result)
      setInvestCompanyComparison(companyComparisonData)
      setInvestPeersComparison(peersComparisonDataArray)
      setInvestHeaders(headers)
      setIsLoading(false)
    } catch (_error) {
      setDefaultValues()
    }
  }

  return {
    isLoading,
    firstMetric,
    secondMetric,
    investHeaders,
    investPeersComparison,
    investCompanyComparison,
    setFirstMetric,
    setSecondMetric
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
