import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '../../../components/Card/CardKPI'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'kpi', headerName: 'KPI Averages', width: 200 },
  { field: 'value', headerName: 'All Sectors', width: 150 }
]

const rows = [
  { id: 1, kpi: 'Actual growth', value: '7%' },
  { id: 2, kpi: 'Actual ebitda margins', value: '2%' },
  { id: 3, kpi: 'Rule of 40', value: '9' }
]

export const KPIAveragesCard = () => {
  return (
    <CardKPI title={'KPI Averages'}>
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
      />
    </CardKPI>
  )
}
