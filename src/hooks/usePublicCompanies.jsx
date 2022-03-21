import { useEffect, useState } from 'react'
import { getPublicCompanies } from '../service/company'

const usePublicCompanies = (options) => {
  const [total, setTotal] = useState(0)
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getCompanies(options)
  }, [])

  const getCompanies = async (options) => {
    setIsLoading(true)
    try {
      const result = await getPublicCompanies(options)
      const { total, companies } = result
      setTotal(total)
      setCompanies(companies)
    } catch (_error) {
      setTotal(0)
      setCompanies([])
    } finally {
      setIsLoading(false)
    }
  }
  return {
    total,
    companies,
    isLoading,
    getCompanies
  }
}

export default usePublicCompanies
