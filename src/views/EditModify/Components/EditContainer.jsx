import React from 'react'
import { Box, Dialog, Snackbar } from '@material-ui/core'
import EditPreviewTable from './EditTable'
import InvalidFormatModal from '../../UploadFileView/Components/InvalidFormatModal'
import { useEditModify } from '../../../hooks/useEditModify'
import { useTrackChanges } from './tracker'
import { EditModifyButtons } from './EditOptions'
import ResetModal from '../../UploadFileView/Components/ResetModal'
import LoadingProgress from '../../../components/Progress'

export default function EditPreviewContainer () {
  const {
    modifying,
    isLoading,
    body,
    head,
    initialData,
    edit,
    openErrorFormat,
    changeObject,
    addObject,
    deleteObject,
    errorObject,
    errorMessage,
    openResetModal,
    setEdit,
    resetData,
    setErrorMessage,
    setOpenResetModal,
    setOpenErrorFormat,
    updateEditData
  } = useEditModify()
  const { trackChange } = useTrackChanges({ changeObject, addObject, deleteObject, initialData, head })

  const onSend = async () => {
    const valid = validateFormatErrorRows()
    if (valid) {
      updateEditData()
    }
  }

  const onCancel = () => {
    setOpenErrorFormat(false)
    setOpenResetModal(true)
    setEdit(false)
  }

  const validateFormatErrorRows = () => {
    const validFormat = Object.keys(errorObject).filter(row => errorObject[row].length > 0).length === 0
    setOpenErrorFormat(!validFormat)
    return validFormat
  }

  return (
    <Box data-testid='edit-modify-container'>
      {
        !isLoading &&
        <EditModifyButtons
          onCancel={onCancel}
          edit={edit}
          setEdit={setEdit}
          onSend={onSend}
        />
      }
      <Snackbar
        open={!(errorMessage == null)}
        autoHideDuration={1000}
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden'
          }
        }}
        open={modifying || isLoading}
        >
        <LoadingProgress/>
      </Dialog>
      <ResetModal
        open = {openResetModal}
        onOk = {resetData}
        onCancel = { () => setOpenResetModal(false)}
      />
      <InvalidFormatModal
        open={openErrorFormat}
        onClose={() => {
          setOpenErrorFormat(false)
        }}
        errorObject={errorObject}
        body={body}
        fromModify={true}
      />
      <Box style={{ marginTop: '20px' }}>
        <EditPreviewTable
          head={head}
          body={body}
          edit={edit}
          errorObject={errorObject}
          isLoading={isLoading}
          trackChange={trackChange}
        />
      </Box>
    </Box>
  )
}
