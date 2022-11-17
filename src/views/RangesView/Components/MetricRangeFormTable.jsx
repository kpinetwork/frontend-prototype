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

const defaultRange = { min_value: '', max_value: '' }

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
  const classes = useStyles()

  useEffect(() => {
    validateRanges()
  }, [ranges, errors])

  const handleAddSpecificRow = (idx, isRangesEmpty) => {
    const newRanges = isRangesEmpty ? [...ranges, { min_value: null, max_value: null }, { min_value: null, max_value: null }] : [...ranges]
    const range = { ...defaultRange }
    newRanges.splice(idx, 0, range)
    setRanges(newRanges)
  }

  const handleRemoveSpecificRow = (idx) => {
    const deletedRow = ranges[idx + 1]
    const deletedRanges = [...rangesToDelete, deletedRow.id].filter(id => id !== '')
    const newRanges = [...ranges]
    newRanges.splice(idx + 1, 1)
    setRanges(newRanges)
    setRangesToDelete(deletedRanges)
  }

  const castToNumber = (number) => {
    return number !== null ? parseFloat(number) : number
  }

  const isRangeCorrect = (range) => (castToNumber(range?.min_value) < castToNumber(range?.max_value)) || (range?.max_value == null || range?.min_value == null)

  const isRangeLimitCorrect = (range, nextRange) => castToNumber(range?.max_value) === castToNumber(nextRange?.min_value) || (nextRange?.max_value == null || nextRange?.min_value == null) || (range?.max_value == null || range?.min_value == null)

  const rowHasSpecificError = (errorType, index) => errors.find(error => error?.row === index && error?.type === errorType)

  const validateRanges = () => {
    ranges.forEach((range, index) => {
      if (rowHasSpecificError('rangeError', index) && isRangeCorrect(range)) {
        const updatedError = errors.filter(error => error?.row !== index || error?.type !== 'rangeError')
        setErrors([...updatedError])
      }
      if (rowHasSpecificError('limitError', index) && isRangeLimitCorrect(range, ranges[index + 1])) {
        const updatedError = errors.filter(error => (error?.row !== index || error?.type !== 'limitError'))
        setErrors([...updatedError])
      }
      if (!rowHasSpecificError('rangeError', index) && !isRangeCorrect(range)) {
        setErrors([...errors, { row: index, type: 'rangeError', errorMessage: `row ${index}: The minimum value must be less than the maximum value in the same range` }])
      }
      if (!rowHasSpecificError('limitError', index) && !isRangeLimitCorrect(range, ranges[index + 1]) && index !== 0) {
        setErrors([...errors, { row: index, type: 'limitError', errorMessage: `row ${index}: The upper limit must be equal to the lower limit of the next range` }])
      }
    })
  }

  const handleInputChange = (idx) => (e) => {
    const { name, value } = e.target
    const actualRange = ranges[idx + 1]
    if (name === 'min_value') {
      actualRange.min_value = value
    }
    if (name === 'max_value') {
      actualRange.max_value = value
    }
    const newRanges = [...ranges]
    newRanges[idx + 1] = {
      ...actualRange
    }
    const modifiedRange = editedRanges.find(elem => elem.id === actualRange.id)
    actualRange.defaultIndex = idx + 1
    if (modifiedRange === undefined) {
      setEditedRanges([...editedRanges, actualRange])
    } else {
      const indexRange = editedRanges.map(elem => elem.id).indexOf(modifiedRange.id)
      editedRanges[indexRange] = actualRange
      setEditedRanges(editedRanges)
    }
    setRanges(newRanges)
  }

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
            {ranges.length > 0 && ranges.filter(range => range?.min_value !== null && range?.max_value !== null).map((_, idx) => (
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
                  onChange={handleInputChange(idx)}
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
                  onChange={handleInputChange(idx)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {
              ranges.filter(range => range?.min_value !== null && range?.max_value !== null).length === 0 &&
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
