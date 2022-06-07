import { useContext, useEffect, useState } from 'react'
import Context from '../context/appContext'
import { getComparisonPeersFromQueryParams, downloadComparisonPeers } from '../service/comparisonPeers'

export const useComparisonPeers = ({ fromUniverseOverview }) => {
  const { filters, year, companyID } = useContext(Context).filterFields
  const [ruleOf40, setRuleOf40] = useState([])
  const [peersIsLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (fromUniverseOverview) {
      getComparisonPeers({ year, from_main: fromUniverseOverview, ...filters })
    } else {
      if (companyID) {
        setIsLoading(true)
        getComparisonPeers({ company_id: companyID, year, ...filters })
      }
    }
  }, [filters, year, companyID])

  const getComparisonPeers = async (options) => {
    const result = await getComparisonPeersFromQueryParams(options)
    const {
      ruleOf40Array
    } = destructuring(result)
    setRuleOf40(ruleOf40Array)
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
    ruleOf40,
    peersIsLoading,
    downloadComparisonCsv
  }
}

function destructuring (result) {
  const {
    rule_of_40: ruleOf40Array
  } = result
  return {
    ruleOf40Array
  }
}
