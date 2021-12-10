import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { CardKPI } from '@components/Card/CardKPI'

export function CompanyCard () {
  return (
        <CardKPI title={'Company financial profile'} actions={false} overflow='auto'>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={8}>Most revenue annual revenue</TableCell>
                        <TableCell align="right">$38</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Most recenut annual ebitda</TableCell>
                        <TableCell align="right">$5</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Most recent rule of 40</TableCell>
                        <TableCell align="right">20</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Current budgeted revenue growth</TableCell>
                        <TableCell align="right">17%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Current budgeted ebitda growth</TableCell>
                        <TableCell align="right">14%</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Current budgeted rule of 40</TableCell>
                        <TableCell align="right">14%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardKPI>

  )
}
