import { useState, useEffect, useContext } from 'react'
import { getCompanyTags } from '../service/tagsByCompany'
import { getTags } from '../service/tags'
import Context from '../context/appContext'

const useCompanyTags = () => {
  const { selectedCompanyID } = useContext(Context).company
  const [listOfTags, setListOfTags] = useState([])
  const [tagsByCompany, setTagsByCompany] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initTagsByCompany()
    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setIsLoading(false)
  }

  const initTagsByCompany = async () => {
    const tagsByCompanyResponse = await getTagsByCompany()
    setTagsByCompany(tagsByCompanyResponse)
    const tagsListResponse = await getListOfTags()
    setListOfTags(tagsListResponse)
    setIsLoading(false)
  }

  const getListOfTags = async () => {
    try {
      const result = await getTags({})
      const { tags } = destructuring(result)
      return tags
    } catch (_error) {
      setDefaultValues()
      return []
    }
  }
  const getTagsByCompany = async () => {
    try {
      const result = await getCompanyTags(selectedCompanyID)
      return result
    } catch (_error) {
      setDefaultValues()
      return []
    }
  }

  const handleTagsByCompany = (event, value) => {
    setTagsByCompany(value)
  }

  return {
    tagsByCompany,
    listOfTags,
    isLoading,
    handleTagsByCompany
  }
}

export default useCompanyTags

function destructuring (result) {
  return {
    tags: result.tags,
    total: result.total
  }
}
