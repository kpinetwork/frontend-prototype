import React, { useContext } from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import { CompanyDetailsCard } from './Components/CompanyDetailsCard'
import { CompanyTabs } from './Components/CompanyTabs'
import CardMessage from '../../../src/components/CardMessage'
import Context from '../../../src/context/appContext'

export function CompanyDetailView () {
  const { selectedCompanyID } = useContext(Context).company
  return (
        <Grid>
          <AdminPanelContainer initialTab={'companies'}>
            { selectedCompanyID &&
              <Box>
                <TitlePanel title='Company Details - Summary'/>
                <CompanyDetailsCard></CompanyDetailsCard>
                <CompanyTabs></CompanyTabs>
                </Box>
              }
            { selectedCompanyID == null &&
              <Box sx={{ pt: 5 }} style={{ marginLeft: 30 }}>
                <CardMessage
                  title="No company selected"
                  message="Seems like you haven't chosen a company yet"
                  type="error"
                />
              </Box>
            }
        </AdminPanelContainer>
      </Grid>
  )
}
