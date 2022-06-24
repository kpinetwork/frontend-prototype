import React from 'react'
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  dialogMainButton: {
    textTransform: 'none',
    marginRight: 10,
    backgroundColor: '#364b8a',
    color: 'white',
    marginBottom: 20
  },
  border: {
    borderBottom: '1px solid lightgray',
    marginTop: 2,
    marginBottom: 10
  }
})

export default function ModifyModal ({ open, onClose, addedScenarios, deleted }) {
  const classes = useStyles()

  const getDeletedScenarios = () => {
    return <Box>
      <Typography variant="subtitle2" >{deleted === 0 ? 'No deleted scenarios' : `${deleted} scenario(s) deleted`}</Typography>
    </Box>
  }

  const getAddedScenarios = () => {
    return Object.keys(addedScenarios).map((company) => {
      return addedScenarios[company].map((scenario) => {
        const baseText = `${scenario.scenario} ${scenario.metric} of company ${company}`
        return <Box key={`${company}-${scenario.scenario}-${scenario.metric}`}>
          <Typography variant="subtitle2">
            {scenario.added ? `${baseText} was added successfully.` : `${baseText} could not be added.`}
          </Typography>
        </Box>
      })
    })
  }

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
          <Typography variant='h5' style={{ fontWeight: 600 }}>EDIT MODIFY RESPONSE</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
              {getDeletedScenarios()}
              {getAddedScenarios()}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className={classes.dialogMainButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
