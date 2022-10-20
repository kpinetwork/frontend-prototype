import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const tagsUrl = `${baseUrl}/tags`

export const addTags = async (tagName, companies) => {
  const requestBody = { companies: companies, name: tagName }
  const headers = await getAuthorizationHeader()
  const response = await axios.post(`${tagsUrl}`, requestBody, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const getTags = async (options) => {
  const { limit, offset } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${tagsUrl}?limit=${limit}&offset=${offset}`, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const updateTags = async (body) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.put(tagsUrl, body, {
    headers: headers
  })
  const data = await response?.data
  return data
}
