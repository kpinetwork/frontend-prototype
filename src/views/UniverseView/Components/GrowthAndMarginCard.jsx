import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '../../../components/Card/CardKPI'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'count', headerName: 'Count by size', width: 200 },
  { field: 'growth', headerName: 'Growth', width: 150 },
  { field: 'margin', headerName: 'Margin', width: 150 }
]

const rows = [
  { id: 1, count: '<$10 million', growth: 'None', margin: 'None' },
  { id: 2, count: '$10-<30 million', growth: '13%', margin: '4%' },
  { id: 3, count: '$30-<$50 million', growth: '-10%', margin: '3%' },
  { id: 4, count: '$50-$100 million', growth: '16%', margin: '-1%' },
  { id: 5, count: '$100 million+', growth: '15%', margin: '4%' },
  { id: 6, count: 'ALL', growth: '7%', margin: '2%' }
]

export const GrowthAndMarginCard = () => {
  return (
    <CardKPI title={'Growth & margin by size cohort'}>
      <DataGrid
          rows={rows}
          columns={columns}
          pageSize={6}
          disableSelectionOnClick
      />
    </CardKPI>
  )
}
