import { useState, useEffect } from 'react'
import { getTags, addTags } from '../service/tags'

const useTagsTable = () => {
  const [total, setTotal] = useState(0)
  const [tags, setTags] = useState([])
  const [offset, setOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState(100)
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    (async () => {
      await initTags(pageSize, offset)
    })()
    return () => setDefaultValues()
  }, [])

  const setDefaultValues = () => {
    setTags([])
    setTotal(0)
    setIsLoading(false)
  }

  const initTags = async (limit, offset) => {
    const response = await getAlltags({ limit, offset })
    setTags(response)
  }

  const getAlltags = async (options) => {
    try {
      setIsLoading(true)
      const result = await getTags(options)
      const { total, tags } = destructuring(result)
      setTags(tags)
      setTotal(total)
      setIsLoading(false)
      return tags
    } catch (_error) {
      setDefaultValues()
      return []
    }
  }

  const addTag = async (tagName, companies) => {
    try {
      const response = await addTags(tagName, companies)
      if (response.added) {
        initTags(pageSize, offset)
      }
      return response.added
    } catch (_error) {
      return false
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
  }

  return {
    total,
    tags,
    isLoading,
    pageSize,
    page,
    handleChangePage,
    handleChangePageSize,
    addTag
  }
}

export default useTagsTable

function destructuring (result) {
  return {
    tags: result.tags,
    total: result.total
  }
}
