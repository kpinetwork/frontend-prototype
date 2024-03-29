import React, { useState, useEffect } from 'react'
import { Box, Button, Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add, DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { TagsForm } from './TagsForm'
import { TagsTable } from './TagsTable'
import ButtonActions from '../../../components/Actions'
import useTagsSection from '../../../hooks/useTagsSections'
import useTagsTable from '../../../hooks/useTagsTable'
import { isEmptyObject } from '../../../utils/userFunctions'
import { NOTHING_TO_CHANGE, UPDATE_TAGS_SUCCESS, DELETE_TAGS_SUCCESS } from '../../../utils/constants/tagsError'
import { DeleteTagsDialog } from './DeleteTagsDialog'
import LoadingProgress from '../../../components/Progress'
import BasicSnackBar from '../../../components/Alert/BasicSnackBar'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '130vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}))

export function TagsSectionView () {
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [tagName, setTagName] = useState(null)
  const [companiesSelected, setCompaniesSelected] = useState([])
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [severity, setSeverity] = useState(undefined)
  const { companies, companiesArray } = useTagsSection()
  const {
    total,
    isLoading,
    allowActions,
    actionWaiting,
    pageSize,
    page,
    data,
    initialData,
    tagsToDelete,
    setTagsToDelete,
    setData,
    updateTagsInfo,
    handleChangePage,
    handleChangePageSize,
    addTag,
    onDeleteTags,
    setIsLoading
  } = useTagsTable()

  const handleTagChange = (event) => {
    setTagName(event.target.value)
  }

  const handleCompaniesChange = (_event, value) => {
    setCompaniesSelected(value)
  }

  const getCompaniesIds = (companies) => {
    const companiesIds = companies.map(company => {
      return company.id
    })
    return companiesIds
  }

  const onSave = async () => {
    const response = await addTag(tagName, getCompaniesIds(companiesSelected))
    if (response.error) {
      setErrorMessage(response.error)
      setShowMessage(true)
      setSeverity('error')
      setIsLoading(false)
    } else {
      setOpenAdd(false)
      setErrorMessage('Tag added successfully')
      setShowMessage(true)
      setSeverity('success')
      setOpenAdd(false)
      setTagName(null)
      setCompaniesSelected([])
    }
  }

  const onCancelEdit = () => {
    setOpenEdit(false)
    setIsLoading(true)
  }

  const onCancelDelete = () => {
    setTagsToDelete([])
    setOpenDelete(false)
    setConfirmDelete(false)
  }

  const onDelete = () => {
    if (tagsToDelete.length < 1) return
    setConfirmDelete(true)
  }

  const onConfirmDelete = async () => {
    if (tagsToDelete.length < 1) return
    setConfirmDelete(false)
    const message = await onDeleteTags(tagsToDelete)
    if (message.error) {
      setErrorMessage(message.error)
      setShowMessage(true)
      setSeverity('error')
      setIsLoading(false)
    } else {
      setErrorMessage(DELETE_TAGS_SUCCESS)
      setShowMessage(true)
      setSeverity('success')
      setOpenEdit(false)
      onCancelDelete()
    }
  }

  const buildBody = () => {
    return Object.keys(data).reduce((body, tagID) => {
      const nameChanged = data[tagID].name !== initialData[tagID].name
      const companiesToAdd = data[tagID].companies.filter(companyID => !initialData[tagID].companies.includes(companyID))
      const companiesToDelete = initialData[tagID].companies.filter(companyID => !data[tagID].companies.includes(companyID))
      if (!(nameChanged || companiesToAdd.length > 0 || companiesToDelete.length > 0)) { return body }
      const tagData = { companies_to_add: companiesToAdd, companies_to_delete: companiesToDelete }
      if (nameChanged) tagData.name = data[tagID].name
      return { ...body, [tagID]: tagData }
    }, {})
  }

  const onUpdate = async (_) => {
    const body = buildBody()
    if (isEmptyObject(body)) {
      setErrorMessage(NOTHING_TO_CHANGE)
      setShowMessage(true)
      setSeverity('warning')
    } else {
      const message = await updateTagsInfo(body)
      if (message.error) {
        setErrorMessage(message.error)
        setShowMessage(true)
        setSeverity('error')
      } else {
        setErrorMessage(UPDATE_TAGS_SUCCESS)
        setShowMessage(true)
        setSeverity('success')
        setOpenEdit(false)
      }
    }
  }

  useEffect(() => {
    if (!openEdit && isLoading) {
      setData(JSON.parse(JSON.stringify(initialData)))
      setIsLoading(false)
    }
  }, [openEdit, isLoading])

  return (
        <Box className={classes.root}>
          <BasicSnackBar
            open={showMessage}
            onClose={() => {
              setShowMessage(false)
              setErrorMessage(undefined)
            }}
            severity={severity}
            message={errorMessage}
          />
          <Dialog
            PaperProps={{
              style: {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                overflow: 'hidden'
              }
            }}
            open={actionWaiting}
            >
            <LoadingProgress/>
          </Dialog>
          {openAdd &&
            <TagsForm
              onCancel={() => {
                setOpenAdd(false)
              }}
              companies={companiesArray}
              handleTagChange={handleTagChange}
              handleCompaniesChange={handleCompaniesChange}
              tag={tagName}
              companiesSelected={companiesSelected}
              onSave={onSave}
            />
          }
          { !isLoading &&
            <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
            {
              !openDelete && !openAdd && !openEdit &&
                <Button
                  startIcon={<DeleteOutlined style={{ color: '#364b8a' }}/>}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => {
                    setTagsToDelete([])
                    setOpenDelete(true)
                  }}
                  disabled={openDelete}
                >
                  Delete tags
                </Button>
            }
            {
              !openAdd && !openDelete && !openEdit &&
                <Button
                  startIcon={<EditOutlined style={{ color: '#364b8a' }}/>}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => setOpenEdit(true)}
                  disabled={openEdit}
                >
                  Edit tags
                </Button>
            }
            {
              !openAdd && !openDelete && !openEdit &&
                <Button
                  startIcon={<Add style={{ color: '#364b8a' }}/>}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => setOpenAdd(true)}
                  disabled={openAdd}
                >
                  Add tag
                </Button>
            }
            </Box>
          }
          {
            openEdit && !isLoading &&
            <Box sx={{ marginBottom: 5 }}>
              <ButtonActions
                okName='Save'
                cancelName='Cancel'
                onOk={(_) => onUpdate(_)}
                onCancel={(_) => onCancelEdit()}
                allowActions={allowActions}
              />
            </Box>
          }
          {
            openDelete && !isLoading &&
            <Box sx={{ marginBottom: 5 }}>
              <ButtonActions
                okName='Save'
                cancelName='Cancel'
                onOk={(_) => onDelete()}
                onCancel={(_) => onCancelDelete()}
                allowActions={allowActions}
              />
            </Box>
          }
          <DeleteTagsDialog
            open={confirmDelete}
            onCancel={() => {
              setConfirmDelete(false)
            }}
            onOk={() => onConfirmDelete()}
            tags={tagsToDelete.map(tagID => initialData[tagID]?.name)}
          />
          <TagsTable
            isEditable={openEdit}
            allowSelectionDelete={openDelete}
            setTagsToDelete={setTagsToDelete}
            tagsToDelete={tagsToDelete}
            companies={companies}
            data={data}
            total={total}
            isLoading={isLoading}
            pageSize={pageSize}
            page={page}
            handleChangePage={handleChangePage}
            handleChangePageSize={handleChangePageSize}
          />
        </Box>
  )
}
