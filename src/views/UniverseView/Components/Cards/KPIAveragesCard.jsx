import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import HeadBodyGrid from '@components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'kpi', headerName: 'All companies', flex: 0.60, sortable: false },
  { field: 'value', headerName: 'All Sectors', flex: 0.40, sortable: false }
]

const rows = [
  { id: 1, kpi: 'Actual growth', value: '' },
  { id: 2, kpi: 'Actual ebitda margins', value: '' },
  { id: 3, kpi: 'Rule of 40', value: '' }
]

export const KPIAveragesCard = ({ kpiAverage, isLoading }) => {
  const [data, setData] = useState(rows)

  useEffect(() => {
    if (kpiAverage) {
      setData((prevState) => {
        return prevState.map((row) => {
          row.value = row.id - 1 === 2 ? Number(Object.values(kpiAverage[row.id - 1]))?.toFixed(2) : Number(Object.values(kpiAverage[row.id - 1]))?.toFixed(2) + ' %'
          return {
            ...row
          }
        })
      })
    }
  }, [kpiAverage])

  return (
  <CardKPI title={'KPI Averages'} actions={false}>
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
