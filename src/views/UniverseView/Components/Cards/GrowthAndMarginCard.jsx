import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import { order, sortByKey } from '../../../../utils/sortSizeCohort'
import HeadBodyGrid from '@components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'size_cohort', headerName: 'Size', flex: 0.38, sortable: false },
  { field: 'growth', headerName: 'Growth', flex: 0.31, sortable: false },
  { field: 'margin', headerName: 'Margin', flex: 0.31, sortable: false }
]

export const GrowthAndMarginCard = ({ growthAndMargin, isLoading }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    if (growthAndMargin) {
      setData(() => {
        const growth = getGrowthList()
        const orderedSizes = growth.map((row) => {
          return {
            id: order(growth)[row.size_cohort],
            ...row
          }
        })
        sortByKey(orderedSizes, 'id')
        return orderedSizes
      })
    }
  }, [growthAndMargin])

  const getGrowthList = () => (
    Object.values(growthAndMargin).map(row => {
      row.growth = Number(row.growth)?.toFixed(2) + ' %'
      row.margin = Number(row.margin)?.toFixed(2) + ' %'
      return {
        ...row
      }
    })
  )
  return (
    <CardKPI title={'Growth and margin by size; recent actuals'} actions={false}>
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
