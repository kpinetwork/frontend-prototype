import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from './../AdminPanel/AdminPanelContainer'
import { TitlePanel } from './../AdminPanel/Components/TitlePanel'
import { makeStyles } from '@material-ui/core/styles'
import { UserGroupTabs } from './Components/UserGroupTabs'

const useStyles = makeStyles((theme) => ({
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
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    '&.MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold'
    }
  },
  roleName: {
    marginRight: 10,
    textTransform: 'capitalize'
  },
  indicator: {
    backgroundColor: '#008b9a'
  }
}))

export function UserPanelView () {
  const classes = useStyles()

  return (
    <Grid>
      <AdminPanelContainer initialTab="users">
        <Box>
          <TitlePanel title="Users"/>
          <Box>
            <UserGroupTabs classes={classes}/>
          </Box>
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
