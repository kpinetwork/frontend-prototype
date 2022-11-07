import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import { RangeViewContainer } from './Components/RangeViewContainer'

export function RangesView () {
  return (
    <Grid>
    <AdminPanelContainer initialTab="ranges">
      <Box>
        <TitlePanel title="Ranges" />
        <RangeViewContainer/>
      </Box>
    </AdminPanelContainer>
  </Grid>
  )
}
