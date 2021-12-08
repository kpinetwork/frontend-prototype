import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '../../../components/Card/CardKPI'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'count', headerName: 'Count by size', width: 200 },
  { field: 'value', headerName: '', width: 150 }
]

const rows = [
  { id: 1, count: '<$10 million', value: '0' },
  { id: 2, count: '$10-<30 million', value: '7' },
  { id: 3, count: '$30-<$50 million', value: '18' },
  { id: 4, count: '$50-$100 million', value: '17' },
  { id: 5, count: '$100 million+', value: '16' },
  { id: 6, count: 'TOTAL', value: '58' }
]

export const CountBySizeCard = () => {
  return (
    <CardKPI title={'Count By Size'}>
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          disableSelectionOnClick
      />
    </CardKPI>
  )
}
