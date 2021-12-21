import { useEffect, useState } from 'react'
import { getComparisonPeersFromObject } from '../service/comparisonPeers'

export const useComparisonPeers = () => {
  const [companyComparison, setCompanyComparison] = useState({})
  const [peersComparison, setPeersComparison] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // console.log(company, filters, year, companyList)
    setIsLoading(true)
    getComparisonPeers({ company_id: 2020 })
  }, [])

  const getComparisonPeers = async (options) => {
    const result = await getComparisonPeersFromObject(options)
    const {
      companyComparisonData,
      peersComparisonDataArray
    } = destructuring(result)
    setCompanyComparison(companyComparisonData)
    setPeersComparison(peersComparisonDataArray)
    setIsLoading(false)
  }

  return {
    companyComparison,
    peersComparison,
    isLoading
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
