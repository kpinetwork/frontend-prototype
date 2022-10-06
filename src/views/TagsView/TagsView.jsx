import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { AdminPanelContainer } from '../AdminPanel/AdminPanelContainer'
import { TitlePanel } from '../AdminPanel/Components/TitlePanel'
import { TagsSectionView } from './Components/TagsSectionView'

export function TagsView () {
  return (
    <Grid>
      <AdminPanelContainer initialTab="tags">
        <Box>
          <TitlePanel title="Tags" />
          <TagsSectionView />
        </Box>
      </AdminPanelContainer>
    </Grid>
  )
}
