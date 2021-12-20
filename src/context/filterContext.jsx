import React, { createContext, useState } from 'react'

const INITIAL_FILTER_STATE = {
  sector: '',
  investor_profile: '',
  size: '',
  growth_profile: '',
  vertical: ''
}

const Context = createContext({})

export const FilterContextProvider = ({ children }) => {
  const [filters, setFilters] = useState(INITIAL_FILTER_STATE)
  const [companyList, setCompanyList] = useState(() => {
    if (localStorage.getItem('companyList')) {
      return JSON.parse(localStorage.getItem('companyList'))
    } else {
      return []
    }
  })
  const [year, setYear] = useState(() => {
    if (localStorage.getItem('year')) {
      return localStorage.getItem('year')
    } else {
      const year = new Date().getFullYear()
      return year
    }
  })

  return (
        <Context.Provider value={{ filters, setFilters, year, setYear, INITIAL_FILTER_STATE, companyList, setCompanyList }}>
            {children}
        </Context.Provider>
  )
}

export default Context
