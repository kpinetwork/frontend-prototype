import { useState, useEffect } from 'react'
import { getPublicCompanies } from '../service/company'

const useTagsForm = () => {
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

export default useTagsForm
