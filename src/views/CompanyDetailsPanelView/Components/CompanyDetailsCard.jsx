import React from 'react'
import { Card, CardContent, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import useCompanyDetails from '../../../hooks/useCompanyDetails'

export function CompanyDetailsCard ({ rootClass }) {
  const { company } = useCompanyDetails()
  return (
    <Card className={rootClass}>
      <CardContent style={{ overflowX: 'auto' }}>
        <Table>
          <TableBody>
            <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>{company?.name}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Sector</TableCell>
                <TableCell>{company?.sector}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Vertical</TableCell>
                <TableCell>{company?.vertical}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Investor Profile</TableCell>
                <TableCell>{company?.investorProfile}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
