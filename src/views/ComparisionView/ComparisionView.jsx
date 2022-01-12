import React from 'react'
import { Grid } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'
import { useComparisonPeers } from '../../hooks/useComparisionPeers'
import { Filter } from '../../components/Filter/Filter'
import { Information } from '../../components/HeaderInformation'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import HeadBodyGrid from '../../components/BodyGrid'

const columns = [
  { field: 'name', headerName: 'Company', width: 200, align: 'left' },
  { field: 'sector', headerName: 'Sector', width: 150, align: 'left' },
  { field: 'vertical', headerName: 'Vertical', width: 150, align: 'left' },
  { field: 'revenue', headerName: 'Revenue', width: 150, align: 'center' },
  { field: 'growth', headerName: 'Growth', width: 150, align: 'center' },
  { field: 'ebitda_margin', headerName: 'Ebitda Margin', width: 150, align: 'center' },
  { field: 'revenue_vs_budget', headerName: 'Revenue vs budget', width: 200, align: 'center' },
  { field: 'ebitda_vs_budget', headerName: 'Ebitda vs budget', width: 200, align: 'center' },
  { field: 'rule_of_40', headerName: 'Rule of 40', width: 200, align: 'center' }
]

export function ComparisionView ({ params }) {
  const { companyComparison, rank, peersComparison, isLoading, year, setYear,filters, setFilters} = useComparisonPeers({ companyId: params?.companyId })
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}><Information year={year} setYear={setYear}/></Grid>
       </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}><Filter setFilters={setFilters} fillFilters={false} filters={filters} xs={12} sm={6} md ={4} lg={3} xl={3}/></Grid>
      </Grid>
      <CardKPI title={'Comparison versus peers'} actions={false} height={'80vh'} fullScreen={true}>
        {!isLoading
          ? <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow >
                    {columns.map(column => (
                      <TableCell key={column.field} align={column.align} style={{ fontWeight: 'bold' }}>
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow
                    key={companyComparison?.name}
                    style={{ backgroundColor: '#cececeb9' }}>
                    <TableCell align="left">{companyComparison?.name}</TableCell>
                    <TableCell align="left">{companyComparison?.sector}</TableCell>
                    <TableCell align="left">{companyComparison?.vertical}</TableCell>
                    <TableCell align="center">{'$ '+ companyComparison?.revenue}</TableCell>
                    <TableCell align="center">{companyComparison?.growth + ' %'}</TableCell>
                    <TableCell align="center">{companyComparison?.ebitda_margin + ' %'}</TableCell>
                    <TableCell align="center">{companyComparison?.revenue_vs_budget + ' %'}</TableCell>
                    <TableCell align="center">{companyComparison?.ebitda_vs_budget + ' %'}</TableCell>
                    <TableCell align="center">{companyComparison?.rule_of_40}</TableCell>
                  </TableRow>
                  <TableRow
                    key={rank?.revenue}
                    style={{ backgroundColor: '#cececeb9' }}>
                    <TableCell align="center">{''}</TableCell>
                    <TableCell align="center">{''}</TableCell>
                    <TableCell align="center">{''}</TableCell>
                    <TableCell align="center">{rank?.revenue}</TableCell>
                    <TableCell align="center">{rank?.growth}</TableCell>
                    <TableCell align="center">{rank?.ebitda_margin}</TableCell>
                    <TableCell align="center">{rank?.revenue_vs_budget}</TableCell>
                    <TableCell align="center">{rank?.ebitda_vs_budget}</TableCell>
                    <TableCell align="center">{rank?.rule_of_40}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {peersComparison.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.sector}</TableCell>
                      <TableCell align="left">{row.vertical}</TableCell>
                      <TableCell align="center">{row.revenue}</TableCell>
                      <TableCell align="center">{row.growth + ' %'}</TableCell>
                      <TableCell align="center">{row.ebitda_margin + ' %'}</TableCell>
                      <TableCell align="center">{row.revenue_vs_budget + ' %'}</TableCell>
                      <TableCell align="center">{row.ebitda_vs_budget + ' %'}</TableCell>
                      <TableCell align="center">{row.rule_of_40}</TableCell>
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
