import React from 'react'
import { CardKPI } from '@components/Card/CardKPI'
import { useComparisonPeers } from '../../hooks/useComparisionPeers'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import HeadBodyGrid from '../../components/BodyGrid'

const columns = [
  { field: 'name', headerName: 'Company', width: 200 },
  { field: 'sector', headerName: 'Sector', width: 150 },
  { field: 'vertical', headerName: 'Vertical', width: 150 },
  { field: 'revenue', headerName: 'Revenue', width: 150 },
  { field: 'growth', headerName: 'Growth', width: 150 },
  { field: 'ebitda_margin', headerName: 'Ebitda Margin', width: 150 },
  { field: 'revenue_vs_budget', headerName: 'Revenue vs budget', width: 200 },
  { field: 'ebitda_vs_budget', headerName: 'Ebitda vs budget', width: 200 },
  { field: 'rule_of_40', headerName: 'Rule of 40', width: 200 }
]

export function ComparisionView ({ params }) {
  const { companyComparison, rank, peersComparison, isLoading } = useComparisonPeers({ companyId: params?.companyId })
  return (
    <>
      <CardKPI title={'Comparison versus peers'} actions={false} height={'80vh'} fullScreen={true}>
        {!isLoading
          ? <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow >
                    {columns.map(column => (
                      <TableCell key={column.field} align="right" style={{ fontWeight: 'bold' }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow
                    key={companyComparison?.name}
                    style={{ backgroundColor: '#cececeb9' }}>
                    <TableCell align="right">{companyComparison?.name}</TableCell>
                    <TableCell align="right">{companyComparison?.sector}</TableCell>
                    <TableCell align="right">{companyComparison?.vertical}</TableCell>
                    <TableCell align="right">{companyComparison?.revenue}</TableCell>
                    <TableCell align="right">{companyComparison?.growth}</TableCell>
                    <TableCell align="right">{companyComparison?.ebitda_margin}</TableCell>
                    <TableCell align="right">{companyComparison?.revenue_vs_budget}</TableCell>
                    <TableCell align="right">{companyComparison?.ebitda_vs_budget}</TableCell>
                    <TableCell align="right">{companyComparison?.rule_of_40}</TableCell>
                  </TableRow>
                  <TableRow
                    key={rank?.revenue}
                    style={{ backgroundColor: '#cececeb9' }}>
                    <TableCell align="right">{''}</TableCell>
                    <TableCell align="right">{''}</TableCell>
                    <TableCell align="right">{''}</TableCell>
                    <TableCell align="right">{rank?.revenue}</TableCell>
                    <TableCell align="right">{rank?.growth}</TableCell>
                    <TableCell align="right">{rank?.ebitda_margin}</TableCell>
                    <TableCell align="right">{rank?.revenue_vs_budget}</TableCell>
                    <TableCell align="right">{rank?.ebitda_vs_budget}</TableCell>
                    <TableCell align="right">{rank?.rule_of_40}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {peersComparison.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.sector}</TableCell>
                      <TableCell align="right">{row.vertical}</TableCell>
                      <TableCell align="right">{row.revenue}</TableCell>
                      <TableCell align="right">{row.growth}</TableCell>
                      <TableCell align="right">{row.ebitda_margin}</TableCell>
                      <TableCell align="right">{row.revenue_vs_budget}</TableCell>
                      <TableCell align="right">{row.ebitda_vs_budget}</TableCell>
                      <TableCell align="right">{row.rule_of_40}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          : <HeadBodyGrid/>}
      </CardKPI>
    </>
  )
}
