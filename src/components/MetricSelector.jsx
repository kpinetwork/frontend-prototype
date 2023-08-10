import React from 'react'
import { makeStyles, FormLabel, TextField, Box, FormControl } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete'
import { METRICS } from './../utils/constants/Metrics'
import { isEmptyObject } from '../utils/userFunctions'

const useStyles = makeStyles({
  input: {
    marginRight: 20,
    marginTop: 25,
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
    fontSize: 13,
    heigth: 5
  },
  label: {
    marginLeft: 10,
    fontSize: 14
  }
})

const emptyOption = {
  name: 'None',
  label: 'None',
  symbol: '',
  position: ''
}

const grossProfitOption = {
  name: 'gross_profit',
  label: 'Gross Profit',
  symbol: '$',
  position: 'left'
}

export const MetricSelector = (
  { nameOfSelect, metric, onChange, needEmptyValue, customStyle = null, fromDynamicReport = false }
) => {
  const classes = useStyles()
  const defaultOptions = fromDynamicReport ? metric : [metric]

  const getMetricsOptions = () => {
    if (!fromDynamicReport) {
      return needEmptyValue ? METRICS.concat(emptyOption) : METRICS
    } else {
      const unusedMetrics = ['actuals_gross_profit', 'budget_gross_profit']
      const options = METRICS.filter(metric => !unusedMetrics.includes(metric.name))

      return needEmptyValue ? options.concat([grossProfitOption, emptyOption]) : options.concat(grossProfitOption)
    }
  }

  const getDefaultValue = () => {
    return fromDynamicReport ? [] : ''
  }

  const getValue = () => {
    return !fromDynamicReport ? getMetricsOptions().find((item) => item.name === metric) : getMetricsOptions().filter((item) => defaultOptions.includes(item.name))
  }

  return (
    <Box style={ customStyle && !isEmptyObject(customStyle)
      ? customStyle
      : { marginBottom: 60, marginLeft: 10 }}
    >
      <FormControl className={classes.input}>
            <FormLabel className={classes.label}>{nameOfSelect}</FormLabel>
            <Autocomplete
              data-testid='metric-selector'
              multiple = {fromDynamicReport}
              id="metrics-outlined"
              options={getMetricsOptions()}
              getOptionLabel={(option) => option.label || ''}
              filterSelectedOptions={fromDynamicReport}
              value={getValue() || getDefaultValue()}
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
