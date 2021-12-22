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
  const [year, setYear] = useState(() => {
    const year = new Date().getFullYear()
    return year
  })

  return (
    <Context.Provider value={{ filters, setFilters, year, setYear, INITIAL_FILTER_STATE }}>
      {children}
    </Context.Provider>
  )
}

export default Context
