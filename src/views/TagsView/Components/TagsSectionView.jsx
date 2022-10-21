import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Snackbar, Alert } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { Add, DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { TagsForm } from './TagsForm'
import { TagsTable } from './TagsTable'
import ButtonActions from '../../../components/Actions'
import useTagsSection from '../../../hooks/useTagsSections'
import useTagsTable from '../../../hooks/useTagsTable'
import { isEmptyObject } from '../../../utils/userFunctions'
import { NOTHING_TO_CHANGE } from '../../../utils/constants/tagsError'

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
  const { companies, companiesArray } = useTagsSection()
  const {
    total,
    isLoading,
    allowActions,
    pageSize,
    page,
    data,
    initialData,
    setData,
    updateTagsInfo,
    handleChangePage,
    handleChangePageSize,
    addTag
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
    addTag(tagName, getCompaniesIds(companiesSelected))
    setOpenAdd(false)
    setTagName(null)
    setCompaniesSelected([])
  }

  const onCancelEdit = () => {
    setTimeout(() => {
      setData(JSON.parse(JSON.stringify(initialData)))
    }, 10)
    setOpenEdit(false)
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
      return
    }
    const message = await updateTagsInfo(body)
    setErrorMessage(message)
    setOpenEdit(false)
  }

  const onCloseSnackbar = () => {
    setErrorMessage(null)
  }

  return (
        <Box className={classes.root}>
          <Snackbar open={errorMessage != null} autoHideDuration={6000}
            onClose={onCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Snackbar>
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
                  startIcon={<DeleteOutlined />}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => setOpenDelete(true)}
                  disabled={openDelete}
                >
                  Delete Tags
                </Button>
            }
            {
              !openAdd && !openDelete && !openEdit &&
                <Button
                  startIcon={<EditOutlined />}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => setOpenEdit(true)}
                  disabled={openEdit}
                >
                  Edit Tags
                </Button>
            }
            {
              !openAdd && !openDelete && !openEdit &&
                <Button
                  startIcon={<Add />}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => setOpenAdd(true)}
                  disabled={openAdd}
                >
                  Add Tag
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
                reverse={true}
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
                onOk={(_) => setOpenDelete(true)}
                onCancel={(_) => setOpenDelete(false)}
                reverse={true}
                allowActions={allowActions}
              />
            </Box>
          }
          <TagsTable
            isEditable={openEdit}
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
