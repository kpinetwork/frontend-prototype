import React from 'react'
import { Select, makeStyles, MenuItem, FormLabel, FormControl, Box } from '@material-ui/core'
import { METRIC_PERIOD_NAMES } from '../utils/constants/Metrics'
import { isEmptyObject } from '../utils/userFunctions'

const useStyles = makeStyles({
  input: {
    marginRight: 20,
    marginLeft: 100,
    minWidth: 220,
    maxHeigth: 20
  },
  inputBorder: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 5
      }
    },
    '& .MuiSelect-root': {
      '&:focus': {
        borderRadius: 5
      }
    },
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  label: {
    marginLeft: 10,
    fontSize: 12
  }
})

export const PeriodSelector = (
  { period, nameOfSelect, onChange, customStyle = null }
) => {
  const classes = useStyles()

  return (
    <Box style={ customStyle && !isEmptyObject(customStyle)
      ? customStyle
      : { marginBottom: 60, marginLeft: 10 }}
    >
      <FormControl variant= "outlined" sx={{ m: 1, minWidth: 100 }} >
      <FormLabel className={classes.label}>{nameOfSelect}</FormLabel>
      <Select
          value={period || ''}
          onChange={onChange}
          className={classes.select}
          style={{ width: 120, marginTop: 4, height: 52 }}
          data-testid='period-selector'
      >
          {METRIC_PERIOD_NAMES.map((item, index) => (
              <MenuItem key={index} value={item.name}>{item.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
