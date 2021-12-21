import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import HeadBodyGrid from '@components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'size_cohort', headerName: '# of companies by size', width: 230 },
  { field: 'count', headerName: 'Count', width: 150 }
]

/* const rows = [
  { id: 1, count: '<$10 million', value: '0' },
  { id: 2, count: '$10-<30 million', value: '7' },
  { id: 3, count: '$30-<$50 million', value: '18' },
  { id: 4, count: '$50-$100 million', value: '17' },
  { id: 5, count: '$100 million+', value: '16' },
  { id: 6, count: 'TOTAL', value: '58' }
] */

export const CountBySizeCard = ({ countBySize, isLoading }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    if (countBySize) {
      setData(() => {
        return countBySize.map((row, index) => {
          return {
            id: index,
            ...row
          }
        })
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
