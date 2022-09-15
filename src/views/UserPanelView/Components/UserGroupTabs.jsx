import React from 'react'
import { Box, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import { UsersPanelTable } from './UsersTable'

export const GROUPROLES = {
  admins: { value: 'admin', label: 'Administrators' },
  customers: { value: 'customer', label: 'Customers' }
}

export function UserGroupsTabs ({ classes }) {
  const [value, setValue] = React.useState(GROUPROLES.admins.value)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
    <TabContext value={value}>
      <Box>
          <TabList onChange={handleChange} indicatorColor='primary'>
            <Tab label={GROUPROLES.admins.label} value={GROUPROLES.admins.value} />
            <Tab label={GROUPROLES.customers.label} value={GROUPROLES.customers.value} />
          </TabList>
      </Box>
      <TabPanel value={value} >
        <Box style={{ width: '100%' }}>
          <UsersPanelTable classes={classes} roleValue={value}/>
        </Box>
      </TabPanel>

      </TabContext>
    </div>
  )
}
