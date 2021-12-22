import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import FilterContext from '../context/filterContext'
// eslint-disable-next-line no-unused-vars
import { getComparisonPeersFromObject, getComparisonPeersFromQueryParams } from '../service/comparisonPeers'

export const useComparisonPeers = ({ companyId }) => {
  // eslint-disable-next-line no-unused-vars
  const [companyParams, _] = useState(companyId)
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const { filters, year, companyID, setCompanyID } = useContext(FilterContext)
  const [companyComparison, setCompanyComparison] = useState({})
  const [rank, setRank] = useState({})
  const [peersComparison, setPeersComparison] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (companyParams) {
      setIsLoading(true)
      setCompanyID(companyParams)
      getComparisonPeers({ company_id: companyParams, year, ...filters })
    } else {
      setIsLoading(true)
      setLocation(`/comparision-versus/${companyID}`)
      getComparisonPeers({ company_id: companyID, year, ...filters })
    }
  }, [])

  const getComparisonPeers = async (options) => {
    const result = await getComparisonPeersFromQueryParams(options)
    const {
      companyComparisonData,
      rankData,
      peersComparisonDataArray
    } = destructuring(result)
    setCompanyComparison(companyComparisonData)
    setRank(rankData)
    setPeersComparison(peersComparisonDataArray)
    setIsLoading(false)
  }

  return {
    companyComparison,
    peersComparison,
    rank,
    setRank,
    isLoading
  }
}

function destructuring (result) {
  const {
    company_comparison_data: companyComparisonData,
    rank: rankData,
    peers_comparison_data: peersComparisonDataArray
  } = result
  return {
    companyComparisonData,
    rankData,
    peersComparisonDataArray
  }
}
