import React from 'react'
import { Box, FormControl, Select, MenuItem, FormLabel, makeStyles, TextField, Card, CardHeader, Typography } from '@material-ui/core'
import ButtonActions from '../../../../components/Actions'
import { STRUCTURES, OWNERSHIPS } from '../../../../utils/constants/Investment'
import { INVESTOR_PROFILES } from '../../../../utils/constants/CompanyDescription'
import { CardActions } from '@mui/material'
import moment from 'moment'

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
    fontSize: 13
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

export function InvestmentForm ({ onCancel, edit, error, onChange, investment, onSave, rounds }) {
  const classes = useStyles()

  const getYear = () => {
    return new Date().getFullYear() + 3
  }

  const getRound = () => {
    if (rounds == null || rounds.length === 0) {
      return [{ value: 1, name: moment.localeData().ordinal(1) }]
    }
    const lastRound = Math.max(...rounds)
    return [{ value: lastRound + 1, name: moment.localeData().ordinal(lastRound + 1) }]
  }

  return (
      <Card className={classes.form}>
          <CardHeader
            title={<Typography style={{ color: '#364b8a', fontSize: 16, fontWeight: 'bold' }}>Add investment</Typography>}
          />
          {
            error &&
            <Box px={2}>
              <Typography style={{ color: 'red' }} variant='subtitle2'>{error}</Typography>
            </Box>
          }
          <Box style={{ display: 'flex', marginBottom: 30, justifyContent: 'start', flexWrap: 'wrap' }} px={2} component='form'>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Invest date</FormLabel>
                  <TextField
                    type='month'
                    onChange={(event) => onChange(event, 'invest')}
                    className={classes.inputBorder}
                    value={investment.invest || ''}
                    variant='outlined'
                    inputProps={{ max: `${getYear()}-12`, className: classes.inputText }}
                    placeholder={'Investment date'}
                  />
              </FormControl>
              {
                  edit &&
                  <FormControl className={classes.input}>
                    <FormLabel className={classes.label}>Divest date</FormLabel>
                    <TextField
                        type='month'
                        onChange={(event) => onChange(event, 'divest')}
                        value={investment.divest || ''}
                        variant='outlined'
                        className={classes.inputBorder}
                        inputProps={{ max: `${getYear()}-12`, className: classes.inputText }}
                        placeholder={'Divestment date'}
                    />
                </FormControl>
              }
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Round</FormLabel>
                  <Select
                    onChange={(event) => onChange(event, 'round')}
                    value={investment.round || ''}
                    variant='outlined'
                    className={classes.inputBorder}
                  >
                      {getRound().map(
                        round => <MenuItem value={round.value} key={round.value} className={classes.inputText}>{round.name} round</MenuItem>
                      )}
                  </Select>
              </FormControl>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Structure</FormLabel>
                  <Select
                    onChange={(event) => onChange(event, 'structure')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={investment.structure || ''}
                  >
                      {
                          STRUCTURES.map(structure => (
                              <MenuItem key={structure} value={structure} className={classes.inputText}>
                                  {structure}
                              </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Ownership</FormLabel>
                  <Select
                    onChange={(event) => onChange(event, 'ownership')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={investment.ownership || ''}
                  >
                      {
                          OWNERSHIPS.map(ownership => (
                              <MenuItem key={ownership} value={ownership} className={classes.inputText}>
                                  {ownership}
                              </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Investor type</FormLabel>
                  <Select
                    onChange={(event) => onChange(event, 'investor_type')}
                    variant='outlined'
                    className={classes.inputBorder}
                    value={investment.investor_type || ''}
                  >
                      {
                          INVESTOR_PROFILES.map(type => (
                              <MenuItem key={type} value={type} className={classes.inputText}>
                                  {type}
                              </MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>
              <FormControl className={classes.input}>
                  <FormLabel className={classes.label}>Investor</FormLabel>
                  <TextField
                    onChange={(event) => onChange(event, 'investor')}
                    variant="outlined"
                    value={investment.investor || ''}
                    className={classes.inputBorder}
                    inputProps={{ className: classes.inputText }}
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
