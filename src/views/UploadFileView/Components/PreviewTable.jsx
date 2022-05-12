import React, { useState } from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, TextField, Box, Select, MenuItem, Typography } from '@material-ui/core'
import { VERTICALS, SECTORS, INVESTOR_PROFILES } from './../../../utils/constants/CompanyDescription'
import { makeStyles } from '@material-ui/core/styles'
import { getFirstScenarioIndex } from '../../../utils/validateFile/getObjectToValidate'

const useStyles = makeStyles(theme => ({
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#FCFCFC'
    },
    color: 'black',
    fontWeight: 'bold',
    borderRightStyle: 'solid',
    borderRightColor: '#DEDEDE',
    borderRightWidth: 1
  },
  primaryHead: {
    backgroundColor: '#F1F1F1',
    color: 'black',
    fontWeight: 'bold'
  },
  body: {
    '&.MuiTableCell-body': {
      borderRightStyle: 'solid',
      borderRightColor: '#DEDEDE',
      borderRightWidth: 1,
      width: 100
    }
  },
  customCell: {
    '& .MuiTableCell-root': {
      padding: 2
    }
  },
  defaultRow: {
    padding: 16
  },
  input: {
    fontSize: 12,
    padding: '10px 5px',
    textAlign: 'center',
    '&:invalid': {
      border: 'red solid 1px',
      borderRadius: '5px'
    }
  }
}))

const getLowerObject = (elements) => {
  return Object.fromEntries(elements.map(value => [value, value.toLowerCase()]))
}

const options = {
  2: getLowerObject(SECTORS),
  3: getLowerObject(VERTICALS),
  4: getLowerObject(INVESTOR_PROFILES)
}

export default function PreviewTable ({ head, body, edit, errorObject, isLoading }) {
  const classes = useStyles()
  const [isChange, setChange] = useState(false)
  const selectIndex = [2, 3, 4]

  const onCellChange = (rowIndex, columnIndex, value) => {
    body[rowIndex][columnIndex] = value
    validateTexfield(rowIndex, columnIndex, value)
  }

  const onSelectChange = (rowIndex, columnIndex, value) => {
    const selectOption = getSelectValue(columnIndex, value)
    body[rowIndex][columnIndex] = selectOption
    validateSelectOptions(rowIndex, columnIndex, value)
    setChange(!isChange)
  }

  const getSelectValue = (columnIndex, value) => {
    return Object.keys(options[columnIndex]).filter(option => options[columnIndex][option] === value.toLowerCase()).pop()
  }

  const assignSelectValue = (rowIndex, columnIndex, value, isValid) => {
    if (isValid) {
      const selectOption = getSelectValue(columnIndex, value)
      body[rowIndex][columnIndex] = selectOption
    }
  }

  const getPattern = (columnIndex) => {
    const firstIndex = getFirstScenarioIndex(head[0])
    if (columnIndex >= firstIndex) return '^-?[0-9]+[.]?[0-9]*$'
    else return '^(?! +).+[^ ]$'
  }

  const modifyErrorObject = (rowIndex, columnIndex, isValid) => {
    const containedInErrors = errorObject[rowIndex].includes(columnIndex)
    if (!isValid && !containedInErrors) {
      errorObject[rowIndex].push(columnIndex)
    } else if (isValid && containedInErrors) {
      errorObject[rowIndex] = errorObject[rowIndex].filter(elem => elem !== columnIndex)
    }
  }

  const validateSelectOptions = (rowIndex, columnIndex, value) => {
    const validOption = Object.values(options[columnIndex]).includes(value.toLowerCase())
    assignSelectValue(rowIndex, columnIndex, value, validOption)
    modifyErrorObject(rowIndex, columnIndex, validOption)
    return validOption
  }

  const testRegex = (rowIndex, columnIndex, value, regex) => {
    const isValid = regex.test(value)
    modifyErrorObject(rowIndex, columnIndex, isValid)
    return isValid
  }

  const validateTexfield = (rowIndex, columnIndex, value) => {
    const firstIndex = getFirstScenarioIndex(head[0])
    const pattern = getPattern(columnIndex)
    const regex = new RegExp(pattern)
    if (columnIndex < selectIndex[0] || (value !== '' && columnIndex >= firstIndex)) {
      return testRegex(rowIndex, columnIndex, value, regex)
    }
    return true
  }

  const getTextFieldValue = (rowIndex, columnIndex, value) => {
    validateTexfield(rowIndex, columnIndex, value)
    return body[rowIndex][columnIndex]
  }

  const validateValue = (rowIndex, columnIndex, value) => {
    if (selectIndex.includes(columnIndex)) return validateSelectOptions(rowIndex, columnIndex, value)
    else return validateTexfield(rowIndex, columnIndex, value)
  }

  const getValue = (rowIndex, columnIndex, value) => {
    const isValid = validateValue(rowIndex, columnIndex, value)
    return <Box className={classes.defaultRow}>
      <Typography variant='subtitle2' style={{ color: isValid ? '' : 'red' }}>{value}</Typography>
    </Box>
  }

  const selectPreview = (rowIndex, columnIndex, value) => {
    const validValue = validateSelectOptions(rowIndex, columnIndex, value)
    return (
      <Select
        value={body[rowIndex][columnIndex].toLowerCase()}
        onChange={(event) => { onSelectChange(rowIndex, columnIndex, event.target.value) }}
        style={{ margin: 'none', fontSize: 12, border: '1px solid #ced4da', width: '100%', height: '100%' }}
        error={!validValue}
      >
        {
          Object.keys(options[columnIndex]).map((option) => {
            return <MenuItem key={`${option}`} value={options[columnIndex][option]}>{option}</MenuItem>
          })
        }
      </Select>
    )
  }

  return (
    <TableContainer component={Paper}>
      {
        !isLoading &&
        <Table>
        <TableHead>
          {
            head.length > 0 &&
            <TableRow>
              {head.slice(0, 1)[0].map((item, index) => (
                <TableCell key={index} align="center" className={classes.primaryHead}>
                  {item}
                </TableCell>
              )
              )}
            </TableRow>
          }
          {head.slice(1).map((row, index) => {
            return (
              <TableRow key={index} className={classes.head}>
                {row.map((item, index) => {
                  return <TableCell key={index} align="center" className={classes.head}>
                    {item}
                  </TableCell>
                }
                )}
              </TableRow>
            )
          })
          }
        </TableHead>
        <TableBody>
          {body.map((row, rowIndex) => {
            return (
              <TableRow key={rowIndex} className={classes.customCell}>
                {row.map((item, index) => {
                  return <TableCell key={index} align="center" className={classes.body}>
                    {edit && index !== 0
                      ? <Box minWidth={100} padding={0} component='form'>
                        {
                          selectIndex.includes(index)
                            ? selectPreview(rowIndex, index, item)
                            : <TextField
                              id="outlined-basic" variant="outlined" defaultValue={getTextFieldValue(rowIndex, index, item)}
                              inputProps={{
                                className: classes.input,
                                margin: 'none',
                                pattern: getPattern(index)
                              }}
                              onChange={(event) => {
                                onCellChange(rowIndex, index, event.target.value)
                              }}
                            />
                        }
                      </Box>
                      : getValue(rowIndex, index, item)}
                  </TableCell>
                }
                )}
              </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
      }
    </TableContainer>
  )
}
