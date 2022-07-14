/* eslint-disable camelcase */
import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const dynamicReportUrl = `${baseUrl}/dynamic_report`

export const getDynamicReport = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metric, calendarYear, investYear, ...filters } = options
  const response = await axios.get(`${dynamicReportUrl}/${id}?metric=${metric}&calendar_year=${calendarYear}&investment_year=${investYear}`, {
    params: {
      ...filters
    },
    headers: headers
  })
  const data = await response.data
  return data
}
