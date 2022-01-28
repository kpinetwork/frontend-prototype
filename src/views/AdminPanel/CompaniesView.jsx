import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { CompaniesPanelTable } from './Components/Companies/CompaniesTable'

export function CompaniesPanelView () {
  return (
    <Grid>
        <Typography>Companies View - Draft</Typography>
        <CompaniesPanelTable />
    </Grid>
  )
}
