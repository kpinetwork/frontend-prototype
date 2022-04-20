import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import DragAndDrop from './Components/DragAndDrop'

export function UploadFileView () {
  return (
    <Grid>
      <AdminPanelContainer initialTab="import_data">
        <Box>
          <TitlePanel title="Import Data" />
          <DragAndDrop />
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
