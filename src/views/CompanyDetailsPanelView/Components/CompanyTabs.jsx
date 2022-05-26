import React, { useState } from 'react'
import { Grid, Tabs, Tab, Box } from '@material-ui/core'
import TabPanel from './../../UserPanelView/Components/Tabs/TabPanel'
import { makeStyles } from '@material-ui/styles'
import { InvestmentsTab } from './Tabs/InvestmentsTab'

const useStyles = makeStyles(theme => ({
  tabs: {
    '& .MuiTab-wrapper': {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: '10px'
    },
    textTransform: 'none'
  },
  indicator: {
    backgroundColor: '#008b9a'
  },
  permission: {
    textTransform: 'capitalize'
  }
}))

export function CompanyTabs () {
  const [tab, setTab] = useState('scenarios')
  const classes = useStyles()

  const changeTab = (_event, value) => {
    setTab(value)
  }

  const a11yProps = (key) => {
    return {
      id: `scrollable-auto-tab-${key}`,
      'aria-controls': `scrollable-auto-tabpanel-${key}`
    }
  }

  return (
    <Grid>
      <Box sx={{ pt: 5 }} >
        <Box>
          <Tabs
            orientation='horizontal'
            variant="scrollable"
            value={tab}
            onChange={changeTab}
            sx={{ borderRight: 1, borderColor: 'divider' }}
            TabIndicatorProps={{ className: classes.indicator }}
          >
            <Tab className={classes.tabs} label="Scenarios" value="scenarios" {...a11yProps('scenarios')} />
            <Tab className={classes.tabs} label="Investments" value="investments" {...a11yProps('investments')} />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value={tab} index={'scenarios'}>
            <Box>
              <div>Company Scenarios</div>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={'investments'}>
            <InvestmentsTab />
          </TabPanel>
        </Box>
      </Box>
    </Grid>
  )
}
