import React from 'react'
import { makeStyles, Box, Button } from '@material-ui/core'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: 20,
    minWidth: '25%',
    alignSelf: 'center'
  },
  container: {
    borderStyle: 'dotted',
    borderWidth: 2,
    padding: 20,
    borderColor: '#A38C8C',
    textAlign: 'center'
  },
  title: {
    fontSize: 16,
    color: '#2f5487',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    textAlign: 'center'
  },
  buttonContainer: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row-reverse'
  },
  fileInfoContainer: {
    flexDirection: 'column',
    margin: '20px'
  },
  resetButton: {
    marginRight: 10,
    alignItem: 'center',
    textTransform: 'none'
  },
  editButton: {
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10,
    width: 80,
    textTransform: 'none'
  },
  uploadButton: {
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10,
    textTransform: 'none'
  }
})

export function EditModifyButtons ({ onCancel, edit, setEdit, onSend }) {
  const classes = useStyles()
  return (
    <Box>
        {
          !edit &&
          <Box className={classes.buttonContainer}>
            <Button
                variant="contained"
                className={classes.editButton}
                onClick={() => setEdit(true)}
            >
                Edit
            </Button>
          </Box>
        }
        {
          edit &&
          <Box className={classes.buttonContainer}>
            <Button
              variant="contained"
              onClick={onSend}
              className={classes.uploadButton}
            >
              Save Data
            </Button>
            <Button
              variant='outlined'
              className={classes.resetButton}
              onClick={onCancel}
            >
              Cancel
              <RestartAltIcon color="action" fontSize="small" sx={{ marginLeft: 0.4, color: '#364b8a' }}></RestartAltIcon>
            </Button>
          </Box>
        }
    </Box>
  )
}
