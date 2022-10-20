import { useState, useEffect } from 'react'
import { getTags, updateTags } from '../service/tags'
import { ACTION_FAILED, UPDATE_ERROR } from '../utils/constants/tagsError'

const useTagsTable = () => {
  const [total, setTotal] = useState(0)
  const [tags, setTags] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState(100)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [allowActions, setEnableActios] = useState(false)
  const [data, setData] = useState({})
  const [initialData, setInitialData] = useState({})

  useEffect(() => {
    initTags(pageSize, offset)
    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setTags([])
    setTotal(0)
    setIsLoading(false)
    setEnableActios(false)
    setData({})
    setInitialData({})
  }

  const initTags = async (limit, offset) => {
    await getAlltags({ limit, offset })
  }

  const getAlltags = async (options) => {
    try {
      setIsLoading(true)
      setEnableActios(false)
      const result = await getTags(options)
      const { total, tags } = destructuring(result)
      setTags(tags)
      setInitialData(copyTags(tags))
      setData(copyTags(tags))
      setTotal(total)
      setEnableActios(true)
      setIsLoading(false)
      return tags
    } catch (_error) {
      setDefaultValues()
      return []
    }
  }

  const handleChangePageSize = async (newPageSize) => {
    const newOffset = 0
    setPageSize(newPageSize)
    setPage(0)
    setOffset(newOffset)
    setMaxPage(0)
    initTags(newPageSize, newOffset)
  }

  const handleChangePage = async (newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (newPage > page && firstTimeCalled) {
      await callNextTags(newPage)
    } else {
      setPage(newPage)
    }
  }

  const callNextTags = async (newPage) => {
    const nextOffset = (newPage * pageSize)
    setOffset(nextOffset)
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getAlltags({ limit: pageSize, offset: nextOffset })
    setTags([...tags, ...response])
    setInitialData({ ...initialData, ...copyTags(response) })
    setData({ ...initialData, ...copyTags(response) })
  }

  const copyTags = (tags) => {
    return JSON.parse(JSON.stringify(
      Object.fromEntries(
        tags.map(tag => [
          tag.id, { ...tag, companies: tag.companies.map(company => company.id) }
        ])
      )
    ))
  }

  const updateTagsInfo = async (body) => {
    try {
      setEnableActios(false)
      const response = await updateTags({ tags: body })
      if (response?.updated) {
        setPage(0)
        setMaxPage(0)
        setOffset(0)
        initTags(pageSize, 0)
        return null
      }
      return UPDATE_ERROR
    } catch (_error) {
      return ACTION_FAILED
    } finally {
      setEnableActios(true)
    }
  }

  return {
    total,
    tags,
    isLoading,
    allowActions,
    pageSize,
    page,
    data,
    initialData,
    setData,
    updateTagsInfo,
    handleChangePage,
    handleChangePageSize
  }
}

export default useTagsTable

function destructuring (result) {
  return {
    tags: result.tags,
    total: result.total
  }
}
