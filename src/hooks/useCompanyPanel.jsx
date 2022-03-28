import { useEffect, useState } from 'react'
import { getCompanyPanelFromQueryParams } from '../service/companyPanel'

const useCompanyPanel = (options) => {
  const [total, setTotal] = useState(0)
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCompanyPanel(options)
  }, [])

  const getCompanyPanel = async (options) => {
    setIsLoading(true)
    try {
      const result = await getCompanyPanelFromQueryParams(options)
      const {
        companiesArray,
        total
      } = destructuring(result)
      setCompanies(companiesArray)
      setTotal(total)
      setIsLoading(false)
      return companiesArray
    } catch (_error) {
      setCompanies([])
      setIsLoading(false)
      return []
    }
  }
  return {
    total,
    companies,
    setCompanies,
    isLoading,
    getCompanyPanel
  }
}

export default useCompanyPanel

function destructuring (result) {
  return {
    // eslint-disable-next-line camelcase
    companiesArray: result.companies.map(({ id, name, sector, vertical, is_public }) => ({ id, name, sector, vertical, is_public })),
    total: result.total
  }
}
