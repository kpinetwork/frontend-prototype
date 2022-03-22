import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const usersUrl = `${baseUrl}/users`
const rolesUrl = `${baseUrl}/roles`

export const getUsers = async (options) => {
  const { limit, token } = options
  const headers = await getAuthorizationHeader()
  let queryToken = ''
  if (token) {
    queryToken = `&token=${encodeURIComponent(token)}`
  }
  const response = await axios.get(`${usersUrl}?new=True&limit=${limit}${queryToken}`,
    { headers }
  )
  const body = await response.data
  return body
}

export const getUserDetails = async (email) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${usersUrl}/${email}`, { headers })
  const data = await response.data
  return data
}

export const getRoles = async () => {
  const headers = await getAuthorizationHeader()
  const response = await fetch(rolesUrl, {
    method: 'GET',
    headers: headers
  })
  const data = await response.json()
  return data
}

export const changeUserRole = async (email, data) => {
  const headers = await getAuthorizationHeader()
  const url = `${usersUrl}/${email}/roles`
  const response = await axios.put(url,
    data,
    { headers }
  )
  const body = response.data
  return body
}

export const getPermissions = async (username) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.get(`${usersUrl}/${username}/company_permissions`, { headers })
  const data = response.data
  return data
}

export const assignPermissions = async (data, username) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.put(`${usersUrl}/${username}/company_permissions`, data, { headers })
  const body = response.data
  return body
}
