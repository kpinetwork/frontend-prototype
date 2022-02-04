import React from 'react'
import { Grid, Button, Box, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export function PermissionsTab ({ rootClass, permissions, setOpenPermissions }) {
  return (
    <Grid>
      <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
        <Button startIcon={<Add />} style={{ textTransform: 'none' }} onClick={(_) => setOpenPermissions(true) }>Add permissions</Button>
      </Box>
      <Table className={rootClass}>
        <TableHead>
            <TableRow style={{ backgroundColor: '#2f5487' }} >
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Company</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Permission</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
              permissions.map((company, index) => {
                return (
                  <TableRow key={`user-${company?.id}-${index}`}>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company?.permission}</TableCell>
                  </TableRow>
                )
              })
            }
        </TableBody>
      </Table>
    </Grid>
  )
}
