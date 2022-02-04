import React, { useState, useEffect } from 'react'
import { Grid, Tabs, Tab, useMediaQuery, Box } from '@material-ui/core'
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

export function AdminPanelContainer ({ initialTab, children }) {
  const isPhone = useMediaQuery('(max-width: 768px)')
  const [tab, setTab] = useState('users')
  const classes = useStyles()

  useEffect(() => {
    const currentTab = initialTab || tab
    setTab(currentTab)
  }, [])

  return (
    <>
      <Grid>
        <Box
            sx={{ flexGrow: 1, display: isPhone ? '' : 'flex' }}
        >
          <Box>
            <Tabs
                orientation={isPhone ? 'horizontal' : 'vertical'}
                variant="scrollable"
                value={tab}
                TabIndicatorProps={{ className: classes.indicator }}
            >
                <Tab className={classes.tabs} label="Users" value="users" href="/admin/users"/>
                <Tab className={classes.tabs} label="Companies" value="companies" href="/admin/companies"/>
            </Tabs>
          </Box>
          <div style={{ padding: 20 }}>
            {children}
          </div>
        </Box>
      </Grid>
    </>
  )
}
