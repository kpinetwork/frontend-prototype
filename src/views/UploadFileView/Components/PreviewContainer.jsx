import React, { useState } from 'react'
import Papa from 'papaparse'
import { Snackbar, Box, Typography, CircularProgress } from '@material-ui/core'
import { Alert } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { getObjectFromPreview, getMetricsFromPreview } from '../../../utils/validateFile/getObjectToValidate'
import { uploadFileData, validateData } from '../../../service/uploadFileData'
import { getUserId } from './../../../service/session'
import { getMetricsType } from '../../../service/metrics'
import PreviewTable from './PreviewTable'
import { DragAndDrop, ButtonOptions } from './DragAndDrop'
import { isEmptyObject, isEmptyArray } from '../../../utils/userFunctions'
import PreviewModal from './PreviewModal'
import InvalidFormatModal from './InvalidFormatModal'
import ResetModal from './ResetModal'
import { METRIC_PERIOD_NAMES } from '../../../utils/constants/Metrics'

export default function PreviewContainer (props) {
  const [open, setOpen] = useState(false)
  const { onConnectETL, onDisconnectETL, onSendRegister } = props
  const [initialData, setInitialData] = useState([])
  const [confirmMessage, setConfirmMessage] = useState('')
  const [headRows, setHeadRows] = useState([])
  const [editedRows, setEditedRows] = useState([])
  const [loadingInfo, setLoadingInfo] = useState(false)
  const [edit, setEdit] = useState(false)
  const [validData, setIsValid] = useState(false)
  const [dataValidated, setData] = useState({})
  const [onValidating, setIsValidating] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [errorObject, setErrorObject] = useState({})
  const [errorFormat, setErrorFormat] = useState(false)
  const [openResetModal, setOpenResetModal] = useState(false)
  const onDrop = (acceptedFiles, fileRejections) => {
    setEdit(false)
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
    setLoadingInfo(true)
    Papa.parse(acceptedFiles[0], {
      complete: function (results) {
        setInitialData(JSON.parse(JSON.stringify(results.data)))
        mapParsedData(results.data)
      }
    })
  }

  const unparseData = () => {
    return Papa.unparse([...headRows, ...editedRows])
  }

  const buildErrorObject = (data) => {
    const obj = Object.fromEntries(
      data.map((_elem, index) => [
        [index], []
      ])
    )
    setErrorObject(obj)
  }

  const mapParsedData = (parsedData) => {
    buildErrorObject(parsedData.slice(4))
    setHeadRows(parsedData.slice(0, 4))
    setEditedRows([...parsedData].slice(4))
    setLoadingInfo(false)
  }

  const resetParsedData = () => {
    mapParsedData(JSON.parse(JSON.stringify(initialData)))
    setOpenResetModal(false)
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
    setErrorFormat(false)
    setOpenResetModal(true)
    setEdit(false)
  }

  const getNonExistentMetrics = async (headRows) => {
    const metrics = await getMetricsType()
    const metricsFromPreview = getMetricsFromPreview(headRows)
    return metricsFromPreview.filter(metric => !metrics.includes(metric))
  }

  const getNonExistentPeriods = (headRows) => {
    const validPeriods = METRIC_PERIOD_NAMES.map(period => period.name)
    const periods = headRows[3].filter(period => period !== '')
    return periods.filter(period => !validPeriods.includes(period))
  }

  const setValidData = async (data, nonExistentMetrics, nonExistentPeriods) => {
    const existingNames = data.existing_names && data.existing_names.length === 0
    const ids = data.repeated_ids && isEmptyObject(data.repeated_ids)
    const repeatedNames = data.repeated_names && isEmptyObject(data.repeated_names)
    setIsValid(existingNames && ids && repeatedNames && isEmptyArray(nonExistentMetrics) && isEmptyArray(nonExistentPeriods))
  }

  const onValidateData = async () => {
    const data = getObjectFromPreview(headRows, editedRows)
    setIsValidating(true)
    try {
      const response = await validateData(data)
      const nonExistentMetrics = await getNonExistentMetrics(headRows)
      const nonExistentPeriods = getNonExistentPeriods(headRows)
      setData({ ...response, non_existent_metrics: nonExistentMetrics, non_existent_periods: nonExistentPeriods })
      setValidData(response, nonExistentMetrics, nonExistentPeriods)
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

  const validateFormatErrorRows = () => {
    const validFormat = Object.keys(errorObject).filter(row => errorObject[row].length > 0).length === 0
    setErrorFormat(!validFormat)
    return validFormat
  }

  const onValidate = async () => {
    const validFormat = validateFormatErrorRows()
    if (validFormat) {
      await onValidateData()
    }
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
      <InvalidFormatModal
        open={errorFormat}
        onClose={() => {
          setErrorFormat(false)
        }}
        errorObject={errorObject}
      />
      <ResetModal
        open = {openResetModal}
        onOk = {resetParsedData}
        onCancel = { () => setOpenResetModal(false)}
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
            onValidateData={onValidate}
          />
          <Box style={{ marginTop: '20px' }}>
            <PreviewTable
              head={headRows}
              body={editedRows}
              edit={edit}
              errorObject={errorObject}
              isLoading={loadingInfo}
            />
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
