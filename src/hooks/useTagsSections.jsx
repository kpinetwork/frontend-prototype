import { useState, useEffect } from 'react'
import { getPublicCompanies } from '../service/company'

const useTagsSection = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    getCompanies()
    return () => setCompanies([])
  }, [])

  const getCompanies = async () => {
    try {
      const result = await getPublicCompanies({})
      setCompanies(result.companies)
    } catch (_error) {
      setCompanies([])
    }
  }

  return {
    companies
  }
}

export default useTagsSection
