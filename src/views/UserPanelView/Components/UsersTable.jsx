import React, { useContext } from 'react'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  Chip,
  TableFooter,
  TablePagination
} from '@material-ui/core'
import LoadingProgress from './../../../components/Progress'
import Context from '../../../context/appContext'
import useUsers from './../../../hooks/useUsers'

export function UsersPanelTable ({ classes, roleValue }) {
  const { VITE_ENV: env } = import.meta.env
  const groupRole = `${env}_${roleValue}_group`
  const { users, isLoading, page, handleChangePage, rowsPerPage, setLocation } = useUsers({ groupRole })
  const { setSelectedEmail } = useContext(Context).user

  const changeRoute = () => {
    setLocation('/admin/users/detail/')
  }

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.head}>Email</TableCell>
              <TableCell className={classes.head}>Role</TableCell>
            </TableRow>
          </TableHead>
          {
            !isLoading &&
            <TableBody>
              {users.map((user) => (
                <TableRow key={user?.email}>
                  <TableCell
                    onClick={(_) => {
                      changeRoute()
                      setSelectedEmail(user?.email)
                    }}
                  >
                    {user?.email}
                  </TableCell>
                  <TableCell>
                    <Chip
                    label={roleValue}
                    variant="outlined"
                    className={classes.roleName}
                  /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          }
          {isLoading &&
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <LoadingProgress />
                </TableCell>
            </TableRow>
            </TableBody>
           }
          { !isLoading &&
            <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={2}
                rowsPerPage={rowsPerPage}
                page={page}
                rowsPerPageOptions={[rowsPerPage]}
                labelDisplayedRows={(_values) => {
                  return `Page ${page + 1}`
                }}
                onPageChange={handleChangePage}
                count={-1}
              ></TablePagination>
            </TableRow>
          </TableFooter>
          }
        </Table>
      </TableContainer>
    </div>
  )
}
