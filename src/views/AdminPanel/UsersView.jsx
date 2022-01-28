import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { UsersPanelTable } from './Components/Users/UsersTable'

export function UsersPanelView () {
  return (
    <Grid>
        <Typography >Users View - Draft</Typography>
        <UsersPanelTable />
    </Grid>
  )
}
