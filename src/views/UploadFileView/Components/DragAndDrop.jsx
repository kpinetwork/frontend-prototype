import React from 'react'
import { Button, Paper, Typography, makeStyles } from '@material-ui/core'
import { useDropzone } from 'react-dropzone'
import FolderIcon from '../../../components/Icons/FolderIcon'
import { FileUpload } from '@mui/icons-material'
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
  const { acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: '.csv,.xlsx'
    })

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
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

  const onClick = async (_) => {
    const fileToUpload = acceptedFiles[0]
    await uploadFileData({
      fileName: fileToUpload.name,
      file: await (getBinaryFromFile(fileToUpload))
    })
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
        <ul className={classes.fileInfo}>{acceptedFileItems}</ul>
      </aside>
      <div className={classes.buttonContainer}>
        <Button
          color="primary"
          startIcon={<FileUpload />}
          variant="contained"
          onClick={onClick}
        >
          Upload File
        </Button>
      </div>
    </div>
  )
}
