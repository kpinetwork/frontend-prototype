import React, { useEffect, useState } from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useCompanyPanel from '../../../hooks/useCompanyPanel'

const useStyles = makeStyles(theme => ({
  hide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
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
  }
}))

export function CompaniesPanelTable () {
  const { companies, isLoading } = useCompanyPanel()
  const [data, setData] = useState([])
  const classes = useStyles()

  const handleChange = (event, companyId) => {
    const checked = event.target.checked
    setData(prev => prev.map(company => {
      if (companyId === company.id) {
        return { ...company, is_public_data: checked }
      }
      return company
    }))
  }

  useEffect(() => {
    if (companies) {
      setData(companies.map(item => ({ ...item, is_public_data: false })))
    }
  }, [companies])

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell className={classes.hide}>Vertical</TableCell>
              <TableCell>Public data</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
            {data.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.sector}</TableCell>
                <TableCell className={classes.hide}>{company.vertical}</TableCell>
                <TableCell>
                  <Checkbox onChange={(e) => handleChange(e, company.id)} color="primary"></Checkbox>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}
