import React from 'react'
import { Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { UsersPanelTable } from './UsersTable'

const GROUPROLES = {
  admins: { value: 'admin', label: 'Administrators' },
  customers: { value: 'customer', label: 'Customers' }
}

export const UserGroupTabs = ({ classes }) => {
  const [value, setValue] = React.useState(GROUPROLES.customers.value)

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
    <TabContext value={value}>
      <Box>
          <TabList onChange={handleChange} TabIndicatorProps={{ className: classes.indicator }}>
            <Tab label={GROUPROLES.customers.label} value={GROUPROLES.customers.value} />
            <Tab label={GROUPROLES.admins.label} value={GROUPROLES.admins.value} />
          </TabList>
      </Box>
      <TabPanel value={GROUPROLES.customers.value} >
        <Box style={{ width: '100%' }}>
          <UsersPanelTable classes={classes} roleValue={value}/>
        </Box>
      </TabPanel>
      <TabPanel value={GROUPROLES.admins.value} >
        <Box style={{ width: '100%' }}>
          <UsersPanelTable classes={classes} roleValue={value}/>
        </Box>
      </TabPanel>

      </TabContext>
    </>
  )
}
