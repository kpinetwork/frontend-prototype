import { useState } from 'react'
import { changeUserRole } from '../service/users'

const useUserRole = () => {
  const [isUpdatingRole, setUpdatingRole] = useState(false)
  const [changed, setChanged] = useState(false)

  const changeUserRoles = async (data, username) => {
    setUpdatingRole(true)
    try {
      const response = await changeUserRole(username, data)
      setChanged(!changed)
      setUpdatingRole(false)
      return response?.modified
    } catch (_error) {
      setUpdatingRole(false)
      return null
    }
  }

  return {
    changed,
    isUpdatingRole,
    changeUserRoles
  }
}

export default useUserRole
