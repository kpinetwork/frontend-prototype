import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const investmentReportUrl = `${baseUrl}/investment_report`

export const getInvestmentReport = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, ...filters } = options
  const response = await axios.get(`${investmentReportUrl}/${id}`, {
    params: {
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}
