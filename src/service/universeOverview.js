import axios from 'axios'
import { UNIVERSE_OVERVIEW } from './uowData'
const { VITE_HOST: baseUrl } = import.meta.env

const universeOverview = `${baseUrl}/universe_overview`

export const getUniverseOverview = async (year) => {
  const url = `${universeOverview}?year=${year}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export const getUniverseOverviewFromQueryParams = async (options) => {
  const response = await axios.get(universeOverview, {
    params: {
      ...options
    }
  })
  const data = await response.data
  return data
}

export const getUniverseOverViewFromObject = async (year) => {
  const data = await UNIVERSE_OVERVIEW
  return data
}
