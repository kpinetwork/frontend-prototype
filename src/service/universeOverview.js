import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const universeOverview = `${baseUrl}/universe_overview`

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
