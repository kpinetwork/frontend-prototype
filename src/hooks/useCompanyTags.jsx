import { useState, useEffect } from 'react'
import { getCompanyTags } from '../service/tags'

const useCompanyTags = () => {
  const [listOfTags, setListOfTags] = useState([])
  const [tagsByCompany, setTagsByCompany] = useState([])

  useEffect(() => {
    getTagsByCompany()
    return () => setTagsByCompany([])
  }, [])

  const getTagsByCompany = async (companyId) => {
    try {
      const result = await getCompanyTags(companyId)
      setTagsByCompany(result)
    } catch (_error) {
      setTagsByCompany([])
    }
  }

  return {
    tagsByCompany
  }
}

export default useCompanyTags
