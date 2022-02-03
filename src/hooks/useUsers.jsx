import { useEffect, useState } from 'react'
import { getUsers } from '../service/users'

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getUsersData()
  }, [])

  const getUsersData = async (options) => {
    const result = await getUsers(options)
    const {
      usersArray
    } = destructuring(result)
    setUsers(usersArray)
    setIsLoading(false)
  }

  return {
    users,
    isLoading
  }
}

export default useUsers

function destructuring (result) {
  return {
    usersArray: result
  }
}
