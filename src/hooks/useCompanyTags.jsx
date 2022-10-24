import { useState, useEffect, useContext } from 'react'
import { getCompanyTags } from '../service/tagsByCompany'
import { getTags, updateTags } from '../service/tags'
import { UPDATE_TAGS_ERROR } from '../utils/constants/tagsError'
import Context from '../context/appContext'

const useCompanyTags = () => {
  const { selectedCompanyID } = useContext(Context).company
  const [listOfTags, setListOfTags] = useState([])
  const [tagsByCompany, setTagsByCompany] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [initTags, setInitTags] = useState([])

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
    setInitTags(tagsByCompanyResponse)
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

  const updateTagsByCompany = async (company) => {
    try {
      const result = await updateTags(company)
      setIsLoading(false)
      return result.updated
    } catch (_error) {
      setError(UPDATE_TAGS_ERROR)
      setTagsByCompany(initTags)
      setIsLoading(false)
      return false
    }
  }

  const getDifferenceBetweenLists = (listA, listB) => {
    return listA.filter(({ id: idA }) => !listB.some(({ id: idB }) => idB === idA)).map(tag => tag.id)
  }

  const onSave = () => {
    setIsLoading(true)
    const tagsToAdd = getDifferenceBetweenLists(tagsByCompany, initTags)
    const tagsToDelete = getDifferenceBetweenLists(initTags, tagsByCompany)
    updateTagsByCompany(
      {
        company:
        {
          company_id: selectedCompanyID,
          tags_to_delete: tagsToDelete,
          tags_to_add: tagsToAdd
        }
      })
  }

  const onCancel = () => {
    setTagsByCompany(initTags)
  }

  const handleTagsByCompany = (_, tags) => {
    setTagsByCompany(tags)
  }

  const onCloseSnackbar = () => {
    setError(null)
  }

  return {
    tagsByCompany,
    listOfTags,
    isLoading,
    error,
    handleTagsByCompany,
    onSave,
    onCancel,
    onCloseSnackbar
  }
}

export default useCompanyTags

function destructuring (result) {
  return {
    tags: result.tags,
    total: result.total
  }
}
