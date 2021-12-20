import { Card, FormControl, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 10,
    padding: 10,
    borderRadius: 14,
    boxShadow: '3px 9px 23px -22px rgba(0,0,0,0.46)'
  },
  title: {
    fontSize: 18,
    color: '#0d5600',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  select: {
    '&:before': {
      borderColor: '#0d5600'
    },
    '&:after': {
      borderColor: '#0d5600'
    }
  }
})

export function SelectCompany ({ companyList, setCompany, year }) {
  const [company, setCompanyState] = useState('')
  const classes = useStyles()
  const handleChange = (event) => {
    const { value } = event.target
    setCompanyState(value)
    setCompany(value)
  }

  return (
    <>
        <Card className={classes.root} variant="outlined">
            Please select a company of the {year}:
            <FormControl fullWidth style={{ padding: '10' }} >
                <Select
                    value={company}
                    label="Company"
                    onChange={handleChange}
                    className={classes.select}
                >
                {companyList.map((row) => (
                      <MenuItem key={row.company_id} value={row.company_id}>{row.name}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Card>
    </>
  )
}
