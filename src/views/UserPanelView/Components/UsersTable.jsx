import React from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@material-ui/core'
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
  }
}))

const rows = [
  { id: '1', email: 'kelly.castro@ioet.com', role: 'Customer', status: 'Active' }
]

export function UsersPanelTable () {
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const classes = useStyles()

  const changeRoute = (email) => {
    setLocation(`/admin/users/${email}`)
  }

  return (
    <div className={classes.root}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell onClick={(_) => changeRoute(row?.email)}>{row?.email}</TableCell>
                            <TableCell>{row?.role}</TableCell>
                            <TableCell>{row?.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
