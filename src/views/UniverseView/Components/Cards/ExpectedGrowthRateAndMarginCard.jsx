import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import {order, sortByKey} from '../../../../utils/sortSizeCohort'
import HeadBodyGrid from '../../../../components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'size_cohort', headerName: 'Size', sortable: false , flex:0.38, sortingOrder: [null]},
  { field: 'growth', headerName: 'Growth', sortable: false , flex: 0.31},
  { field: 'margin', headerName: 'Margin', sortable: false, flex: 0.31}
]

/* const rows = [
  { id: 1, count: '<$10 million', growth: 'None', margin: 'None' },
  { id: 2, count: '$10-<30 million', growth: '17%', margin: '7%' },
  { id: 3, count: '$30-<$50 million', growth: '9%', margin: '4%' },
  { id: 4, count: '$50-$100 million', growth: '13%', margin: '-2%' },
  { id: 5, count: '$100 million+', growth: '11%', margin: '2%' },
  { id: 6, count: 'ALL', growth: '12%', margin: '2%' }
] */

export const ExpectedGrowthRateAndMarginCard = ({ expectedGrowthAndMargin, isLoading }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    if (expectedGrowthAndMargin) {
      const growth = Object.values(expectedGrowthAndMargin).map((row) => ({ ...row[0], ...row[1] }))
      setData(() => {
        const ordered_growth = growth.map((row, index) => {
          row.growth = Number(row.growth)?.toFixed(2) + ' %'
          row.margin = Number(row.margin)?.toFixed(2) + ' %'
          return {
            id: order[row.size_cohort],
            ...row
          }
        })
        sortByKey(ordered_growth,'id');
        return ordered_growth
      })
    }
  }, [expectedGrowthAndMargin])
  return (
    <CardKPI title={'Growth and margin by size; projected'} actions={false}>
        {!isLoading
          ? <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          : <HeadBodyGrid/>}
    </CardKPI>
  )
}
