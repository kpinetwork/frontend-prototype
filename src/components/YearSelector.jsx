import React, { useState } from 'react'
import { Select, makeStyles, MenuItem, FormControl, Box, FormLabel } from '@material-ui/core'
const useStyles = makeStyles({
  input: {
    marginRight: 20,
    marginTop: 20,
    minWidth: 300
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
    fontSize: 12,
    height: 5
  },
  label: {
    marginLeft: 10,
    fontSize: 12
  }
})

export const YearSelector = ({ nameOfSelect, year, onChange, needEmptyValue, isMultiple = false, sizeOfSelector = 'small', selectAdditionalProps, disabled = false }) => {
  const actualYear = new Date().getFullYear()
  const [years] = useState(() => {
    const years = []
    for (let i = 0; i < 10; i++) {
      years.push(actualYear - i)
    }
    return years.reverse()
  })
  const classes = useStyles()
  const yearOptions = needEmptyValue ? years.concat('None') : years

  const getDefaultValue = () => {
    return isMultiple ? [] : ''
  }

  return (
    <Box style={{ marginRight: 10 }}>
      <FormControl variant='outlined' sx={{ m: 1, minWidth: 100 }} size = {sizeOfSelector} disabled={disabled}>
      <FormLabel className={classes.label} id="year-label">{nameOfSelect}</FormLabel>
      <Select
          data-testid='calendar-year-selector'
          value={year || getDefaultValue()}
          multiple={isMultiple}
          onChange={onChange}
          className={classes.select}
          {...selectAdditionalProps}
          style={{ width: isMultiple ? 250 : 150, marginTop: 5, marginBottom: 20, height: 50 }}
      >
          {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
