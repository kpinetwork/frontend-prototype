import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getInvestmentReport } from '../service/investmentByYearReport'

export const useInvestmentYearReport = ({ fromUniverseOverview, selectedYear }) => {
  const { filters, companyID } = useContext(Context).filterFields
  const [investYear, setInvestYear] = useState(selectedYear)
  const [investmentCompanyComparison, setInvestmentCompanyComparison] = useState({})
  const [investmentPeersComparison, setInvestmentPeersComparison] = useState([])
  const [investmenteIsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (investYear == null) {
      return
    }
    if (fromUniverseOverview) {
      getInvestmentYearReport({ invest_year: investYear, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getInvestmentYearReport({ company_id: companyID, investYear, ...filters })
      }
    }
  }, [filters, investYear, companyID])

  const getInvestmentYearReport = async (options) => {
    try {
      setIsLoading(true)
      const result = await getInvestmentReport(options)
      const {
        companyComparisonData,
        peersComparisonDataArray
      } = destructuring(result)
      setInvestmentCompanyComparison(companyComparisonData)
      setInvestmentPeersComparison(peersComparisonDataArray)
      setIsLoading(false)
    } catch (_error) {
      setInvestmentCompanyComparison({})
      setInvestmentPeersComparison([])
      setIsLoading(false)
    }
  }

  return {
    investYear,
    investmentCompanyComparison,
    investmentPeersComparison,
    investmenteIsLoading,
    setInvestYear
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
