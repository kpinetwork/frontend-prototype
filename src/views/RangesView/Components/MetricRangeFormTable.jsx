import React, { useEffect } from 'react'
import {
  Box,
  Table,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Paper,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { Alert, AlertTitle } from '@mui/material'
import { Add, DeleteOutline } from '@material-ui/icons'
import LoadingProgress from '../../../components/Progress'
import { useRangeTrackChanges } from './RangeTableTracker'

const useStyles = makeStyles((_theme) => ({
  container: {
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  head: {
    textAlign: 'center',
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    width: 80,
    textAlign: 'center',
    justifyContent: 'center',
    '& .MuiFilledInput-root': {
      background: 'white'
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 'none'
    },
    '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none'
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  },
  tableContainer: {
    width: '70%',
    marginLeft: '8rem',
    marginRight: '8rem'
  },
  actions: {
    '&.MuiTableCell-root': {
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      width: '5%'
    }
  }
}))

export function MetricRangeFormTable ({ ranges, setRanges, isLoading, metric, rangesToDelete, setRangesToDelete, editedRanges, setEditedRanges, errors, setErrors }) {
  const { handleAddSpecificRow, handleRemoveSpecificRow, handleInputChange, validateRanges, getRangesWithoutEdges } = useRangeTrackChanges({ ranges, setRanges, rangesToDelete, setRangesToDelete, setEditedRanges, editedRanges, errors, setErrors })
  const classes = useStyles()

  useEffect(() => {
    validateRanges()
  }, [ranges, errors])

  return (
      <Box>
      {
        errors.length > 0 &&
        <Alert severity="error" style={{ marginBottom: 10 }}>
          <AlertTitle>Validation Error</AlertTitle>
            {
              errors.map((error, idx) => {
                return (<Typography key={idx}>{error.errorMessage}</Typography>)
              })
            }
        </Alert>
      }

      {
        !isLoading && metric &&
        <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.container}>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell className={classes.head} style={{ borderRight: '1px solid #979797' }}>Actions</TableCell>
              <TableCell className={classes.head}>From</TableCell>
              <TableCell className={classes.head}>To</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {ranges.length > 0 && getRangesWithoutEdges().map((_, idx) => (
              <TableRow
              key={idx}
              className={classes.row}
              >
                <TableCell className={classes.actions}
                >
                  <Box style={{ display: 'flex' }}>
                    <IconButton
                      data-testid="add-button"
                      onClick={(_) => handleAddSpecificRow(idx + 2, false)}
                    >
                      <Add
                        fontSize={'small'}
                        style={{ color: '#1A1EA5' }}
                      />
                    </IconButton>
                    <IconButton
                      data-testid="remove-button"
                       onClick={(_) => handleRemoveSpecificRow(idx)}
                    >
                      <DeleteOutline
                        fontSize={'small'}
                        style={{ color: '#BBBBBF' }}
                      />
                    </IconButton>
                  </Box>

                </TableCell>
                <TableCell
                style={{ textAlign: 'center' }}
                >
                  <TextField
                  variant="filled"
                  type='number'
                  inputProps={{ style: { textAlign: 'center' } }}
                  className={classes.input}
                  value={ranges[idx + 1]?.min_value}
                  name="min_value"
                  onChange={event => handleInputChange(event, idx)}
                  />
                </TableCell>
                <TableCell
                style={{ textAlign: 'center' }}
                >
                <TextField
                  variant="filled"
                  type='number'
                  inputProps={{ style: { textAlign: 'center' } }}
                  className={classes.input}
                  value={ranges[idx + 1]?.max_value}
                  name="max_value"
                  onChange={event => handleInputChange(event, idx)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {
              getRangesWithoutEdges().length === 0 &&
              <TableRow>
                    <TableCell className={classes.actions}>
                      <IconButton
                        onClick={(_) => handleAddSpecificRow(-1, true)}
                      >
                          <Add
                            fontSize={'small'}
                            data-testid="add-button"
                            style={{ color: '#1A1EA5' }}
                          />
                      </IconButton>
                    </TableCell>
                    <TableCell colSpan={2} align={'center'} style={{ color: '#6B6A6A' }}>NO DATA</TableCell>
                  </TableRow>
            }
          </TableBody>
        </Table>
         </TableContainer>
      }
      {
        isLoading && metric &&
        <LoadingProgress/>
      }
      </Box>
  )
}
