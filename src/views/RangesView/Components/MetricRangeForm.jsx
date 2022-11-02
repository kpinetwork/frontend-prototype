import React from 'react'
import {
  Box,
  Card,
  Select,
  MenuItem,
  FormLabel,
  Typography,
  CardHeader,
  makeStyles,
  CardContent,
  CardActions,
  FormControl,
  IconButton
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import ButtonActions from '../../../components/Actions'

const useStyles = makeStyles((_theme) => ({
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
  actions: {
    flexDirection: 'row-reverse',
    display: 'flex'
  },
  title: {
    color: '#364b8a',
    fontSize: 16,
    fontWeight: 'bold'
  }
}))

export function MetricRangeForm ({ onCancel, onChange, onSave, metrics, metric }) {
  const classes = useStyles()

  return (
      <Card className={classes.form}>
        <CardHeader
          title={
            <Typography className={classes.title}>
              Modify range
            </Typography>
          }
          action={
            <IconButton onClick={onCancel} data-testid='close-button'>
                <Close/>
            </IconButton>
          }
        />
        <CardContent>
          <Box px={2}>
            <FormControl className={classes.input}>
              <FormLabel className={classes.label}>Metric</FormLabel>
              <Select
                onChange={(event) => onChange(event?.target?.value)}
                variant='outlined'
                className={classes.inputBorder}
                value={metric || ''}
                data-testid='metric-range-selector'
              >
                {
                  metrics.map(metric => (
                    <MenuItem key={metric} value={metric}>
                      {metric}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </CardContent>
        <CardActions className={classes.actions} p={4}>
          { !(metric == null) &&
            <Box px={2}>
              <ButtonActions
                okName='Save'
                cancelName='Cancel'
                onOk={onSave}
                onCancel={onCancel}
                reverse={false}
              />
          </Box>
          }
        </CardActions>
      </Card>
  )
}
