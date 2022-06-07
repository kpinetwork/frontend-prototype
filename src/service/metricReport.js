import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const metrictReportUrl = `${baseUrl}/by_metric_report`

export const getByMetricReport = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metric, ...filters } = options
  const response = await axios.get(`${metrictReportUrl}/${id}?metric=${metric}`, {
    params: {
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}
