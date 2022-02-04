import React, { useState } from 'react'
import { Box, Typography, Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox, TableFooter, TablePagination } from '@material-ui/core'
import useCompanyPanel from '../../hooks/useCompanyPanel'
import { makeStyles } from '@material-ui/core/styles'
import { TitlePanel } from './../AdminPanel/Components/TitlePanel'
import LoadingProgress from './../../components/Progress'
import ButtonActions from './../../components/Actions'

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
  }
}))

export function PermissionsView ({ setOpenPermissions, email }) {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const { companies, isLoading } = useCompanyPanel()
  const classes = useStyles()

  const handleChange = (event, companyId) => {
    const checked = event.target.checked

    setSelected(prev => {
      if (checked) {
        return [...prev, companies.find(company => company.id === companyId)?.id]
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

  return (
    <Box className={classes.root}>
      <TitlePanel title="Assign View Permission" />
      <Box pb={5}>
        <Typography variant="body2">Select all companies you want to assign VIEW permission to {email}.</Typography>
        <Typography variant="body2">{email} will be able to view company information without data anonymization.</Typography>
      </Box>
      <TableContainer component={Paper}>
         <Table>
           <TableHead>
             <TableRow className={classes.head}>
               <TableCell className={classes.head}>Name</TableCell>
               <TableCell className={classes.head}>Sector</TableCell>
               <TableCell className={classes.head}>Allow</TableCell>
             </TableRow>
           </TableHead>
           {!isLoading && (
             <TableBody>
             {companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
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
           {isLoading &&
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <LoadingProgress />
                </TableCell>
            </TableRow>
            </TableBody>
           }
           {!isLoading &&
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={companies.length}
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
        onOk={(_) => setOpenPermissions(false)}
        onCancel={(_) => setOpenPermissions(false)}
        okName="Save"
        cancelName="Cancel"
       />
    </Box>
  )
}
