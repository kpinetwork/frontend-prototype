import React, { createContext, useState, useEffect } from 'react'
import { useIsAdmin } from '../hooks/useIsAdmin'
import { getLocalStorage, setLocalStorage } from '../utils/useLocalStorage'

const INITIAL_FILTER_STATE = {
  sector: '',
  investor_profile: '',
  size: '',
  growth_profile: '',
  vertical: ''
}

const Context = createContext({})

export const AppContextProvider = ({ children }) => {
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE)
  const [companyID, setCompanyID] = useState(undefined)
  const [selectedEmail, setSelectedEmail] = useState(undefined)
  const [selectedCompanyID, setSelectedCompanyID] = useState(undefined)
  const [year, setYear] = useState(() => {
    const year = new Date().getFullYear()
    return year
  })
  const { isAdmin, isRoleLoading } = useIsAdmin()

  useEffect(() => {
    const storedYear = getLocalStorage('year')
    const storedFilters = getLocalStorage('filters')
    if (storedYear) {
      setYear(storedYear)
    }
    if (storedFilters) {
      setFilters(storedFilters)
    }
  }, [])

  useEffect(() => {
    setLocalStorage('year', year)
    setLocalStorage('filters', filters)
  }, [filters, year])

  return (
    <Context.Provider value={ {
      filterFields: { filters, setFilters, year, setYear, companyID, setCompanyID, INITIAL_FILTER_STATE },
      isAdmin,
      isRoleLoading,
      user: { selectedEmail, setSelectedEmail },
      company: { selectedCompanyID, setSelectedCompanyID }
    }} >
      {children}
    </Context.Provider>
  )
}

export default Context
