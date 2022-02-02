import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { CompaniesPanelTable } from './Components/CompaniesTable'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'

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
