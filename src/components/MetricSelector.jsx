import React from 'react'
import { Select, makeStyles, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core'
import { METRICS } from './../utils/constants/Metrics'

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

export const MetricSelector = ({ nameOfSelect, metric, onChange, needEmptyValue, fromDynamicReport = false }) => {
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
    <Box style={{ marginBottom: 60, marginLeft: 10 }}>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id='metric-label'>{nameOfSelect}</InputLabel>
      <Select
          value={metric || getDefaultValue()}
          label='Metric'
          onChange={onChange}
          className={classes.select}
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
