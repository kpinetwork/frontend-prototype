import React from 'react'
import { Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { ByYearReport } from '../views/Reports/ByYearReport'
import { ByMetricReport } from '../views/Reports/ByMetricReport'
import { DynamicReport } from '../views/Reports/DynamicReport'
import { InvestmentReport } from '../views/Reports/InvestmentReport'
import { CardKPI } from './Card/CardKPI'

const useStyles = makeStyles(theme => ({
  tabs: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: '10px'
    }
  },
  indicator: {
    backgroundColor: '#008b9a'
  }
}))

export const PeerGroupTabs = ({ fromUniverseOverview }) => {
  const [value, setValue] = React.useState('1')
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
    <CardKPI title={'Peer Group Analysis'} actions={false} height={'80vh'} fullScreen={true}>
      <TabContext value={value}>
      <Box>
          <TabList onChange={handleChange} TabIndicatorProps={{ className: classes.indicator }}>
            <Tab className={classes.tabs} label="By Year" value="1" />
            <Tab className={classes.tabs} label="By Metric" value="2" />
            <Tab className={classes.tabs} label="Dynamic" value="3" />
            <Tab className={classes.tabs} label="Investment Report" value="4" />
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
            fromUniverseOverview={fromUniverseOverview}
          />
        </Box>
      </TabPanel>
      </TabContext>
    </CardKPI>
    </>
  )
}
