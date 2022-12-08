import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const tagsUrl = `${baseUrl}/tags`

export const addTags = async (tagName, companies) => {
  try {
    const requestBody = { companies: companies, name: tagName }
    const headers = await getAuthorizationHeader()
    const response = await axios.post(`${tagsUrl}`, requestBody, {
      headers: headers
    })
    const data = await response.data
    return data
  } catch (_error) {
    return _error.response.data
  }
}

export const getTags = async (options) => {
  const { limit, offset } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${tagsUrl}?limit=${limit}&offset=${offset || 0}`, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const updateTags = async (body) => {
  try {
    const headers = await getAuthorizationHeader()
    const response = await axios.put(tagsUrl, body, {
      headers: headers
    })
    const data = await response?.data
    return data
  } catch (_error) {
    return _error.response.data
  }
}

export const deleteTags = async (body) => {
  try {
    const headers = await getAuthorizationHeader()
    const response = await axios.delete(tagsUrl, { headers, data: body })
    const data = await response.data
    return data
  } catch (_error) {
    return _error.response?.data
  }
}
