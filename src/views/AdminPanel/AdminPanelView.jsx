import React, { useState } from 'react'
import { Grid, Tabs, Tab, useMediaQuery, Box } from '@material-ui/core'
import TabPanel from './Components/TabPanel'
import { UsersPanelView } from './UsersView'
import { CompaniesPanelView } from './CompaniesView'
import { makeStyles } from '@material-ui/styles'

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

export function AdminPanelView ({ params }) {
  const isPhone = useMediaQuery('(max-width: 768px)')
  const [tab, setTab] = useState('users')
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
      <>
       <Grid container>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: isPhone ? '' : 'flex' }}
          >
            <Box>
              <Tabs
                orientation={isPhone ? 'horizontal' : 'vertical'}
                variant="scrollable"
                value={tab}
                onChange={changeTab}
                sx={{ borderRight: 1, borderColor: 'divider' }}
                TabIndicatorProps={{ className: classes.indicator }}
              >
                  <Tab className={classes.tabs} label="Users" value="users" {...a11yProps('users')} />
                  <Tab className={classes.tabs} label="Companies" value="companies" {...a11yProps('companies')} />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={'users'}>
              <UsersPanelView />
            </TabPanel>
            <TabPanel value={tab} index={'companies'}>
              <CompaniesPanelView />
            </TabPanel>
          </Box>
        </Grid>
      </>
  )
}
