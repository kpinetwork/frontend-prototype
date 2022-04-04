import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const comparisonPeers = `${baseUrl}/comparison`

export const getComparisonPeersFromQueryParams = async (options) => {
  const { company_id: id, ...filters } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${comparisonPeers}/${id}`, {
    params: {
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}

export const downloadComparisonPeers = async (options) => {
  const { company_id: id, ...filters } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${comparisonPeers}/${id}/download`, {
    params: {
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}
