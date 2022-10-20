import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid, useGridApiContext } from '@mui/x-data-grid'
import { Select, MenuItem } from '@mui/material'
import LoadingProgress from '../../../components/Progress'

const useStyles = makeStyles((theme) => ({
  box: {
    width: '100%',
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: '#2f5487',
      color: 'white',
      width: 1500
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold'
    },
    '& .MuiDataGrid-columnSeparator': {
      visibility: 'hidden'
    }
  }
}))

const getColumns = (isEditable, companies) => {
  return [
    {
      field: 'name',
      headerName: 'Tag',
      type: 'string',
      editable: isEditable,
      sortable: false,
      width: 500
    },
    {
      field: 'companies',
      headerName: 'Companies',
      sortable: false,
      flex: 1,
      editable: isEditable,
      renderEditCell: (params) => <CustomEditComponent {...params} companies={companies}/>
    }
  ]
}

function CustomEditComponent (props) {
  const { id, value, field, companies } = props
  const apiRef = useGridApiContext()

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value
    })
  }

  return (
    <Select
      labelId="multiple-name-label"
      id="multiple-name"
      data-testid="multiple-select"
      multiple
      value={value}
      onChange={(event) => handleChange(event)}
      sx={{ width: '100%' }}
    >
      {
        Object.entries(companies).map((company) => (
          <MenuItem key={company[0]} value={company[1]}>
          {company[1]}
          </MenuItem>
        ))
      }
    </Select>
  )
}

export function TagsTable ({
  isEditable, companies, total,
  tags,
  isLoading,
  pageSize,
  page,
  handleChangePage,
  handleChangePageSize
}) {
  const classes = useStyles()

  const getTagsData = () => {
    const tagsData = tags.map(tagData => ({ ...tagData, companies: tagData.companies.map(company => company.name) }))
    return tagsData
  }

  return (
      <Box className={classes.box}>
        {!isLoading &&
          <DataGrid
            disableColumnMenu
            disableSelectionOnClick={!isEditable}
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => handleChangePageSize(newPageSize)}
            onPageChange={(newPage) => handleChangePage(newPage)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            columns={getColumns(isEditable, companies)}
            rows={getTagsData()}
            rowCount={total}
            page={page}
          />
        }
        {isLoading &&
          <LoadingProgress />
        }
      </Box>
  )
}
