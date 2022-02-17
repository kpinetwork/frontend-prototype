import React from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Chip } from '@material-ui/core'
import LoadingProgress from './../../../components/Progress'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'wouter'

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
  }
}))

export function UsersPanelTable ({ users, isLoading }) {
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const classes = useStyles()

  const changeRoute = (email) => {
    setLocation(`/admin/users/${email}/`)
  }

  const getRoleName = (role) => {
    if (role == null) return ''
    const _role = role.split('_')
    return _role.length === 3 ? _role[1] : role
  }

  const getRoles = (groups) => {
    const roles = groups || []
    return <div key={`roles-${groups}`} style={{ display: 'flex' }}>
      {roles.map((role) => {
        return (
          <Chip key={role} label={getRoleName(role)} variant="outlined" className={classes.roleName}/>
        )
      })}
    </div>
  }

  return (
    <div className={classes.root}>
        {!isLoading &&
          <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow className={classes.head}>
                        <TableCell className={classes.head}>Email</TableCell>
                        <TableCell className={classes.head}>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { users.map((user) => (
                        <TableRow key={user?.email}>
                            <TableCell onClick={(_) => changeRoute(user?.email)}>{user?.email}</TableCell>
                            <TableCell>{getRoles(user?.roles)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        }
        {isLoading &&
        <LoadingProgress />
    }
    </div>
  )
}
