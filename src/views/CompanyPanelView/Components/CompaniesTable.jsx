import React from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  hide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
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
  { id: '1', name: 'MAMSoft', sector: 'Application Software', vertical: 'Software', is_public_data: false }
]

export function CompaniesPanelTable () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Sector</TableCell>
                        <TableCell className={classes.hide}>Vertical</TableCell>
                        <TableCell>Public data</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.sector}</TableCell>
                            <TableCell className={classes.hide}>{row.vertical}</TableCell>
                            <TableCell>
                                <Checkbox checked={row.is_public_data} color="primary"></Checkbox>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}
