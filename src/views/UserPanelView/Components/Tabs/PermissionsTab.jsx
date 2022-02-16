import React from 'react'
import { Grid, Chip, Button, Box, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { Add } from '@material-ui/icons'

export function PermissionsTab ({ rootClass, permissionClass, permissions, setOpenPermissions }) {
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
              permissions.map((permission, index) => {
                return (
                  <TableRow key={`user-${permission?.id}-${index}`}>
                    <TableCell>{permission?.name}</TableCell>
                    <TableCell>
                      <Chip label={permission?.permission} variant="outlined" className={permissionClass}/>
                    </TableCell>
                  </TableRow>
                )
              })
            }
        </TableBody>
      </Table>
    </Grid>
  )
}
