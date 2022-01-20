import React, { useEffect, useState } from 'react'
import { Card, FormControl, makeStyles, MenuItem, Select } from '@material-ui/core'
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
    color: '#008b9a',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  select: {
    '&:before': {
      borderColor: '#008b9a'
    },
    '&:after': {
      borderColor: '#008b9a'
    }
  }
})

export function SelectCompany ({ companyList, setCompanyID, year, companyID }) {
  const [company, setCompanyState] = useState('')
  const classes = useStyles()
  const handleChange = (event) => {
    const { value } = event.target
    setCompanyState(value)
    setCompanyID(value)
  }

  useEffect(() => {
    if (companyList && companyID) {
      setCompanyState(companyID)
    }
  }, [companyList])

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
