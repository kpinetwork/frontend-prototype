import React, { useEffect, useState } from 'react'
import { Box, FormControl, Select, MenuItem, FormLabel, makeStyles, TextField, Card, CardHeader, Typography, InputAdornment, Tooltip } from '@material-ui/core'
import ButtonActions from '../../../../components/Actions'
import { BASE_SCENARIOS, METRIC_PERIOD_NAMES } from '../../../../utils/constants/Metrics'
import { CardActions } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Help } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  input: {
    marginRight: 20,
    marginTop: 25,
    minWidth: 200
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
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 12
  },
  yearPicker: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 25,
        height: 57,
        width: 230
      }
    },
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    fontSize: 12
  },
  label: {
    marginLeft: 10,
    fontSize: 14
  },
  form: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#fefeff',
    marginBottom: 50
  },
  inputText: {
    fontSize: 13,
    '&:invalid': {
      border: 'red solid 1px',
      borderRadius: 25,
      borderStyle: 'solid'
    }
  }
}))

const toolTipMessage = 'In case the selected period is full year, the sum of all periods in quarters for the selected year and scenario will be taken into account. If there is not a value it is because there is not information of quarters registered. The value can be edited.'

export function ScenarioForm ({ onCancel, scenario, onChange, onSave, metrics, needsToolTip, setIsEditting, isEditting, getFullYearTotal, setScenario }) {
  const classes = useStyles()
  const [dateValue, setDateValue] = useState({})
  const [valueError, setValueError] = useState(false)

  const limitDate = (years) => {
    const date = new Date()
    date.setFullYear(date.getFullYear() + years)
    return date
  }

  const getValue = async () => {
    if (needsToolTip && !isEditting) {
      const total = await getFullYearTotal(scenario)
      setScenario({ ...scenario, value: total })
    }
  }

  useEffect(() => {
    getValue()
  }, [needsToolTip])

  return (
      <Card className={classes.form}>
          <CardHeader
            title={<Typography style={{ color: '#364b8a', fontSize: 16, fontWeight: 'bold' }}>Add scenario</Typography>}
          />
          <Box style={{ display: 'flex', marginBottom: 30, justifyContent: 'start', flexWrap: 'wrap' }} px={2} component='form'>
              <FormControl required className={classes.input}>
                  <FormLabel className={classes.label}>Scenario</FormLabel>
                  <Select
                    onChange={(event) => onChange(event?.target?.value, 'scenario')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={scenario.scenario || ''}
                    data-testid='scenario-selector'
                  >
                      {
                          BASE_SCENARIOS.map(scenario => (
                              <MenuItem key={scenario} value={scenario} className={classes.inputText}>
                                  {scenario}
                              </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
              <FormControl required className={classes.input}>
                  <FormLabel className={classes.label}>Metric</FormLabel>
                  <Select
                    onChange={(event) => onChange(event?.target?.value, 'metric')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={scenario.metric || ''}
                    data-testid='metric-name-selector'
                  >
                      {
                          metrics.map(metric => (
                              <MenuItem key={metric} value={metric} className={classes.inputText}>
                                  {metric}
                              </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
              <FormControl required className={classes.input}>
                  <FormLabel className={classes.label}>Year</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year']}
                    value={dateValue}
                    className={classes.test}
                    id='year-picker-selector'
                    onChange={(event) => {
                      setDateValue(event)
                      onChange(event.getFullYear(), 'year')
                    }}
                    maxDate={limitDate(1)}
                    minDate={limitDate(-15)}
                    renderInput={(params) =>
                    <TextField
                    {...params}
                    variant="outlined"
                    error={false}
                    className={classes.yearPicker}
                    helperText={null}
                    placeholder={'year'}
                    />}
                  />
                  </LocalizationProvider>
              </FormControl>
              <FormControl required className={classes.input}>
                  <FormLabel className={classes.label}>Period</FormLabel>
                  <Select
                    onChange={(event) => onChange(event?.target?.value, 'period_name')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={scenario.period_name || ''}
                    data-testid='period-selector'
                  >
                      {
                          METRIC_PERIOD_NAMES.map(scenario => (
                              <MenuItem key={scenario.name} value={scenario.name} className={classes.inputText}>
                                  {scenario.label}
                              </MenuItem>
                          ))
                      }
                  </Select>
                  {needsToolTip
                    ? <Tooltip title={toolTipMessage} placement="top">
                    <Help style={{ color: '#2f5487', fontSize: 18 }}/>
                  </Tooltip>
                    : ''}
              </FormControl>
              <FormControl required className={classes.input}>
                  <FormLabel className={classes.label}>Value</FormLabel>
                  <TextField
                    error={valueError}
                    onChange={(event) => {
                      onChange(event?.target?.value, 'value')
                      setValueError(isNaN(Number(event?.target?.value)))
                      setIsEditting(true)
                    }}
                    variant="outlined"
                    value={scenario.value || ''}
                    className={classes.inputBorder}
                    placeholder={'metric value'}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      className: classes.inputText
                    }}
                  ></TextField>
              </FormControl>
          </Box>
          <CardActions>
          <Box px={2}>
              <ButtonActions
                  okName='Save'
                  cancelName='Cancel'
                  onOk={onSave}
                  onCancel={onCancel}
              />
          </Box>
          </CardActions>
      </Card>
  )
}
