import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { CompaniesPanelTable } from './Components/CompaniesTable'
import { AdminPanelContainer } from './../Admin/AdminPanelContainer'
import { TitlePanel } from './../Admin/Components/TitlePanel'

export function CompanyPanelView () {
  return (
    <Grid>
      <AdminPanelContainer initialTab="companies">
        <Box>
          <TitlePanel title="Companies" />
          <CompaniesPanelTable />
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
