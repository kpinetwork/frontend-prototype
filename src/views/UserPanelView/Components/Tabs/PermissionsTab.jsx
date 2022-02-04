import React from 'react'
import { Grid, Button, Box } from '@material-ui/core'
import { PermissionsTable } from './PermissionsTable'
import { Add } from '@material-ui/icons'

export function PermissionsTab ({ rootClass }) {
  return (
    <Grid>
      <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
        <Button startIcon={<Add />} style={{ textTransform: 'none' }}>Add permissions</Button>
      </Box>
      <PermissionsTable rootClass={rootClass}/>
    </Grid>
  )
}
