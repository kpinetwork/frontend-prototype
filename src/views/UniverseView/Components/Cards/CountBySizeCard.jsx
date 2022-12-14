import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import { order, sortByKey } from '../../../../utils/sortSizeCohort'
import HeadBodyGrid from '@components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'size_cohort', headerName: '# of companies by size', flex: 0.65, sortable: false },
  { field: 'count', headerName: 'Count', flex: 0.35, sortable: false }
]

export const CountBySizeCard = ({ countBySize, isLoading }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (countBySize) {
      setData(() => {
        const orderedCountBySize = countBySize.map((row) => {
          return {
            id: order(countBySize)[row.size_cohort],
            ...row
          }
        })
        sortByKey(orderedCountBySize, 'id')
        return orderedCountBySize
      })
    }
  }, [countBySize])

  return (
      <CardKPI title={'Count By Size'} actions={false}>
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
