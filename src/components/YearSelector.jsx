import React, { useState } from 'react'
import { Select, makeStyles, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core'
const useStyles = makeStyles({
  select: {
    '&:before': {
      borderColor: '#008b9a'
    },
    '&:after': {
      borderColor: '#008b9a'
    }
  }
})

export const YearSelector = ({ nameOfSelect, year, onChange }) => {
  const actualYear = new Date().getFullYear()
  const [years] = useState(() => {
    const years = []
    for (let i = 0; i < 10; i++) {
      years.push(actualYear - i)
    }
    return years
  })

  const classes = useStyles()

  return (
    <Box style={{ marginRight: 10 }}>
      <FormControl sx={{ m: 1, minWidth: 150 }} >
      <InputLabel id="year-label">{nameOfSelect}</InputLabel>
      <Select
          value={year || ''}
          label="Age"
          onChange={onChange}
          className={classes.select}
          style={{ width: 150 }}
      >
          {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
