import React, { useState } from 'react'
import { Grid, Tabs, Tab, Box } from '@material-ui/core'
import TabPanel from './Components/Tabs/TabPanel'
import { PermissionsTab } from './Components/Tabs/PermissionsTab'
import { RolesTab } from './Components/Tabs/RolesTab'
import { makeStyles } from '@material-ui/styles'

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

export function UserTabs ({ params, rootClass, user, roles, permissions, setOpenPermissions }) {
  const [tab, setTab] = useState('permissions')
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
                  <Tab className={classes.tabs} label="Permissions" value="permissions" {...a11yProps('permissions')} />
                  <Tab className={classes.tabs} label="Roles" value="roles" {...a11yProps('roles')} />
              </Tabs>
            </Box>
            <Box>
              <TabPanel value={tab} index={'permissions'}>
                <PermissionsTab rootClass={rootClass} permissionClass={classes.permission} permissions={permissions} setOpenPermissions={setOpenPermissions}/>
              </TabPanel>
              <TabPanel value={tab} index={'roles'}>
                <RolesTab rootClass={rootClass} userRoles={user?.roles} roles={roles}/>
              </TabPanel>
            </Box>
          </Box>
        </Grid>
      </>
  )
}
