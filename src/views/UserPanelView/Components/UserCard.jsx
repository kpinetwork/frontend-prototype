import React from 'react'
import { Card, CardContent, Table, TableBody, TableCell, TableRow } from '@material-ui/core'

export function UserCard ({ user, rootClass }) {
  return (
    <Card>
      <CardContent>
        <Table className={rootClass}>
          <TableBody>
            <TableRow>
                <TableCell style={{ width: 120 }}>ID</TableCell>
                <TableCell>{user?.id}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>{user?.groups}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>{user?.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
