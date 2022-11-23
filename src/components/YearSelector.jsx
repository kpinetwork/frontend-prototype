import React, { useState } from 'react'
import { Select, makeStyles, MenuItem, FormLabel, FormControl, Box } from '@material-ui/core'
const useStyles = makeStyles({
  input: {
    marginRight: 20,
    marginTop: 5,
    minWidth: 200,
    marginBottom: 5,
    justifyContent: 'center'
  },
  inputBorder: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 25
      }
    },
    '& .MuiSelect-root': {
      '&:focus': {
        borderRadius: 25
      }
    },
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 14
  },
  label: {
    marginLeft: 10,
    fontSize: 14
  }
})

export const YearSelector = ({ nameOfSelect, year, onChange, needEmptyValue }) => {
  const actualYear = new Date().getFullYear()
  const [years] = useState(() => {
    const years = []
    for (let i = 0; i < 10; i++) {
      years.push(actualYear - i)
    }
    return years
  })

  const classes = useStyles()
  const yearOptions = needEmptyValue ? years.concat('None') : years

  return (
    <Box style={{ marginRight: 10 }}>
      <FormControl className={classes.input}>
      <FormLabel id="year-label" className={classes.label}>{nameOfSelect}</FormLabel>
      <Select
          data-testid='calendar-year-selector'
          value={year || ''}
          label="Age"
          variant='outlined'
          onChange={onChange}
          className={classes.inputBorder}
      >
          {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
