import { useEffect, useState } from 'react'
import { verifyIsAdmin } from '../service/session'

export const useIsAdmin = () => {
  const [isAdminRole, setIsAdminRole] = useState(false)
  const [isRoleLoading, setIsRoleLoading] = useState(true)
  useEffect(
    () => {
      verifyIsAdmin().then((isAdmin) => {
        setIsAdminRole(isAdmin)
        setIsRoleLoading(false)
      })
    }
    , [])
  return { isAdmin: isAdminRole, isRoleLoading }
}
