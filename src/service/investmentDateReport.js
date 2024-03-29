import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const investmentReportUrl = `${baseUrl}/investment_date_report`

export const getInvestmentDateReport = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metrics, ...filters } = options
  const response = await axios.get(`${investmentReportUrl}`, {
    params: {
      metrics,
      company_id: id || '',
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}
