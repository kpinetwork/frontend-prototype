import React from 'react'
import { Box, Backdrop, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import usePublicCompanies from '../../hooks/usePublicCompanies'
import useCompanyPermissions from './../../hooks/useCompanyPermissions'
import useCompaniesToChange from './../../hooks/useCompaniesToChange'
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
  const {
    total,
    companies,
    isLoading,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  } = usePublicCompanies()
  const {
    permissions,
    successChange,
    isPermissionsLoading,
    isUpdatingPermissions,
    assignCompanyPermissions
  } = useCompanyPermissions(email)

  const { companiesToChange, isCompanyChecked, handleChange, cleanCompaniesToChange } = useCompaniesToChange()
  const classes = useStyles()

  const initialSelected = permissions.map((permission) => {
    return permission?.id
  })

  const isCompanyInitialAllowed = (companyId) => {
    return initialSelected.includes(companyId)
  }

  const assignPermissions = async () => {
    if (Object.keys(companiesToChange).length > 0) {
      await assignCompanyPermissions(companiesToChange, email)
      cleanCompaniesToChange()
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
             {companies.map((company) => {
               const allowedCompany = { ...company, allowed: isCompanyInitialAllowed(company.id) }
               return (
                <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.sector}</TableCell>
                <TableCell>
                  <Checkbox onChange={(event) => {
                    handleChange({ event, company: allowedCompany, field: 'allowed' })
                  }} color="primary"
                 checked={
                   isCompanyChecked({ company: allowedCompany, field: 'allowed' })
                 }
                  />
                </TableCell>
              </TableRow>
               )
             })
             }
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
                  count={total}
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
        onCancel={(_) => {
          cleanCompaniesToChange()
          setOpenPermissions(false)
        }}
        okName="Save"
        cancelName="Cancel"
       />
    </Box>
  )
}
