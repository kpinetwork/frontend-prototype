/* eslint-disable camelcase */
import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

export const getQuartersReportData = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metric, typeOfReport, scenario, years, period, ...filters } = options
  const quarterReportUrl = `${baseUrl}/quarters_report/${id}?metric=${metric}&scenario=${scenario}&report_type=${typeOfReport}&years=${years}`
  const response = await axios.get(
    typeOfReport !== 'year_to_date' ? `${quarterReportUrl}` : `${quarterReportUrl}&period=${period}`,
    {
      params: {
        ...filters
      },
      headers: headers
    }
  )
  const data = await response.data
  return data
}
