import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Add, DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { TagsForm } from './TagsForm'
import { TagsTable } from './TagsTable'
import ButtonActions from '../../../components/Actions'
import useTagsSection from '../../../hooks/useTagsSections'

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
  const isLoading = false
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [tagName, setTagName] = useState(null)
  const [companiesSelected, setCompaniesSelected] = useState([])
  const { companies, companiesArray, addTag } = useTagsSection()

  const handleTagChange = (event) => {
    setTagName(event.target.value)
  }

  const handleCompaniesChange = (event, value) => {
    setCompaniesSelected(value)
  }

  const onSave = async () => {
    const companiesIds = companiesSelected.map(company => {
      return company.id
    })
    const response = addTag(tagName, companiesIds)
    if (response) {
      setOpenAdd(false)
      setTagName(null)
      setCompaniesSelected([])
    }
  }

  return (
        <Box className={classes.root}>
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
            <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
            {
              !openDelete && !openAdd && !openEdit && !isLoading &&
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
              !openAdd && !openDelete && !openEdit && !isLoading &&
                <Button
                  startIcon={<EditOutlined />}
                  style={{ textTransform: 'none' }}
                  onClick={(_) => setOpenEdit(true)}
                  disabled={openAdd}
                >
                  Edit Tags
                </Button>
            }
            {
              !openAdd && !openDelete && !openEdit && !isLoading &&
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
            {
              openEdit &&
              <Box sx={{ marginBottom: 5 }}>
                <ButtonActions
                  okName='Save'
                  cancelName='Cancel'
                  onOk={(_) => setOpenEdit(true)}
                  onCancel={(_) => setOpenEdit(false)}
                  reverse={true}
                />
                </Box>
            }
            {
              openDelete &&
              <Box sx={{ marginBottom: 5 }}>
                <ButtonActions
                  okName='Save'
                  cancelName='Cancel'
                  onOk={(_) => setOpenDelete(true)}
                  onCancel={(_) => setOpenDelete(false)}
                  reverse={true}
                />
                </Box>
            }
            <TagsTable isEditable={openEdit} companies={companies}/>
        </Box>
  )
}
