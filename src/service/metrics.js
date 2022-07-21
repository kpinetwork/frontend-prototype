import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const metricsUrl = `${baseUrl}/metrics`

export const getMetricsType = async () => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${metricsUrl}/type`, { headers })
  const data = await response.data
  return data
}
