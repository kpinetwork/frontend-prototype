import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const tagsUrl = `${baseUrl}/tags`

export const addTags = async (tagName, companies) => {
  const requestBody = { companies: companies, name: tagName }
  console.log(requestBody)
  const headers = await getAuthorizationHeader()
  const response = await axios.post(`${tagsUrl}`, requestBody, {
    headers: headers
  })
  const data = await response.data
  return data
}
