import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid, useGridApiContext } from '@mui/x-data-grid'
import { Select, MenuItem } from '@mui/material'

const useStyles = makeStyles((theme) => ({
  box: {
    height: 300,
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

const rows = [
  {
    id: 1,
    tag: 'Education',
    companies: ['EXA CORP']
  },
  {
    id: 2,
    tag: 'Technology',
    companies: ['']
  },
  {
    id: 3,
    tag: 'Fashion',
    companies: ['Zedge, Inc.']
  }
]

const getColumns = (isEditable, companies) => {
  return [
    {
      field: 'tag',
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
      {companies.map((company) => (
        <MenuItem key={company.id} value={company.name}>
          {company.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export function TagsTable ({ isEditable, companies }) {
  const classes = useStyles()
  return (
      <Box className={classes.box}>
        <DataGrid
          disableColumnMenu
          disableSelectionOnClick={!isEditable}
          autoHeight
          columns={getColumns(isEditable, companies)}
          rows={rows}
        />
        </Box>
  )
}
