import axios from 'axios'
import { UNIVERSE_OVERVIEW } from './uowData'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const universeOverview = `${baseUrl}/universe_overview`

export const getUniverseOverview = async (year) => {
  const headers = await getAuthorizationHeader()
  const url = `${universeOverview}?year=${year}`
  const response = await fetch(url, {
    method: 'GET',
    headers: headers
  })
  const data = await response.json()
  return data
}

export const getUniverseOverviewFromQueryParams = async (options) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(universeOverview, {
    params: {
      ...options
    },
    headers: headers
  })
  const data = await response.data
  return data
}
