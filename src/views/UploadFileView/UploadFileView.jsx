import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import PreviewContainer from './Components/PreviewContainer'

export function UploadFileView (props) {
  return (
    <Grid>
      <AdminPanelContainer initialTab="import_data">
        <Box>
          <TitlePanel title="Import Data" />
          <PreviewContainer {...props}/>
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
