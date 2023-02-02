/* eslint-disable camelcase */
import axios from 'axios'
import { getAuthorizationHeader } from './session'
// const { VITE_HOST: baseUrl } = import.meta.env

// const quarterReportUrl = ''

export const getQuartersReport = async (options) => {
  const headers = await getAuthorizationHeader()
  const { company_id: id, metrics, calendarYear, investYear, ...filters } = options
  const response = await axios.get(
    'params',
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
