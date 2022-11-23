import React from 'react'
import { Select, makeStyles, MenuItem, FormLabel, FormControl, Box } from '@material-ui/core'
import { METRICS } from './../utils/constants/Metrics'
import { isEmptyObject } from '../utils/userFunctions'

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

  return (
    <Box style={ customStyle && !isEmptyObject(customStyle)
      ? customStyle
      : { marginBottom: 60, marginLeft: 10 }}
    >
      <FormControl className={classes.input}>
      <FormLabel id='metric-label' className={classes.label}>{nameOfSelect}</FormLabel>
      <Select
          value={metric || getDefaultValue()}
          label='Metric'
          onChange={onChange}
          className={classes.inputBorder}
          variant='outlined'
          style={{ width: 220 }}
          data-testid='metric-selector'
          multiple={fromDynamicReport}
      >
          {getMetricsOptions().map((item, index) => (
              <MenuItem key={index} value={item.name}>{item.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
