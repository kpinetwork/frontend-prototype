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
    const result = await getCompanyPanelFromQueryParams(options)
    const { total, companies } = result
    setTotal(total)
    // eslint-disable-next-line camelcase
    setCompanies(companies.map(({ id, name, sector, vertical, is_public }) => ({ id, name, sector, vertical, is_public })))
    setIsLoading(false)
  }
  return {
    total,
    companies,
    isLoading,
    getCompanyPanel
  }
}

export default useCompanyPanel
