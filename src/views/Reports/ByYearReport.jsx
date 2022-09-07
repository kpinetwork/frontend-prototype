import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import { YearSelector } from '../../components/YearSelector'
import { ComparisonView } from './../ComparisonView/ComparisonView'
import { useCalendarReport } from '../../hooks/useCalendarReport'
import { getFromLocalStorage, addToLocalStorage } from '../../utils/useLocalStorage'

export const ByYearReport = ({ fromUniverseOverview }) => {
  const [type, setType] = useState('calendar')

  const {
    year,
    companyComparison,
    peersComparison,
    calendarPeersLoading,
    setCalendarYear,
    downloadComparisonCsv
  } = useCalendarReport({ fromUniverseOverview, selectedYear: getFromLocalStorage('year') || new Date().getFullYear() })

  useEffect(() => {
    const storedYear = getFromLocalStorage('year')

    if (storedYear) {
      setCalendarYear(storedYear)
    }
  }, [])

  useEffect(() => {
    addToLocalStorage('year', year)
  }, [year])

  const data = {
    calendar: { companyComparison, peersComparison, isLoading: calendarPeersLoading }
  }
  const getData = (type) => {
    return data[type]
  }

  const onYearChange = (value, type) => {
    if (type === 'calendar') {
      setCalendarYear(value)
    }
    setType(type)
  }

  return (
    <Box>
        <Box sx={{ display: 'flex' }}>
            <YearSelector
              nameOfSelect="Calendar Year"
              year={year}
              onChange={(event) => onYearChange(event.target.value, 'calendar')}
              needEmptyValue={false}
            />
        </Box>
        <Box>
            <ComparisonView
                {...getData(type)}
                downloadComparisonCsv={downloadComparisonCsv}
                fromUniverseOverview={fromUniverseOverview}
                typeOfSelector={type}
            />
        </Box>
    </Box>
  )
}
