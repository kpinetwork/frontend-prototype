import { useEffect, useState } from 'react'
import { getUserDetails, getRoles } from '../service/users'

export const useUserDetails = ({ email }) => {
  const [user, setUser] = useState({})
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUserData(email)
  }, [])

  const getUserData = async (email) => {
    try {
      const result = await getUserDetails(email)
      const _roles = await getRoles()
      const {
        userInfo,
        permissionsArray,
        rolesArray
      } = destructuring(result, _roles)
      setUser(userInfo)
      setRoles(rolesArray)
      setPermissions(permissionsArray)
      setIsLoading(false)
    } catch (_error) {
      setUser({})
      setRoles([])
      setPermissions([])
      setIsLoading(false)
    }
  }

  return {
    user,
    roles,
    permissions,
    isLoading
  }
}

export default useUserDetails

function destructuring (result, _roles) {
  const {
    user: userInfo,
    permissions: permissionsArray
  } = result
  return {
    userInfo,
    permissionsArray,
    rolesArray: _roles
  }
}
