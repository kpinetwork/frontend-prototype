import { useEffect, useState } from 'react'
import { getPublicCompanies } from '../service/company'

const usePublicCompanies = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCompanies()
  }, [])

  const getCompanies = async () => {
    setIsLoading(true)
    try {
      const result = await getPublicCompanies()
      setCompanies(result)
    } catch (_error) {
      setCompanies([])
    } finally {
      setIsLoading(false)
    }
  }
  return {
    companies,
    isLoading,
    getCompanies
  }
}

export default usePublicCompanies
