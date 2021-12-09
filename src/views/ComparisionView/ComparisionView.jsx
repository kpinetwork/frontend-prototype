import { DataGrid } from '@material-ui/data-grid'
import React from 'react'
import { CardKPI } from '../../components/Card/CardKPI'

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'company', headerName: 'Company', width: 200 },
  { field: 'revenue', headerName: 'Revenue', width: 150 },
  { field: 'growth', headerName: 'Growth', width: 150 },
  { field: 'ebitda_margin', headerName: 'Ebitda magin', width: 160 },
  { field: 'revenue_budget', headerName: 'Revenue vs budget', width: 200 },
  { field: 'ebitda_budget', headerName: 'Ebitda vs budget', width: 200 },
  { field: 'rule_of', headerName: 'Rule of 40', width: 200 }
]

const rows = [
  { id: 1, company: 'MAMSoft', revenue: '$38', growth: '5%', ebitda_margin: '14%', revenue_budget: '95%', ebitda_budget: '83%', rule_of: '20' },
  { id: 4, company: '2xx-xxxx', revenue: '$10-<30 million', growth: '23%', ebitda_margin: '-46%', revenue_budget: '0', ebitda_budget: '1 of 1', rule_of: '24' },
  { id: 2, company: 'Peer group rank', revenue: '17 of 21', growth: '96%', ebitda_margin: '43%', revenue_budget: '0', ebitda_budget: '219%', rule_of: '35' },
  { id: 3, company: '1xx-xxxx', revenue: '$10-<30 million', growth: '-15%', ebitda_margin: '-33%', revenue_budget: '0', ebitda_budget: '210%', rule_of: '35' },
  { id: 5, company: '3xx-xxxx', revenue: '$30-<$50 million', growth: '0%', ebitda_margin: '9%', revenue_budget: '0', ebitda_budget: '148%', rule_of: '9' },
  { id: 6, company: '4xx-xxxx', revenue: '$30-<$50 million', growth: '-34%', ebitda_margin: '-4%', revenue_budget: '0', ebitda_budget: '708%', rule_of: '38' }
]

export function ComparisionView () {
  return (
    <>
      <CardKPI title={'Comparison versus peers'} actions={false} height={'80vh'}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            disableSelectionOnClick
        />
      </CardKPI>
    </>
  )
}
