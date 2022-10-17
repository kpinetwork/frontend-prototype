import { useState, useEffect } from 'react'
import { getPublicCompanies } from '../service/company'
import { addTags } from '../service/tags'
import useTagsTable from './useTagsTable'

const useTagsSection = () => {
  const [companies, setCompanies] = useState({})
  const [companiesArray, setCompaniesArray] = useState([])
  const { getAllTags } = useTagsTable()
  const [isLoading, setLoading] = useState(false)

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
      setCompaniesArray([])
      setCompanies({})
    }
  }

  const addTag = async (tagName, companies) => {
    try {
      setLoading(true)
      const response = await addTags(tagName, companies)
      await getAllTags()
      return response.added
    } catch (_error) {
      setLoading(false)
      return false
    }
  }

  return {
    companies,
    isLoading,
    addTag,
    companiesArray
  }
}

export default useTagsSection
