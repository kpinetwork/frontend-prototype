import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from './../AdminPanel/AdminPanelContainer'
import { UserCard } from './Components/UserCard'
import { UserTabs } from './UserTabs'
import { TitlePanel } from './../AdminPanel/Components/TitlePanel'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '80vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  title: {
    color: '#959cae',
    fontWeight: 'bold'
  }
}))

export function UserDetailView ({ params }) {
  const classes = useStyles()

  return (
    <Grid>
      <AdminPanelContainer initialTab="users">
        <Box>
          <TitlePanel title="User Details - Summary"/>
          <UserCard rootClass={classes.root}/>
          <UserTabs rootClass={classes.root}/>
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
