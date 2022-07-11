import React from 'react'
import { Select, makeStyles, MenuItem, InputLabel, FormLabel, FormControl, Box } from '@material-ui/core'

const investmentYears = [
  {
    label: 'Two years before investment',
    value: -2
  },
  {
    label: 'Year before investment',
    value: -1
  },
  {
    label: 'Year of investment',
    value: 0
  },
  {
    label: 'First full year after investment',
    value: 1
  },
  {
    label: 'Second full year after investment',
    value: 2
  }
]

const emptyOption = {
  value: 'None',
  label: 'None'
}

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

export const InvestmentYearSelector = ({ nameOfSelect, year, onChange, needEmptyValue }) => {
  const classes = useStyles()
  const investOptions = needEmptyValue ? investmentYears.concat(emptyOption) : investmentYears
  const selectedYear = year !== null ? year : ''
  return (
    <Box style={{ marginLeft: 10 }}>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="year-label">{nameOfSelect}</InputLabel>
      <Select
          data-testid='investment-year-selector'
          value={selectedYear}
          label="investYear"
          onChange={onChange}
          className={classes.select}
          style={{ width: 150 }}
      >
          {investOptions.map((year) => (
              <MenuItem key={year.label} value={year.value}>{year.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
