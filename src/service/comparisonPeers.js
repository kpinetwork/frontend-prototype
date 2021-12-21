import axios from 'axios'
import { COMPARISON_VERSUS_PEERS } from './uowData'
const { VITE_HOST: baseUrl } = import.meta.env

const comparisonPeers = `${baseUrl}/comparison_peers`

export const getComparisonPeersFromQueryParams = async (options) => {
  const { company_id: id, ...filters } = options
  const response = await axios.get(`${comparisonPeers}/${id}`, {
    params: {
      ...filters
    }
  })
  const data = await response.data
  return data
}

export const getComparisonPeersFromObject = async (year) => {
  const data = await COMPARISON_VERSUS_PEERS
  return data
}
