import React from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'

export function PermissionsTable ({ rootClass }) {
  return (
    <Table className={rootClass}>
        <TableHead>
            <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Role</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {/* agregar tablas aqui */}
        </TableBody>
    </Table>
  )
}
