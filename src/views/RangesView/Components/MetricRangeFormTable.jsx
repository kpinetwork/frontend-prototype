import React from 'react'
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
  makeStyles
} from '@material-ui/core'
import { Add, DeleteOutline } from '@material-ui/icons'
import LoadingProgress from '../../../components/Progress'

const defautlRange = { min_value: '', max_value: '' }

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

export function MetricRangeFormTable ({ ranges, setRanges, isLoading, metric }) {
  const classes = useStyles()

  const handleAddSpecificRow = (idx) => {
    const newRanges = [...ranges]
    const range = { id: '', label: '', min_value: '', max_value: '' }
    newRanges.splice(idx + 2, 0, range)
    setRanges(newRanges)
  }

  const handleRemoveSpecificRow = (idx) => {
    const newRanges = [...ranges]
    newRanges.splice(idx + 1, 1)
    setRanges(newRanges)
  }

  const handleInputChange = (idx) => (e) => {
    const { name, value } = e.target
    const actualRange = ranges[idx + 1]
    if (name === 'min_value') {
      actualRange.min_value = parseInt(value)
    }
    if (name === 'max_value') {
      actualRange.max_value = parseInt(value)
    }
    const newRanges = [...ranges]
    newRanges[idx + 1] = {
      ...actualRange
    }
    setRanges(newRanges)
  }

  return (
      <Box>
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
            {ranges.length > 0 && ranges.slice(1, -1).map((_, idx) => (
              <TableRow
              key={idx}
              className={classes.row}
              >
                <TableCell className={classes.actions}
                >
                  <Box style={{ display: 'flex' }}>
                    <IconButton
                      onClick={(_) => handleAddSpecificRow(idx)}
                    >
                      <Add
                        fontSize={'small'}
                        data-testid="add-button"
                        style={{ color: '#1A1EA5' }}
                      />
                    </IconButton>
                    <IconButton
                       onClick={(_) => handleRemoveSpecificRow(idx)}
                    >
                      <DeleteOutline
                        fontSize={'small'}
                        data-testid="remove-button"
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
                  inputProps={{ style: { textAlign: 'center' } }}
                  className={classes.input}
                  value={ranges[idx + 1].min_value}
                  name="min_value"
                  onChange={handleInputChange(idx)}
                  />
                </TableCell>
                <TableCell
                style={{ textAlign: 'center' }}
                >
                <TextField
                  variant="filled"
                  inputProps={{ style: { textAlign: 'center' } }}
                  className={classes.input}
                  value={ranges[idx + 1].max_value}
                  name="max_value"
                  onChange={handleInputChange(idx)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {
              ranges.slice(1, -1).length === 0 && [...ranges.slice(1, -1), defautlRange].map(
                (_, idx) => (
                  <TableRow key={idx}>
                  <TableCell className={classes.actions}>
                  <IconButton
                      onClick={(_) => handleAddSpecificRow(idx - 1)}
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
                )
              )
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
