import { useState, useEffect, useContext } from 'react'
import { getCompanyTags } from '../service/tagsByCompany'
import { getTags } from '../service/tags'
import Context from '../context/appContext'

const useCompanyTags = () => {
  const { selectedCompanyID } = useContext(Context).company
  const [listOfTags, setListOfTags] = useState([])
  const [tagsByCompany, setTagsByCompany] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    initTagsByCompany()
    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setListOfTags([])
    setTagsByCompany([])
    setIsLoading(false)
  }

  const initTagsByCompany = async (limit, offset) => {
    const tagsByCompanyResponse = await getTagsByCompany()
    setTagsByCompany(tagsByCompanyResponse)
    const tagsListResponse = await getListOfTags({ limit, offset })
    setListOfTags(tagsListResponse)
  }

  const getListOfTags = async (options) => {
    try {
      setIsLoading(true)
      const result = await getTags(options)
      const { tags } = destructuring(result)
      setListOfTags(tags)
      setIsLoading(false)
      return tags
    } catch (_error) {
      setDefaultValues()
      return []
    }
  }
  const getTagsByCompany = async () => {
    try {
      const result = await getCompanyTags(selectedCompanyID)
      setTagsByCompany(result)
      return result
    } catch (_error) {
      setTagsByCompany([])
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
