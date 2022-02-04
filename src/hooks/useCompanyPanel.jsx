
import { useEffect, useState } from 'react'
import { getCompanyPanelFromQueryParams } from '../service/companyPanel'

const useCompanyPanel = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getCompanyPanel()
  }, [])

  const getCompanyPanel = async () => {
    const result = await getCompanyPanelFromQueryParams()
    const companies = destructuring(result)
    setCompanies(companies)
    setIsLoading(false)
  }
  return {
    companies,
    isLoading
  }
}

function destructuring (companies) {
  return companies.map(({ id, name, sector, vertical }) => ({ id, name, sector, vertical }))
}

export default useCompanyPanel
