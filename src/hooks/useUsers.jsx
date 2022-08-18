import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { getUsers } from '../service/users'

export const useUsers = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [users, setUsers] = useState([])
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const [page, setPage] = useState(0)
  const [totalUsers, setTotalUsers] = useState([])
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    initUsers()
  }, [])

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

  const initUsers = async () => {
    const response = await getUsersData({ limit: rowsPerPage, tokens: token })
    setTotalUsers(response)
  }

  const callNextUsers = async (newPage) => {
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getUsersData({ limit: rowsPerPage, token })
    setTotalUsers([...totalUsers, ...response])
  }

  const setUsersFromTotalUsers = (newPage) => {
    setPage(newPage)
    const offset = newPage * rowsPerPage
    const max = (newPage - page) < 0 ? page * rowsPerPage : offset + rowsPerPage
    setUsers(totalUsers.slice(offset, max))
  }

  const handleChangePage = async (_event, newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (token == null && firstTimeCalled) {
      return
    }
    if (newPage > page && firstTimeCalled) {
      callNextUsers(newPage)
    } else {
      setUsersFromTotalUsers(newPage)
    }
  }

  return {
    page,
    token,
    users,
    isLoading,
    rowsPerPage,
    setUsers,
    setLocation,
    setRowsPerPage,
    handleChangePage
  }
}

export default useUsers

function destructuring (result) {
  return {
    usersArray: result.users,
    token: result.token
  }
}
