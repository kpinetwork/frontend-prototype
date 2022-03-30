import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const companies = `${baseUrl}/companies`

export const getCompanyPanelFromQueryParams = async (options) => {
  const headers = await getAuthorizationHeader()
  const { limit, offset } = options
  const response = await axios.get(`${companies}?limit=${limit}&offset=${offset}`, {
    headers: headers
  })
  const data = await response.data
  return data
}
