import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const companies = `${baseUrl}/companies?limit=62`

export const getCompanyPanelFromQueryParams = async () => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${companies}`, {
    headers: headers
  })

  const data = await response.data
  return data
}
