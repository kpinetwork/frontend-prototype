/* eslint-disable camelcase */
import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const quarterReportUrl = `${baseUrl}/quarters_report`

export const getQuartersReportData = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metric, typeOfReport, scenario, years, ...filters } = options
  console.log(years)
  const response = await axios.get(
    `${quarterReportUrl}/${id}?metric=${metric}&scenario=${scenario}&report_type=${typeOfReport}&years=${years}`,
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
