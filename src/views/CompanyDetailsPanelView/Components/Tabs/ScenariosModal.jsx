import React from 'react'
import { makeStyles, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography } from '@material-ui/core'
import ButtonActions from '../../../../components/Actions'

const useStyles = makeStyles({
  cancelButton: {
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10,
    width: 100
  },
  border: {
    borderBottom: '1px solid lightgray',
    marginTop: 2,
    marginBottom: 10
  }
})

export default function ScenariosModal ({ open, onClose, onOk, onCancel, scenarios }) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#f3f4f8',
          boxShadow: 'none'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ paddingLeft: 10, paddingTop: 10 }}>
          <Typography variant='h5' style={{ fontWeight: 600 }}>{'DELETE SCENARIOS'}</Typography>

        </Box>
      </DialogTitle>
      <DialogContent>
      <Box sx={{ marginBottom: 20 }}>
        <Typography variant='body1'>The following scenario will be deleted</Typography>
        <Divider className={classes.border} />
        <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
          {scenarios.map((scenario) => (
            <Box key={`scenarios-${scenario.name}`}>
              <Typography variant="body2">
                {scenario.name}
              </Typography>
              <Box sx={{ px: 5, pb: 2 }}>
                {scenario.scenarios.map((metric) => (
                  <Typography key={`existing-metric-${metric}`} variant="subtitle2">
                    {metric}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      </DialogContent>
      <DialogActions sx={{ py: 10 }}>
        <ButtonActions
        okName={'Upload file'}
        cancelName={'Edit data'}
        onOk={onOk}
        onCancel={onCancel}
        />
      </DialogActions>
    </Dialog>
  )
}
