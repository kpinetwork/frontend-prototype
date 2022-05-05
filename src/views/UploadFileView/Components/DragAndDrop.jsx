import React, { useState } from 'react'
import Papa from 'papaparse'
import { Button, Paper, Typography, makeStyles, Snackbar, Box } from '@material-ui/core'
import { Alert, Modal } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { uploadFileData } from '../../../service/uploadFileData'
import { getUserId } from './../../../service/session'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import FolderIcon from '../../../components/Icons/FolderIcon'
import PreviewTable from './PreviewTable'
import ButtonActions from '../../../components/Actions'

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
    flexDirection: 'row-reverse'
  },
  fileInfoContainer: {
    flexDirection: 'column',
    margin: '20px'
  },
  resetButton: {
    marginRight: 10,
    width: 130,
    alignItem: 'center'
  },
  editButton: {
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10,
    width: 130
  },
  uploadButton: {
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10
  },
  modal: {
    textAlign: 'center',
    backgroundColor: 'white',
    width: '300px',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: '50%',
    left: '54%',
    transform: 'translate(-50%, -50%)'
  }
})

export default function DragAndDrop (props) {
  const classes = useStyles()
  const [initialData, setInitialData] = useState([])
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { onConnectETL, onDisconnectETL, onSendRegister } = props
  const [confirmMessage, setConfirmMessage] = useState('')
  const [headRows, setHeadRows] = useState([])
  const [bodyRows, setBodyRows] = useState([])

  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length === 0) {
      Papa.parse(acceptedFiles[0], {
        complete: function (results) {
          setInitialData(results.data)
          setParsedData(results.data)
        }
      })
    }
  }

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: '.csv'
    })

  const acceptedFilesItems = acceptedFiles.map((file) => (<Alert severity="success" key={file.path}>{file.path} - {file.size} bytes </Alert>))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    errors.map(e => (
      <Alert severity="error" key={e.code}>{file.path}: {e.message} </Alert>
    ))
  ))

  const setParsedData = (parsedData) => {
    setHeadRows(parsedData.slice(0, 3))
    setBodyRows(parsedData.slice(3))
  }

  const resetParsedData = () => {
    setParsedData(initialData)
    setOpenModal(false)
  }

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

  const callWebsocketRegister = async (user, file) => {
    onSendRegister(user, file)
  }

  const onFileSent = async (response) => {
    if (response.uploaded) {
      setConfirmMessage('File was uploaded successfully!!')
      const user = await getUserId()
      callWebsocketRegister(user, response.filename)
    }
    if (response.error) {
      onDisconnectETL()
      setConfirmMessage(`File was not uploaded: ${response.error}`)
    }
    setOpen(true)
  }

  const onClick = async (_) => {
    const fileToUpload = acceptedFiles[0]

    if (fileToUpload == null) {
      setConfirmMessage('Please, select a file to uploaded')
      setOpen(true)
    } else {
      onConnectETL()
      const response = await uploadFileData({
        fileName: fileToUpload.name,
        file: await (getBinaryFromFile(fileToUpload))
      })
      onFileSent(response)
    }
  }

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
      {acceptedFiles.length > 0 && fileRejectionItems.length === 0 && (
        <>
          <Box className={classes.buttonContainer}>
            <Button
              variant='outlined'
              onClick={() => setOpenModal(true)}
              className={classes.resetButton}
            >Reset
              <RestartAltIcon color="action" fontSize="small" sx={{ marginLeft: 0.4 }}></RestartAltIcon>
            </Button>
            <Button
              variant="contained"
              className={classes.editButton}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={onClick}
              className={classes.uploadButton}
            >
              Upload File
            </Button>
          </Box>
          <Modal open={openModal}>
            <Box className={classes.modal}>
              <Typography variant="body2">Are you sure you want to reset this form?</Typography>
              <ButtonActions
                onOk={resetParsedData}
                okName='YES'
                onCancel={() => setOpenModal(false)}
                cancelName='NO'
                style={{ paddingTop: 10, paddingLeft: 20 }}
              ></ButtonActions>
            </Box>
          </Modal>
          <Box style={{ marginTop: '20px' }}>
            <PreviewTable head={headRows} body={bodyRows}></PreviewTable>
          </Box>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        message={confirmMessage}
        onClose={handleClose}
      />
    </Box>
  )
}
