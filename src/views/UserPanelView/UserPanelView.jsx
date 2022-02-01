import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { UsersPanelTable } from './Components/UsersTable'
import { AdminPanelContainer } from './../Admin/AdminPanelContainer'
import { TitlePanel } from './../Admin/Components/TitlePanel'

export function UserPanelView () {
  return (
    <Grid>
      <AdminPanelContainer initialTab="users">
        <Box>
          <TitlePanel title="Users"/>
          <UsersPanelTable />
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
