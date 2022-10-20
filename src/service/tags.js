import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const tagsUrl = `${baseUrl}/tags`

export const getTags = async (options) => {
  const { limit, offset } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${tagsUrl}?limit=${limit}&offset=${offset || 0}`, {
    headers: headers
  })
  const data = await response.data
  return data
}
