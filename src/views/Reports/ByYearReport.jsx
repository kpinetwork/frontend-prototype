import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { YearSelector } from '../../components/YearSelector'
import { ComparisonView } from './../ComparisonView/ComparisonView'
import { useCalendarReport } from '../../hooks/useCalendarReport'
import { getFromLocalStorage } from '../../utils/useLocalStorage'

export const ByYearReport = ({ fromUniverseOverview }) => {
  const [type, setType] = useState('calendar')

  const {
    year,
    companyComparison,
    peersComparison,
    averages,
    calendarPeersLoading,
    setCalendarYear,
    downloadComparisonCsv
  } = useCalendarReport({ fromUniverseOverview, selectedYear: getFromLocalStorage('year') || new Date().getFullYear() })

  const data = {
    calendar: { companyComparison, peersComparison, averages, isLoading: calendarPeersLoading }
  }
  const getData = (type) => {
    return data[type]
  }

  const onYearChange = (value, type) => {
    setCalendarYear(value)
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
        <Box sx={{ marginTop: '20px' }}>
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
