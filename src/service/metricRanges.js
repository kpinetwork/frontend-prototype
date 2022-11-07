import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const metricRangesUrl = `${baseUrl}/metric_ranges`

export const getMetricRanges = async (options) => {
  const { limit, offset } = options
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${metricRangesUrl}?limit=${limit}&offset=${offset}`, {
    headers: headers
  })
  const data = await response.data
  return data
}
