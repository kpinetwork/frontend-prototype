import React from 'react'
import { Card, CardContent, Table, TableBody, TableCell, TableRow } from '@material-ui/core'

export function UserCard ({ user, rootClass }) {
  return (
    <Card className={rootClass}>
      <CardContent style={{ overflowX: 'auto' }}>
        <Table>
          <TableBody>
            <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>{user?.roles}</TableCell>
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
