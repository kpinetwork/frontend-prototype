import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { YearSelector } from '../../components/YearSelector'
import { InvestmentYearSelector } from '../../components/InvestmentYearSelector'
import { ComparisonView } from './../ComparisonView/ComparisonView'
import { useCalendarReport } from '../../hooks/useCalendarReport'

export const ByYearReport = ({ fromUniverseOverview }) => {
  const [investYear, setInvestYear] = useState(0)
  const [type, setType] = useState('calendar')

  const {
    year,
    companyComparison,
    peersComparison,
    calendarPeersLoading,
    setCalendarYear,
    downloadComparisonCsv
  } = useCalendarReport({ fromUniverseOverview, selectedYear: new Date().getFullYear() })

  const data = {
    calendar: { companyComparison, peersComparison, isLoading: calendarPeersLoading },
    investment: { companyComparison: {}, peersComparison: [], isLoading: false }
  }
  const getData = (type) => {
    return data[type]
  }

  const onYearChange = (value, type) => {
    if (type === 'calendar') {
      setCalendarYear(value)
      setInvestYear(null)
    } else {
      setInvestYear(value)
      setCalendarYear(null)
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
            />
            <InvestmentYearSelector
              nameOfSelect="Investment Year"
              year={investYear}
              onChange={(event) => onYearChange(event.target.value, 'investment')}
            />
        </Box>
        <Box>
            <ComparisonView
                {...getData(type)}
                downloadComparisonCsv={downloadComparisonCsv}
                fromUniverseOverview={fromUniverseOverview}
            />
        </Box>
    </Box>
  )
}
