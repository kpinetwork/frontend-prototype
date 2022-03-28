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
      const { total, companiesArray } = destructuring(result)
      setTotal(total)
      setCompanies(companiesArray)
      return companiesArray
    } catch (_error) {
      setTotal(0)
      setCompanies([])
      return []
    } finally {
      setIsLoading(false)
    }
  }
  return {
    total,
    companies,
    setCompanies,
    isLoading,
    getCompanies
  }
}

export default usePublicCompanies

function destructuring (result) {
  return {
    // eslint-disable-next-line camelcase
    companiesArray: result.companies,
    total: result.total
  }
}
