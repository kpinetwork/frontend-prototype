import React, { createContext, useState, useEffect } from 'react'
import { useIsAdmin } from '../hooks/useIsAdmin'

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
    const storedYear = JSON.parse(localStorage.getItem('year'))
    const storedFilters = JSON.parse(localStorage.getItem('filters'))
    if (storedYear) {
      setYear(storedYear)
    }
    if (storedFilters) {
      setFilters(storedFilters)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('year', JSON.stringify(year))
    localStorage.setItem('filters', JSON.stringify(filters))
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
