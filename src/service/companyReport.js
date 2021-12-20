import axios from 'axios'
import { COMPANY_REPORT } from './uowData'
const { VITE_HOST: baseUrl } = import.meta.env

const companyReport = `${baseUrl}/company_report`

export const getCompanyReportFromQueryParams = async (options) => {
  const { company_id: id, ...filters } = options
  const response = await axios.get(`${companyReport}/${id}`, {
    params: {
      ...filters
    }
  })
  const data = await response.data
  return data
}

export const getCompanyReportFromObject = async (year) => {
  const data = await COMPANY_REPORT
  return data
}
