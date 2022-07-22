import React from 'react'
import { makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  dialogMainButton: {
    textTransform: 'none',
    marginRight: 10,
    backgroundColor: '#364b8a',
    color: 'white',
    marginBottom: 20
  }
})

export default function InvalidFormatModal ({ open, onClose, errorObject, body, fromModify = false }) {
  const classes = useStyles()

  const getErrorRows = () => {
    return Object.keys(errorObject).filter(row => errorObject[row].length > 0)
  }

  const getRowsNumbers = () => {
    const rows = getErrorRows()
    return rows.map(row => {
      const index = Number(row) + 4
      return fromModify ? `${index} ${body[row]?.name || ''}` : index
    })
  }

  const getInvalidRowsDetails = () => {
    return <Box>
      <Typography variant="subtitle2" >{getRowsNumbers().join(', ')}</Typography>
    </Box>
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
          <Typography variant='h5' style={{ fontWeight: 600 }}>INVALID FORMAT</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
              <Typography variant='subtitle2'>1. Sector, vertical and Investor profile must be values of the options when editing the information.</Typography>
              <Typography variant='subtitle2'>2. Metric values should have this structure: 23.8  or 1234.80, avoid using commas.</Typography>
              <Typography variant='subtitle2'>3. Company names must be a valid value, spaces are not allowed for all characters.</Typography>
          </Box>
          <Box p={2}>
            <Typography style={{ fontWeight: 600 }} variant='subtitle1'>Please review these rows:</Typography>
            {getInvalidRowsDetails()}
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
