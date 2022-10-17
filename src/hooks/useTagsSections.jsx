import { useState, useEffect } from 'react'
import { getPublicCompanies } from '../service/company'
import { addTags } from '../service/tags'

const useTagsSection = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setLoading] = useState(false)

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

  const addTag = async (tagName, companies) => {
    try {
      setLoading(true)
      const response = await addTags(tagName, companies)
      // await getAllTags()
      return response.added
    } catch (_error) {
      setLoading(false)
      return false
    }
  }

  return {
    companies,
    isLoading,
    addTag
  }
}

export default useTagsSection
