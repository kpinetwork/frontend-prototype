import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const changeCompany = `${baseUrl}/companies/change_company_publicly`

export const changeCompanyPublicly = async (body) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.put(changeCompany, body, {
    headers: headers
  })

  const data = await response.data
  return data
}
