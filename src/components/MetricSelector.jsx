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
  }
})

export const MetricSelector = ({ nameOfSelect, metric, onChange }) => {
  const classes = useStyles()

  return (
    <Box style={{ marginLeft: 10, marginBottom: 60 }}>
      <FormControl sx={{ m: 1, minWidth: 220 }} >
      <InputLabel id='metric-label'>{nameOfSelect}</InputLabel>
      <Select
          value={metric || ''}
          label='Metric'
          onChange={onChange}
          className={classes.select}
          style={{ width: 220 }}
          data-testid='metric-selector'
      >
          {METRICS.map((item, index) => (
              <MenuItem key={index} value={item.name}>{item.label}</MenuItem>
          ))}
      </Select>
      </FormControl>
    </Box>
  )
}
