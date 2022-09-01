import React from 'react'
import { Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { ByYearReport } from '../views/Reports/ByYearReport'
import { ByMetricReport } from '../views/Reports/ByMetricReport'
import { DynamicReport } from '../views/Reports/DynamicReport'
import { InvestmentReport } from '../views/Reports/InvestmentReport'
import { CardKPI } from './Card/CardKPI'

export const PeerGroupTabs = ({ fromUniverseOverview }) => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
    <CardKPI title={'Peer Group Analysis'} actions={false} height={'80vh'} fullScreen={true}>
      <TabContext value={value}>
      <Box>
          <TabList onChange={handleChange} indicatorColor='primary'>
            <Tab label="By Year" value="1" />
            <Tab label="By Metric" value="2" />
            <Tab label="Dynamic" value="3" />
            <Tab label="Investment Report" value="4" />
          </TabList>
      </Box>
      <TabPanel value="1" >
        <Box style={{ width: '100%' }}>
          <ByYearReport
            fromUniverseOverview={fromUniverseOverview}
          />
        </Box>
      </TabPanel>
      <TabPanel value="2" >
        <Box>
          <ByMetricReport
            fromUniverseOverview={fromUniverseOverview}
          />
        </Box>
      </TabPanel>
      <TabPanel value="3" >
        <Box>
          <DynamicReport
            fromUniverseOverview={fromUniverseOverview}
          />
        </Box>
      </TabPanel>
      <TabPanel value="4" >
        <Box>
          <InvestmentReport
          />
        </Box>
      </TabPanel>
      </TabContext>
    </CardKPI>
    </>
  )
}
