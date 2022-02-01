import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CompaniesPanelTable } from './Components/Companies/CompaniesTable'

export function CompaniesPanelView () {
  return (
    <Grid>
        <Typography>Companies View</Typography>
        <Typography variant="caption" display="block" gutterBottom>
        Indicate with a check mark the companies that must display their data publicly.
        </Typography>
        <CompaniesPanelTable />
    </Grid>
  )
}
