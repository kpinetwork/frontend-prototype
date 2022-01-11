import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
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
      //console.log('data receive', expectedGrowthAndMargin);
      // const hola = Object.values(expectedGrowthAndMargin);
      //console.log('growth editado', hola[0])
      // const {size,growthn,margin} = hola[0]
      // console.log(size, growthn, margin)
      // var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
      // const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
      const growth = Object.values(expectedGrowthAndMargin).map((row) => ({ ...row[0], ...row[1] }))
      console.log('growth', growth)
      setData(() => {
        return growth.map((row, index) => {
          row.growth = Number(row.growth)?.toFixed(2) + ' %'
          row.margin = Number(row.margin)?.toFixed(2) + ' %'
          return {
            id: index,
            ...row
          }
        })
      })
      console.log('data',data);
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
