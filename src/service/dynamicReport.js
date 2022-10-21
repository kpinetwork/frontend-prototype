/* eslint-disable camelcase */
import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const dynamicReportUrl = `${baseUrl}/dynamic_report`

export const getDynamicReport = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metrics, calendarYear, investYear, ...filters } = options
  const response = await axios.get(
    `${dynamicReportUrl}/${id}?metrics=${metrics}&calendar_year=${calendarYear}`,
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
