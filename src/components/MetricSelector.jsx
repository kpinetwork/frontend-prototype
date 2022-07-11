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

export const MetricSelector = ({ nameOfSelect, metric, onChange, needEmptyValue }) => {
  const classes = useStyles()
  const metrics = needEmptyValue ? METRICS.concat(emptyOption) : METRICS

  return (
    <Box style={{ marginBottom: 60, marginLeft: 10 }}>
      <FormControl sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id='metric-label'>{nameOfSelect}</InputLabel>
      <Select
          value={metric || ''}
          label='Metric'
          onChange={onChange}
          className={classes.select}
          style={{ width: 220 }}
          data-testid='metric-selector'
      >
          {metrics.map((item, index) => (
              <MenuItem key={index} value={item.name}>{item.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
