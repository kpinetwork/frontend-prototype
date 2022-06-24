import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import EditPreviewContainer from './Components/EditContainer'

export function EditModifyView (props) {
  return (
    <Grid>
      <AdminPanelContainer initialTab="edit_modify">
        <Box>
          <TitlePanel title="Edit Modify" />
          <EditPreviewContainer {...props}/>
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
