import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@material-ui/core'
import ButtonActions from '../../../components/Actions'

export function DeleteTagsDialog ({ open, onCancel, onOk, tags }) {
  return (
    <Dialog open={open} onClose={onCancel}
      fullWidth={true}
      PaperProps={{
        style: {
          boxShadow: 'none',
          padding: 30
        }
      }}
      data-testid="custom-confirm-dialog"
      maxWidth={'sm'}
    >
      <DialogTitle
      >
      {'DELETE TAGS'}
      </DialogTitle>
      {tags.length > 0 &&
      <Box>
        <DialogContent>
          <Box sx={{ marginBottom: 20 }}>
            <Typography variant='body1'>The following tags will be deleted</Typography>
            <Box sx={{ borderRadius: '16px', backgroundColor: '#f3f4f8', py: 2, px: 2, marginTop: 5 }}>
              {tags.join(', ')}
            </Box>
          </Box>
          <Box>
            <Typography style={{ fontWeight: 600 }}>
              Do you want to proceed?
            </Typography>
          </Box>
        </DialogContent>
      </Box>
      }
      <DialogActions sx={{ py: 10 }}>
          <ButtonActions
          okName={'Yes'}
          cancelName={'No'}
          onOk={onOk}
          onCancel={onCancel}
          />
        </DialogActions>
    </Dialog>
  )
}
