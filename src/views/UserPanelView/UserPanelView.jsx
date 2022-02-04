import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { UsersPanelTable } from './Components/UsersTable'
import { AdminPanelContainer } from './../AdminPanel/AdminPanelContainer'
import { TitlePanel } from './../AdminPanel/Components/TitlePanel'
import useUsers from './../../hooks/useUsers'

export function UserPanelView () {
  const { users, isLoading } = useUsers()

  return (
    <Grid>
      <AdminPanelContainer initialTab="users">
        <Box>
          <TitlePanel title="Users"/>
          <UsersPanelTable users={users} isLoading={isLoading}/>
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
