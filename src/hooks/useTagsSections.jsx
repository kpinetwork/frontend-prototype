import { useState, useEffect } from 'react'
import { getPublicCompanies } from '../service/company'

const useTagsSection = () => {
  const [companies, setCompanies] = useState({})
  const [companiesArray, setCompaniesArray] = useState([])

  useEffect(() => {
    getCompanies()

    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setCompaniesArray([])
    setCompanies({})
  }

  const getCompanies = async () => {
    try {
      const result = await getPublicCompanies({})
      const companyObject = Object.fromEntries(result.companies.map(company => [company.id, company.name]))
      setCompaniesArray(result.companies)
      setCompanies(companyObject)
    } catch (_error) {
      setDefaultValues()
    }
  }

  return {
    companies,
    companiesArray
  }
}

export default useTagsSection
