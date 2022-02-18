import React, { useState, useEffect } from 'react'
import { Box, Backdrop, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import usePublicCompanies from '../../hooks/usePublicCompanies'
import useCompanyPermissions from './../../hooks/useCompanyPermissions'
import { makeStyles } from '@material-ui/core/styles'
import { TitlePanel } from './../AdminPanel/Components/TitlePanel'
import LoadingProgress from './../../components/Progress'
import ButtonActions from './../../components/Actions'
import { Alert } from '@aws-amplify/ui-react'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '80vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    '&.MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold'
    }
  },
  paper: {
    background: 'transparent'
  }
}))

export function PermissionsView ({ setOpenPermissions, email }) {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [data, setData] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { companies, isLoading } = usePublicCompanies()
  const { permissions, successChange, isPermissionsLoading, isUpdatingPermissions, assignCompanyPermissions } = useCompanyPermissions(email)
  const classes = useStyles()

  useEffect(() => {
    setData([...companies])
    fillSelected()
  }, [companies])

  const fillSelected = () => {
    const initialSelected = permissions.map((permission) => {
      return permission?.id
    })
    setSelected(initialSelected)
  }

  const handleChange = (event, companyId) => {
    const checked = event.target.checked

    setSelected(prev => {
      if (checked) {
        return [...prev, data.find(company => company.id === companyId)?.id]
      } else {
        return prev.filter(id => id !== companyId)
      }
    })
  }

  const isSelected = (company, selectedIds) => {
    return selectedIds.some(id => id === company?.id)
  }

  const handleChangePage = (_event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getAllowedPermissions = () => {
    const companies = {}
    selected.forEach(companyID => {
      const alreadyAllowed = permissions.some(permission => permission?.id === companyID)
      if (!alreadyAllowed) {
        companies[companyID] = true
      }
    })
    return companies
  }

  const getRevokedPermissions = () => {
    const companies = {}
    permissions.forEach(permission => {
      const alreadyAllowed = selected.some(companyID => permission?.id === companyID)
      if (!alreadyAllowed) {
        companies[permission?.id] = false
      }
    })
    return companies
  }

  const assignPermissions = async () => {
    const allowed = getAllowedPermissions()
    const revoked = getRevokedPermissions()
    const companyPermissions = Object.assign(allowed, revoked)
    if (Object.keys(companyPermissions).length > 0) {
      assignCompanyPermissions(companyPermissions, email)
    }
  }

  return (
    <Box className={classes.root}>
      <TitlePanel title="Assign View Permission" />
      <Box pb={5}>
        <Typography variant="body2">Select all companies you want to assign VIEW permission to {email}.</Typography>
        <Typography variant="body2">{email} will be able to view company information without data anonymization.</Typography>
      </Box>
      {
        successChange === false &&
        <Box mb={3}>
          <Alert wrap="wrap" variation="error" isDismissible={true} heading="Cannot change permissions"></Alert>
        </Box>
      }
      <Backdrop open={isUpdatingPermissions} className={classes.paper}>
        <LoadingProgress />
      </Backdrop>
      <TableContainer>
         <Table>
           <TableHead>
             <TableRow className={classes.head}>
               <TableCell className={classes.head}>Name</TableCell>
               <TableCell className={classes.head}>Sector</TableCell>
               <TableCell className={classes.head}>Allow</TableCell>
             </TableRow>
           </TableHead>
           {!isLoading && !isPermissionsLoading && (
             <TableBody>
             {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
               <TableRow key={company.id}>
                 <TableCell>{company.name}</TableCell>
                 <TableCell>{company.sector}</TableCell>
                 <TableCell>
                   <Checkbox onChange={(e) => handleChange(e, company.id)} color="primary" checked={isSelected(company, selected)} />
                 </TableCell>
               </TableRow>
             ))}
           </TableBody>
           )}
           {(isLoading || isPermissionsLoading) &&
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <LoadingProgress />
                </TableCell>
            </TableRow>
            </TableBody>
           }
           {!isLoading && !isPermissionsLoading &&
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                >
                </TablePagination>
              </TableRow>
           </TableFooter>
          }
         </Table>
       </TableContainer>
       <ButtonActions
        onOk={(_) => assignPermissions()}
        onCancel={(_) => setOpenPermissions(false)}
        okName="Save"
        cancelName="Cancel"
       />
    </Box>
  )
}
