import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const companyReport = `${baseUrl}/company_report`

export const getCompanyReportFromQueryParams = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, ...filters } = options
  const response = await axios.get(`${companyReport}/${id}`, {
    params: {
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}
