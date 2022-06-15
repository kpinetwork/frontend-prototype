import React, { useState } from 'react'
import { Box, FormControl, Select, MenuItem, FormLabel, makeStyles, TextField, Card, CardHeader, Typography, InputAdornment } from '@material-ui/core'
import ButtonActions from '../../../../components/Actions'
import { BASEMETRICS, BASE_SCENARIOS } from '../../../../utils/constants/Metrics'
import { CardActions } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

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
    fontSize: 15
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
    '&:invalid': {
      border: 'red solid 1px',
      borderRadius: 25
    },
    fontSize: 13
  }
}))

export function ScenarioForm ({ onCancel, edit, error, scenario, onChange, onSave }) {
  const classes = useStyles()
  const [dateValue, setDateValue] = useState((new Date()))

  return (
      <Card className={classes.form}>
          <CardHeader
            title={<Typography style={{ color: '#364b8a', fontSize: 16, fontWeight: 'bold' }}>Add scenario</Typography>}
          />
          {
            error &&
            <Box px={2}>
              <Typography style={{ color: 'red' }} variant='subtitle2'>{error}</Typography>
            </Box>
          }
          <Box style={{ display: 'flex', marginBottom: 30, justifyContent: 'start', flexWrap: 'wrap' }} px={2} component='form'>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Scenario</FormLabel>
                  <Select
                    onChange={(event) => onChange(event?.target?.value, 'scenario')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={scenario.scenario || ''}
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
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Metric</FormLabel>
                  <Select
                    onChange={(event) => onChange(event?.target?.value, 'metric')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={scenario.metric || ''}
                  >
                      {
                          BASEMETRICS.map(metric => (
                              <MenuItem key={metric.name} value={metric.name} className={classes.inputText}>
                                  {metric.name}
                              </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Year</FormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['year']}
                    value={dateValue}
                    className={classes.test}
                    variant='outlined'
                    onChange={(event) => {
                      setDateValue(event)
                      onChange(event.getFullYear(), 'year')
                    }}
                    renderInput={(params) => <TextField {...params} variant="outlined" className={classes.yearPicker} helperText={null} />}
                  />
                  </LocalizationProvider>
              </FormControl>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Value</FormLabel>
                  <TextField
                    type="number"
                    onChange={(event) => onChange(event?.target?.value, 'value')}
                    variant="outlined"
                    value={scenario.value || ''}
                    className={classes.inputBorder}
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
                  reverse={false}
              />
          </Box>
          </CardActions>
      </Card>
  )
}
