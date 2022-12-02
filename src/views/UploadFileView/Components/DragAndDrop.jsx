import React from 'react'
import { Paper, Typography, makeStyles, Box, Button } from '@material-ui/core'
import FolderIcon from '../../../components/Icons/FolderIcon'
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
    justifyContent: 'right'
  },
  fileInfoContainer: {
    flexDirection: 'column',
    margin: '20px'
  },
  resetButton: {
    textTransform: 'none',
    marginRight: 10,
    alignItem: 'center'
  },
  editButton: {
    textTransform: 'none',
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10
  },
  uploadButton: {
    textTransform: 'none',
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10
  }
})

export function ButtonOptions ({ onCancel, setEdit, onValidateData }) {
  const classes = useStyles()
  return (
    <Box className={classes.buttonContainer}>
      <Button
        variant='outlined'
        className={classes.resetButton}
        onClick={onCancel}
      >Reset
        <RestartAltIcon color="action" fontSize="small" sx={{ marginLeft: 0.4, color: '#364b8a' }}></RestartAltIcon>
      </Button>
      <Button
        variant="contained"
        className={classes.editButton}
        onClick={() => setEdit(true)}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        onClick={onValidateData}
        className={classes.uploadButton}
      >
        Upload File
      </Button>
    </Box>
  )
}

export function DragAndDrop (props) {
  const classes = useStyles()
  const { getRootProps, getInputProps, acceptedFiles, acceptedFilesItems, fileRejectionItems } = props

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={8} className={ classes.root }>
          <Box {...getRootProps({ className: 'dropzone' })} className={classes.container}>
            <input data-testid="drop-input" {...getInputProps()} />
            <FolderIcon />
            <Typography variant="h6" className={classes.title}>
              Drag and drop your file here, or click to select your file
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" className={classes.fileInfoContainer}>
        {acceptedFiles.length > 0 && (
          <Typography variant='h4' className={classes.title}>File name and size</Typography>
        )}
        <>
          {acceptedFilesItems.length > 0
            ? <>{acceptedFilesItems}</>
            : <>{fileRejectionItems}</>
          }
        </>
      </Box>
    </Box>
  )
}
