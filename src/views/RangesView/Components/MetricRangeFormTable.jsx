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
  makeStyles
} from '@material-ui/core'
import { Add, RemoveCircleOutline } from '@material-ui/icons'
import LoadingProgress from '../../../components/Progress'

const defautlRange = { min_value: '', max_value: '' }

const useStyles = makeStyles((_theme) => ({
  root: {
    width: '70%'
  },
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
  }
}))

export function MetricRangeFormTable ({ ranges, setRanges, isLoading, metric }) {
  const classes = useStyles()

  const handleAddSpecificRow = (idx) => {
    const newRanges = [...ranges]
    const range = { min_value: '', max_value: '' }
    newRanges.splice(idx + 2, 0, range)
    setRanges(newRanges)
  }

  const handleRemoveSpecificRow = (idx) => {
    const newRanges = [...ranges]
    newRanges.splice(idx + 1, 1)
    setRanges(newRanges)
  }

  return (
      <Box>
      {
        !isLoading && metric &&
        <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.container}>
          <TableHead>
            <TableRow className={classes.head}>
            <TableCell className={classes.head}></TableCell>
              <TableCell className={classes.head}>FROM</TableCell>
              <TableCell className={classes.head}>TO</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
            {ranges.length > 0 && ranges.slice(1, -1).map((range, idx) => (
              <TableRow key={idx}>
                <TableCell style={{ color: '#B0B0B0', width: 80 }}
                >
                  <Add
                    data-testid="add-button"
                    className={classes.icon}
                    onClick={(_) => handleAddSpecificRow(idx)}
                  />
                  <RemoveCircleOutline
                    data-testid="remove-button"
                    style={{ color: '#B0B0B0' }}
                    onClick={(_) => handleRemoveSpecificRow(idx)}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  <TextField
                  variant="filled"
                  inputProps={{ style: { textAlign: 'center' } }}
                  className={classes.input}
                  defaultValue={range.min_value}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                <TextField
                  variant="filled"
                  inputProps={{ style: { textAlign: 'center' } }}
                  className={classes.input}
                  defaultValue={range.max_value}
                  />
                </TableCell>
              </TableRow>
            ))}
            {
              ranges.slice(1, -1).length === 0 && [...ranges.slice(1, -1), defautlRange].map(
                (_, idx) => (
                  <TableRow key={idx}>
                  <TableCell style={{ color: '#B0B0B0', width: 100 }}>
                    <Add
                      data-testid="add-button"
                      className={classes.icon}
                      onClick={(_) => handleAddSpecificRow(idx - 1)}
                    />
                </TableCell>
                <TableCell>NO DATA</TableCell>
                <TableCell></TableCell>
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
