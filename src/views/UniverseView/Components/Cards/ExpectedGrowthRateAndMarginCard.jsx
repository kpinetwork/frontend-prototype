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
      setData(() => {
        const growth = getGrowthList()
        const orderObject = order(growth)
        const orderedSizes = growth.map((row) => {
          return {
            id: orderObject[row.size_cohort],
            ...row
          }
        })
        sortByKey(orderedSizes, 'id')
        return orderedSizes
      })
    }
  }, [expectedGrowthAndMargin])

  const getGrowthList = () => (
    Object.values(expectedGrowthAndMargin).map(row => {
      row.growth = Number(row.growth)?.toFixed(2) + ' %'
      row.margin = Number(row.margin)?.toFixed(2) + ' %'
      return {
        ...row
      }
    })
  )
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
