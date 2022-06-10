import { Card, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
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
    color: '#005f83',
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

export function Information ({ year, setYear }) {
  const [age, setAge] = useState(year)
  const [years] = useState(() => {
    const years = []
    for (let i = 0; i < 10; i++) {
      years.push(new Date().getFullYear() - i)
    }
    return years
  })
  const classes = useStyles()

  const handleChange = (event) => {
    const { value } = event.target
    setAge(value)
    setYear(value)
  }

  return (
    <>
        <Card className={classes.root} variant="outlined">
            <span className={classes.title}>Hello everyone,</span> please select:
            <FormControl fullWidth style={{ padding: '10' }} >
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    className={classes.select}
                    data-testid='header-select'
                >
                {years.map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Card>
    </>
  )
}
