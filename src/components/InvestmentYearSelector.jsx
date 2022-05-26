import React from 'react'
import { Select, makeStyles, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core'

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

export const InvestmentYearSelector = ({ nameOfSelect, year, onChange }) => {
  const classes = useStyles()
  return (
    <Box style={{ marginLeft: 10 }}>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
      <InputLabel id="year-label">{nameOfSelect}</InputLabel>
      <Select
          value={year || ''}
          label="investYear"
          onChange={onChange}
          className={classes.select}
          style={{ width: 150 }}
      >
          {investmentYears.map((year) => (
              <MenuItem key={year.label} value={year.value}>{year.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
