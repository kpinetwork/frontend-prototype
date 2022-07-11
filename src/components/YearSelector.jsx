import React, { useState } from 'react'
import { Select, makeStyles, MenuItem, InputLabel, FormLabel, FormControl, Box } from '@material-ui/core'
const useStyles = makeStyles({
  select: {
    '&:before': {
      borderColor: '#008b9a'
    },
    '&:after': {
      borderColor: '#008b9a'
    }
  },
  inputBorder: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 10
      }
    },
    '& .MuiSelect-root': {
      '&:focus': {
        borderRadius: 10
      }
    },
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 13
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
      <FormControl sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="year-label">{nameOfSelect}</InputLabel>
      <Select
          data-testid='calendar-year-selector'
          value={year || ''}
          label="Age"
          onChange={onChange}
          className={classes.select}
          style={{ width: 150 }}
      >
          {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
