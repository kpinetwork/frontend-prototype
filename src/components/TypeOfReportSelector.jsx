import React from 'react'
import { Select, makeStyles, MenuItem, FormLabel, FormControl, Box } from '@material-ui/core'
import { TYPEOFREPORT } from '../utils/constants/QuartersReportOptions'
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

export const TypeOfReportSelector = (
  { nameOfSelect, typeOfReport, onChange, needEmptyValue, customStyle = null }
) => {
  const classes = useStyles()

  const getTypeOptions = () => {
    return needEmptyValue ? TYPEOFREPORT.concat(emptyOption) : TYPEOFREPORT
  }

  return (
    <Box style={ customStyle && !isEmptyObject(customStyle)
      ? customStyle
      : { marginBottom: 60, marginLeft: 10 }}
    >
      <FormControl variant= "outlined" sx={{ m: 1, minWidth: 220 }}>
      <FormLabel className={classes.label}>{nameOfSelect}</FormLabel>
      <Select
          value={typeOfReport || ''}
          onChange={onChange}
          className={classes.select}
          style={{ width: 220, marginTop: 4 }}
          data-testid='type-report-selector'
      >
          {getTypeOptions().map((item, index) => (
            item.enabled ? <MenuItem key={index} value={item.name}>{item.label}</MenuItem> : <MenuItem disabled key={index} value={item.name}>{item.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
