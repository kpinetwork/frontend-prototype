import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '../../../components/Card/CardKPI'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'count', headerName: 'Count by size', width: 200 },
  { field: 'revenue', headerName: 'Revenue', width: 150 },
  { field: 'ebitda', headerName: 'Ebitda', width: 150 }
]

const rows = [
  { id: 1, count: '<$10 million', revenue: 'None', ebitda: 'None' },
  { id: 2, count: '$10-<30 million', revenue: '102%', ebitda: '135%' },
  { id: 3, count: '$30-<$50 million', revenue: '99%', ebitda: '128%' },
  { id: 4, count: '$50-$100 million', revenue: '103%', ebitda: '69%' },
  { id: 5, count: '$100 million+', revenue: '102%', ebitda: '120%' },
  { id: 6, count: 'ALL', revenue: '101%', ebitda: '109%' }
]

export const RevenueAndEbitdaCard = () => {
  return (
    <CardKPI title={'Revenue & ebitda vs budget'}>
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          disableSelectionOnClick
      />

    </CardKPI>
  )
}
