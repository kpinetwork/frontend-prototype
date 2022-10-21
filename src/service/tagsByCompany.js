import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/companies`

export const getCompanyTags = async (companyID) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${companiesUrl}/${companyID}/tags`, {
    headers: headers
  })
  const data = await response.data
  return data
}
