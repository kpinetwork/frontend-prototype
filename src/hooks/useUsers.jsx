import { useState } from 'react'
import { getUsers } from '../service/users'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getUsersData = async (options) => {
    setIsLoading(true)
    try {
      const result = await getUsers(options)
      const {
        usersArray,
        token
      } = destructuring(result)
      setUsers(usersArray)
      setToken(token)
      setIsLoading(false)
      return usersArray
    } catch (_error) {
      setUsers([])
      setIsLoading(false)
      return []
    }
  }

  return {
    users,
    isLoading,
    setUsers,
    token,
    getUsersData
  }
}

export default useUsers

function destructuring (result) {
  return {
    usersArray: result.users,
    token: result.token
  }
}
