import { useEffect, useState } from 'react'
import { verifyIsAdmin } from '../service/session'

export const useIsAdmin = () => {
  const [isAdminRole, setIsAdminRole] = useState(false)
  useEffect(
    () => {
      verifyIsAdmin().then((isAdmin) => setIsAdminRole(isAdmin))
    }
    , [])
  return isAdminRole
}
