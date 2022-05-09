import React, { useState } from 'react'
import Papa from 'papaparse'
import { Snackbar, Box, Typography, CircularProgress } from '@material-ui/core'
import { Alert } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { getObjectFromPreview } from '../../../utils/validateFile/getObjectToValidate'
import { uploadFileData, validateData } from '../../../service/uploadFileData'
import { getUserId } from './../../../service/session'
import PreviewTable from './PreviewTable'
import { DragAndDrop, ButtonOptions } from './DragAndDrop'
import { isEmptyObject } from '../../../utils/userFunctions'
import PreviewModal from './PreviewModal'

export default function PreviewContainer (props) {
  const [open, setOpen] = useState(false)
  const { onConnectETL, onDisconnectETL, onSendRegister } = props
  const [confirmMessage, setConfirmMessage] = useState('')
  const [headRows, setHeadRows] = useState([])
  const [bodyRows, setBodyRows] = useState([])
  const [editedRows, setEditedRows] = useState([])
  const [edit, setEdit] = useState(false)
  const [validData, setIsValid] = useState(false)
  const [dataValidated, setData] = useState({})
  const [onValidating, setIsValidating] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length === 0) parseFile(acceptedFiles)
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

  const parseFile = (acceptedFiles) => {
    Papa.parse(acceptedFiles[0], {
      complete: function (results) {
        mapParsedData(results.data)
      }
    })
  }

  const unparseData = () => {
    return Papa.unparse([...headRows, ...editedRows])
  }

  const mapParsedData = (parsedData) => {
    setHeadRows(parsedData.slice(0, 3))
    setBodyRows(parsedData.slice(3))
    setEditedRows([...parsedData].slice(3))
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

  const uploadFile = async (fileToUpload) => {
    onCloseModal()
    if (fileToUpload == null) {
      setConfirmMessage('Please, select a file to uploaded')
      setOpen(true)
    } else {
      onConnectETL()
      const response = await uploadFileData({
        fileName: acceptedFiles[0].name,
        file: await (getBinaryFromFile(fileToUpload))
      })
      onFileSent(response)
    }
  }

  const onUploadFile = async () => {
    const blob = getBlobFromTable()
    await uploadFile(blob)
  }

  const onCancel = () => {
    setEditedRows(bodyRows)
    setEdit(false)
  }

  const setValidData = (data) => {
    const existingNames = data.existing_names && data.existing_names.length === 0
    const ids = data.repeated_ids && isEmptyObject(data.repeated_ids)
    const repeatedNames = data.repeated_names && isEmptyObject(data.repeated_names)

    setIsValid(existingNames && ids && repeatedNames)
  }

  const onValidateData = async () => {
    const data = getObjectFromPreview(headRows, editedRows)
    setIsValidating(true)
    try {
      const response = await validateData(data)
      setData(response)
      setValidData(response)
      setOpenModal(true)
      setIsValidating(false)
    } catch (_error) {
      setIsValidating(false)
    }
  }

  const getBlobFromTable = () => {
    const fileData = unparseData()
    return new Blob([fileData], { type: 'text/csv' })
  }

  const onCloseModal = () => {
    setData({})
    setOpenModal(false)
    setValidData(false)
  }

  return (
    <Box data-testid='preview-container'>
      <DragAndDrop
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        acceptedFiles={acceptedFiles}
        acceptedFilesItems={acceptedFilesItems}
        fileRejectionItems={fileRejectionItems}
      />
      <PreviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onOk={onUploadFile}
        onCancel={onCloseModal}
        validData={validData}
        data={dataValidated}
      />
      {acceptedFiles.length > 0 && fileRejectionItems.length === 0 && (
        <>
          {
            onValidating &&
            <Box p={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <CircularProgress color="primary"/>
                    <Typography my={10} style={{ marginLeft: 10 }} variant="body1">
                        {"We're validating your data before uploading and processing"}
                    </Typography>
                </Box>
            </Box>
          }
          <ButtonOptions
            onCancel={onCancel}
            setEdit={setEdit}
            onValidateData={onValidateData}
          />
          <Box style={{ marginTop: '20px' }}>
            <PreviewTable head={headRows} body={editedRows} edit={edit}></PreviewTable>
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
