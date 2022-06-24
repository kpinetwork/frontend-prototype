import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const companiesUrl = `${baseUrl}/companies`
const investmentsUrl = `${baseUrl}/investments`

export const getCompanyDetails = async (options) => {
  const { selectedCompanyID: companyID, limit, offset } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${companiesUrl}/${companyID}?limit=${limit}&offset=${offset}`, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const getCompanyInvestments = async (companyID) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${investmentsUrl}/${companyID}`, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const addCompanyInvestment = async (companyID, investment) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.post(`${investmentsUrl}/${companyID}`, investment, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const addCompanyScenario = async (companyID, scenario) => {
  const requestBody = { ...scenario, company_id: companyID }
  const headers = await getAuthorizationHeader()
  const response = await axios.post(`${companiesUrl}/${companyID}/scenarios`, requestBody, {
    headers: headers
  })
  const data = await response.data
  return data
}
