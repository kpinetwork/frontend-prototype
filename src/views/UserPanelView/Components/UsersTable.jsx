import React, { useContext, useState, useEffect } from 'react'
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
import { useLocation } from 'wouter'
import Context from '../../../context/appContext'
import useUsers from './../../../hooks/useUsers'

export function UsersPanelTable ({ classes }) {
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const rowsPerPage = 10
  const { users, isLoading, setUsers, token, getUsersData } = useUsers()
  const { setSelectedEmail } = useContext(Context).user
  const [page, setPage] = useState(0)
  const [totalUsers, setTotalUsers] = useState([])
  const [maxPage, setMaxPage] = useState(0)

  useEffect(() => {
    initUsers()
  }, [])

  const initUsers = async () => {
    const response = await getUsersData({ limit: rowsPerPage, tokens: token })
    setTotalUsers(response)
  }

  const changeRoute = () => {
    setLocation('/admin/users/detail/')
  }

  const getRoles = (groups) => {
    const roles = groups || []
    return (
      <div key={`roles-${groups}`} style={{ display: 'flex' }}>
        {roles.map((role) => (
          <Chip
            key={role}
            label={role}
            variant="outlined"
            className={classes.roleName}
          />
        ))}
      </div>
    )
  }

  const callNextUsers = async (newPage) => {
    setPage(newPage)
    setMaxPage(newPage)
    const response = await getUsersData({ limit: rowsPerPage, token })
    setTotalUsers([...totalUsers, ...response])
  }

  const setUsersFromTotalUsers = (newPage) => {
    setPage(newPage)
    const offset = newPage * rowsPerPage
    const max = (newPage - page) < 0 ? page * rowsPerPage : offset + rowsPerPage
    setUsers(totalUsers.slice(offset, max))
  }

  const handleChangePage = async (_event, newPage) => {
    const firstTimeCalled = newPage > page && newPage > maxPage
    if (token == null && firstTimeCalled) {
      return
    }
    if (newPage > page && firstTimeCalled) {
      callNextUsers(newPage)
    } else {
      setUsersFromTotalUsers(newPage)
    }
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
                  <TableCell>{getRoles(user?.roles)}</TableCell>
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
                labelDisplayedRows={(values) => {
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
