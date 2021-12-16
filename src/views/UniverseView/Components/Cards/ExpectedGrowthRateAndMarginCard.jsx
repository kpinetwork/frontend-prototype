import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import HeadBodyGrid from '../../../../components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'size_cohort', headerName: 'Size', width: 200 },
  { field: 'growth', headerName: 'Growth', width: 150 },
  { field: 'margin', headerName: 'Margin', width: 150 }
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
      const growth = Object.values(expectedGrowthAndMargin).map((row) => row[0])
      setData(() => {
        return growth.map((row, index) => {
          row.growth = Number(row.growth)?.toFixed(2)
          row.margin = Number(row.margin)?.toFixed(2)
          return {
            id: index,
            ...row
          }
        })
      })
    }
  }, [expectedGrowthAndMargin])
  return (
    <CardKPI title={'Growth and margin by size; projected'}>
        {!isLoading
          ? <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
            />
          : <HeadBodyGrid/>}
    </CardKPI>
  )
}
