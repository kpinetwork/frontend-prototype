import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/companies`

export const getCompanies = async () => {
  const headers = await getAuthorizationHeader()
  const response = await fetch(companiesUrl, {
    method: 'GET',
    headers: headers
  })
  const data = await response.json()
  return data
}

export const getPublicCompanies = async (options) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${companiesUrl}/public`, {
    params: options,
    headers: headers
  })
  const data = await response.data
  return data
}
