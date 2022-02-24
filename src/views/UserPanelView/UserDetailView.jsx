import React, { useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from './../AdminPanel/AdminPanelContainer'
import { UserCard } from './Components/UserCard'
import { UserTabs } from './UserTabs'
import { TitlePanel } from './../AdminPanel/Components/TitlePanel'
import { makeStyles } from '@material-ui/core/styles'
import useUserDetails from './../../hooks/useUserDetails'
import LoadingProgress from './../../components/Progress'
import CardMessage from './../../components/CardMessage'
import { isEmptyObject } from './../../utils/userFunctions'
import { PermissionsView } from './../PermissionsView/PermissionsView'

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

function UserView ({ user, roles, permissions, classes, openPermissions, setOpenPermissions, setUser }) {
  if (isEmptyObject(user)) {
    return (
      <CardMessage
        title="User Not Fount"
        message="Seems like this user does not exist in KPI Network"
        type="error"
      />
    )
  }
  if (openPermissions) {
    return (
      <Box>
        <PermissionsView setOpenPermissions={setOpenPermissions} email={user?.email}/>
      </Box>
    )
  }
  return (
    <Box>
      <TitlePanel title="User Details - Summary"/>
      <UserCard rootClass={classes.root} user={user}/>
      <UserTabs rootClass={classes.root} user={user} roles={roles} permissions={permissions}
        setOpenPermissions={setOpenPermissions} setUser={setUser}
      />
    </Box>
  )
}

export function UserDetailView ({ params }) {
  const classes = useStyles()
  const { user, setUser, roles, permissions, isLoading, setDataChanged } = useUserDetails(params)
  const [assignPermissions, setAssignPermissions] = useState(false)

  const updateView = (value) => {
    setDataChanged(true)
    setAssignPermissions(value)
  }

  return (
    <Grid>
      <AdminPanelContainer initialTab="users">
        {!isLoading &&
          <UserView
            user={user}
            permissions={permissions}
            roles={roles}
            classes={classes}
            openPermissions={assignPermissions}
            setOpenPermissions={updateView}
            setUser={setUser}
          />
        }
        {isLoading &&
          <Box className={classes.root}>
            <LoadingProgress />
          </Box>
        }
      </AdminPanelContainer>
    </Grid>
  )
}
