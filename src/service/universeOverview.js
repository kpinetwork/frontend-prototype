import { UNIVERSE_OVERVIEW } from './uowData'
const { VITE_HOST: baseUrl } = import.meta.env

export const getUniverseOverview = async (year) => {
  const url = `${baseUrl}/universe_overview?year=${year}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}
export const getUniverseOverViewFromObject = async (year) => {
  const data = await UNIVERSE_OVERVIEW
  return data
}
