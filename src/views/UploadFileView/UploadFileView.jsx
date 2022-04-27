import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import DragAndDrop from './Components/DragAndDrop'

export function UploadFileView (props) {
  return (
    <Grid>
      <AdminPanelContainer initialTab="import_data">
        <Box>
          <TitlePanel title="Import Data" />
          <DragAndDrop {...props}/>
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
