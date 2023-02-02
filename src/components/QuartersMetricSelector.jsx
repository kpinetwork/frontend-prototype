import React from 'react'
import { makeStyles, FormLabel, TextField, Box, FormControl } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete'
import { TOTALMETRICS } from '../utils/constants/Metrics'
import { isEmptyObject } from '../utils/userFunctions'

const useStyles = makeStyles({
  input: {
    marginRight: 20,
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

export const QuartersMetricSelector = (
  { nameOfSelect, metric, onChange, customStyle = null }
) => {
  const classes = useStyles()
  const getValue = () => {
    return TOTALMETRICS.find((item) => item.tableName === metric)
  }

  return (
    <Box style={ customStyle && !isEmptyObject(customStyle)
      ? customStyle
      : { marginBottom: 60, marginLeft: 10 }}
    >
      <FormControl className={classes.input}>
            <FormLabel className={classes.label}>{nameOfSelect}</FormLabel>
            <Autocomplete
              data-testid='quarters-metric-selector'
              id="quarters-metrics-outlined"
              options={TOTALMETRICS}
              getOptionLabel={(option) => option.name || ''}
              value={getValue() || []}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant = 'outlined'
                  className={classes.inputBorder}
                />
              )}
            />
            </FormControl>
    </Box>
  )
}
