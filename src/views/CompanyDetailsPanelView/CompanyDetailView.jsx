import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import { CompanyTabs } from './Components/CompanyTabs'

export function CompanyDetailView () {
  return (
        <Grid>
            <AdminPanelContainer initialTab={'companies'}>
                <Box>
                    <TitlePanel title='Company Details - Summary'/>
                    <CompanyTabs></CompanyTabs>
                </Box>
            </AdminPanelContainer>
        </Grid>
  )
}
