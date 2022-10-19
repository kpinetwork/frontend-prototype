import { useState, useEffect } from 'react'
import { getTags } from '../service/tags'

const useTag = () => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    getAlltags({})
    return () => setTags([])
  }, [])

  const getAlltags = async (options) => {
    try {
      const result = await getTags(options)
      setTags(result.tags)
      return tags
    } catch (_error) {
      setTags([])
      return []
    }
  }

  return {
    tags
  }
}

export default useTag
