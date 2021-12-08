import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { CardKPI } from '../../../components/Card/CardKPI'

export function DesciptionCard () {
  return (
        <CardKPI title={'Description'} actions={false}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={8}>Name</TableCell>
                        <TableCell align="right">NAMSoft</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Unique ID</TableCell>
                        <TableCell align="right">300</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Sector</TableCell>
                        <TableCell align="right">Aplication Software</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Vertical</TableCell>
                        <TableCell align="right">Life Science</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Investor Profile</TableCell>
                        <TableCell align="right">Early stage VC</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Size Cohort</TableCell>
                        <TableCell align="right">{'$30-$<50 million'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={8}>Growth cohort</TableCell>
                        <TableCell align="right">{'Low growth (0-10%)'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardKPI>

  )
}
