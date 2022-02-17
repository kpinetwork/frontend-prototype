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

export const getPublicCompanies = async () => {
  const headers = await getAuthorizationHeader()
  const response = await fetch(`${companiesUrl}/public?limit=62`, {
    method: 'GET',
    headers: headers
  })
  const data = await response.json()
  return data
}
