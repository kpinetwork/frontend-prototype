import axios from 'axios'
import { COMPARISON_VERSUS_PEERS } from './uowData'
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

export const getComparisonPeersFromObject = async (year) => {
  const data = await COMPARISON_VERSUS_PEERS
  return data
}
