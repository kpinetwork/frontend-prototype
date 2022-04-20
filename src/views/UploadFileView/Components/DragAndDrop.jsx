import React, { useState } from 'react'
import { Button, Paper, Typography, makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import FolderIcon from '../../../components/Icons/FolderIcon'
import { uploadFileData } from '../../../service/uploadFileData'

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: 20
  },
  container: {
    borderStyle: 'dotted',
    padding: 10,
    borderColor: '#A38C8C'
  },
  title: {
    fontSize: 16,
    color: '#2f5487',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  buttonContainer: {
    textAlign: 'center'
  },
  fileInfo: {
    fontSize: 16,
    letterSpacing: '0.5px'
  }
})

export default function DragAndDrop (props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [confirmMessage, setConfirmMessage] = useState('')
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: '.csv'
    })

  const acceptedFileItems = acceptedFiles.map((file) => (
    <Alert severity="success" key={file.path}>{file.path} - {file.size} bytes </Alert>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
        {errors.map(e => (
          <Alert severity="error" key={e.code}>{file.path}: {e.message} </Alert>
        ))}
    </li>
  ))

  function getBinaryFromFile (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result))
      reader.addEventListener('error', err => reject(err))
      reader.readAsBinaryString(file)
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const onClick = async (_) => {
    let result = ''
    const fileToUpload = acceptedFiles[0]
    if (fileToUpload !== undefined) {
      result = await uploadFileData({
        fileName: fileToUpload.name,
        file: await (getBinaryFromFile(fileToUpload))
      })
    } else {
      setConfirmMessage('Please, select a file to uploaded')
    }
    if (result.uploaded) {
      setConfirmMessage('File was uploaded successfully!!')
    }
    if (result.error) {
      setConfirmMessage(`File was not uploaded: ${result.error}`)
    }
    setOpen(true)
  }

  return (
    <div>
      <Paper elevation={8} className={classes.root}>
        <div className={classes.container}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <FolderIcon />
            <Typography variant="h6" className={classes.title}>
              Drag and drop your file here, or click to select your file
            </Typography>
          </div>
        </div>
      </Paper>
      <aside>
      <h4 className={classes.title}>File name and size</h4>
      {acceptedFileItems.length > 0
        ? <ul className={classes.fileInfo}>{acceptedFileItems}</ul>
        : <ul className={classes.fileInfo}>{fileRejectionItems}</ul>
        }
      </aside>

      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          variant="contained"
          onClick={onClick}
        >
          Upload File
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        message={confirmMessage}
        onClose={handleClose}
      />
    </div>
  )
}
