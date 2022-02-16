import { useEffect, useState } from 'react'
import { getCompanyPanelFromQueryParams } from '../service/companyPanel'

const useCompanyPanel = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCompanyState()
  }, [])

  const getCompanyState = () => {
    setIsLoading(true)
    getCompanyPanel()
  }

  const getCompanyPanel = async () => {
    const result = await getCompanyPanelFromQueryParams()
    const companies = destructuring(result)
    setCompanies(companies)
    setIsLoading(false)
  }
  return {
    companies,
    isLoading,
    getCompanyState
  }
}

function destructuring (companies) {
  // eslint-disable-next-line camelcase
  return companies.map(({ id, name, sector, vertical, is_public }) => ({ id, name, sector, vertical, is_public }))
}

export default useCompanyPanel
