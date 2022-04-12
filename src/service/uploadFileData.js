import axios from 'axios'
import { getAuthorizationHeader } from './session'
const { VITE_HOST: baseUrl } = import.meta.env

const uploadFile = `${baseUrl}/upload_file`

export const uploadFileData = async (body) => {
  const headers = await getAuthorizationHeader()
  const response = await axios.post(uploadFile, body, {
    headers: headers
  })

  const data = await response.data
  return data
}
