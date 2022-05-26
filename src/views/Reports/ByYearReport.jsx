import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { YearSelector } from './YearSelector'
import { InvestmentYearSelector } from './InvestmentYearSelector'
import { ComparisonView } from './../ComparisonView/ComparisonView'

export const ByYearReport = ({fromUniverseOverview}) => {
  const [year, setYear] = useState(0)
  const [type, setType] = useState('calendar')
  const [canDownload, setCanDownload] = useState(false)
  const [data, setData] = useState({})

  // 1. use effect on change  year and type
  // 2. set data with result of endpoints
  // 3. change useComparison hook to receive year
  // 4. create hook to get investment report
  // 5. pass comparison view component -> data (companyComparison, peersComparison, isLoading, downloadComparisonCsv, fromUniverseOverview)
  // 6. change comparison view component to accept canDowload or review with the type (cannot download when choose investment report)
  // 7. call ByYearReport on PeergroupTabs
  // 8. call PeerGroupTabs on UniverseOverview and CompanyReport

  const onYearChange = (event, type) => {
    setYear(event.target.value)
  }
  return (
    <Box>
        <Box sx={{ display: 'flex' }}>
            <YearSelector
              nameOfSelect="Calendar Year"
              year={year}
              onChange={onYearChange}
            />
            <InvestmentYearSelector
              nameOfSelect="Investment Year"
              year={year}
              onChange={onYearChange}
            />
        </Box>
        <Box>
            <ComparisonView
                companyComparison={}
                peersComparison={}
                isLoading={false}
                downloadComparisonCsv={}
                fromUniverseOverview={}
            />
        </Box>
    </Box>
  )
}
