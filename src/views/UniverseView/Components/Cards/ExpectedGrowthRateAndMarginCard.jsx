import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import { order, sortByKey } from '../../../../utils/sortSizeCohort'
import HeadBodyGrid from '../../../../components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'size_cohort', headerName: 'Size', sortable: false, flex: 0.38, sortingOrder: [null] },
  { field: 'growth', headerName: 'Growth', sortable: false, flex: 0.31 },
  { field: 'margin', headerName: 'Margin', sortable: false, flex: 0.31 }
]

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
        const orderedGrowth = growth.map((row, index) => {
          row.growth = Number(row.growth)?.toFixed(2) + ' %'
          row.margin = Number(row.margin)?.toFixed(2) + ' %'
          return {
            id: order[row.size_cohort],
            ...row
          }
        })
        sortByKey(orderedGrowth, 'id')
        return orderedGrowth
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
