import React from 'react'
import { Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { ByYearReport } from '../views/Reports/ByYearReport'
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="By Year" value="1" />
            <Tab label="By Metric" value="2" />
          </TabList>
      </Box>
      <TabPanel value="1" >
        <Box style={{ width: '100%' }}>
          <ByYearReport
            fromUniverseOverview={fromUniverseOverview}
          />
        </Box>
      </TabPanel>
      </TabContext>
    </CardKPI>
    </>
  )
}
