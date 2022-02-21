import { useEffect, useState } from 'react'
import { isAdmin } from '../service/session'

export const useAdmin = () => {
  const [isAdminRole, setIsAdminRole] = useState(false)
  useEffect(
    () => {
      isAdmin().then((isAdmin) => setIsAdminRole(isAdmin))
    }
    , [])
  return isAdminRole
}
