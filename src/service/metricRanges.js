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

export const getRangesByMetric = async (metric) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${metricRangesUrl}/${metric}`, {
    headers: headers
  })
  const data = await response.data
  return data
}

export const modifyMetricRanges = async (body) => {
  try {
    const headers = await getAuthorizationHeader()
    const response = await axios.put(metricRangesUrl, body, {
      headers: headers
    })
    const data = await response?.data
    return data
  } catch (_error) {
    return _error.response.data
  }
}
