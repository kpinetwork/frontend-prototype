import React from 'react'
import { Select, makeStyles, MenuItem, FormLabel, FormControl, Box } from '@material-ui/core'
import { SCENARIOS } from '../utils/constants/QuartersReportOptions'
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

const emptyOption = {
  name: 'None',
  label: 'None',
  symbol: '',
  position: ''
}

export const ScenarioSelector = (
  { nameOfSelect, scenario, onChange, needEmptyValue, customStyle = null }
) => {
  const classes = useStyles()

  const getTypeOptions = () => {
    return needEmptyValue ? SCENARIOS.concat(emptyOption) : SCENARIOS
  }

  return (
    <Box style={ customStyle && !isEmptyObject(customStyle)
      ? customStyle
      : { marginBottom: 60, marginLeft: 10 }}
    >
      <FormControl variant= "outlined" sx={{ m: 1, minWidth: 220 }}>
      <FormLabel className={classes.label}>{nameOfSelect}</FormLabel>
      <Select
          value={scenario || ''}
          onChange={onChange}
          className={classes.select}
          style={{ maxHeigth: 5, width: 200, marginTop: 4 }}
          data-testid='scenario-selector'
      >
          {getTypeOptions().map((item, index) => (
              <MenuItem key={index} value={item.name}>{item.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
