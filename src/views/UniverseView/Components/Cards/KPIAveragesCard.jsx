import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { CardKPI } from '@components/Card/CardKPI'
import HeadBodyGrid from '@components/BodyGrid'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'kpi', headerName: 'All companies', width: 200 },
  { field: 'value', headerName: 'All Sectors', width: 150 }
]

const rows = [
  { id: 1, kpi: 'Actual growth', value: '' },
  { id: 2, kpi: 'Actual ebitda margins', value: '' },
  { id: 3, kpi: 'Rule of 40', value: '' }
]

export const KPIAveragesCard = ({ kpiAverage, isLoading }) => {
  const [data, setData] = React.useState(rows)
  useEffect(() => {
    if (kpiAverage) {
      setData((prevState) => {
        return prevState.map((row) => {
          row.value = Number(Object.values(kpiAverage[row.id - 1]))?.toFixed(2)
          return {
            ...row
          }
        })
      })
    }
  }, [kpiAverage])

  return (
  <CardKPI title={'KPI Averages'}>
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
