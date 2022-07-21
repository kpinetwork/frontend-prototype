import React from 'react'
import { makeStyles, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@material-ui/core'
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

export function ScenariosModal ({ open, onOk, onCancel, scenarios }) {
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={onCancel}
      PaperProps={{
        style: {
          backgroundColor: '#f3f4f8',
          boxShadow: 'none'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ paddingLeft: 10, paddingTop: 10 }}>
          <Typography variant='h6' style={{ fontWeight: 600 }}>{'DELETE SCENARIOS'}</Typography>
        </Box>
      </DialogTitle>
      {scenarios.length > 0 &&
      <Box>
        <DialogContent>
          <Box sx={{ marginBottom: 20 }}>
            <Typography variant='body1'>The following scenarios will be deleted</Typography>
            <Divider className={classes.border} />
            <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
              {scenarios.map((scenario) => (
                <Box key={`scenarios-${scenario.metric_id}`}>
                  <Typography variant="body2">
                    {scenario.scenario}-{scenario.year}: {scenario.metric} ${scenario.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Box>
      }
      {scenarios.length === 0 &&
        <Box>
          <DialogContent>
          <Divider className={classes.border} />
          <Box sx={{ marginBottom: 20 }}>
            <Typography variant='body1'>There are not scenarios to be deleted</Typography>
          </Box>
          </DialogContent>
        </Box>
      }
      <DialogActions sx={{ py: 10 }}>
          <ButtonActions
          okName={'Ok'}
          cancelName={'Cancel'}
          onOk={onOk}
          onCancel={onCancel}
          />
        </DialogActions>
    </Dialog>
  )
}
