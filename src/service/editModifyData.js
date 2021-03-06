import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const modifyUrl = `${baseUrl}/edit_modify`

export const getEditModifyData = async ({ filters }) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(modifyUrl, {
    headers,
    params: {
      ...filters
    }
  })
  const data = await response.data
  return data
}

export const updateEditModifyData = async (body) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.put(modifyUrl, body, { headers })
  const data = await response.data
  return data
}

export const deleteScenarios = async (body) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.delete(`${baseUrl}/companies/na/scenarios?from_details=${false}`,
    { headers, data: body }
  )
  const data = await response.data
  return data
}
