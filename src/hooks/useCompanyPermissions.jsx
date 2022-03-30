import { useEffect, useState } from 'react'
import { assignPermissions, getPermissions } from '../service/users'

const useCompanyPermissions = (username) => {
  const [permissions, setPermissions] = useState([])
  const [isPermissionsLoading, setIsLoading] = useState(false)
  const [successChange, setSuccessChange] = useState(null)
  const [isUpdatingPermissions, setUpdatingPermissions] = useState(false)
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getCompanyPermissions(username)
  }, [changed])

  const getCompanyPermissions = async (username) => {
    try {
      const result = await getPermissions(username)
      setPermissions(result)
    } catch (_error) {
      setPermissions([])
    } finally {
      setIsLoading(false)
    }
  }

  const assignCompanyPermissions = async (data, username) => {
    setUpdatingPermissions(true)
    try {
      const body = {
        username: username,
        companies: data
      }
      await assignPermissions(body, username)
      setSuccessChange(true)
      setChanged(!changed)
    } catch (_error) {
      setSuccessChange(false)
    } finally {
      setUpdatingPermissions(false)
    }
  }

  return {
    permissions,
    successChange,
    isPermissionsLoading,
    isUpdatingPermissions,
    assignCompanyPermissions
  }
}

export default useCompanyPermissions
