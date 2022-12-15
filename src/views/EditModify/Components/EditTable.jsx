import React, { useState } from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, TextField, Box, Select, MenuItem, Typography } from '@material-ui/core'
import { VERTICALS, SECTORS, INVESTOR_PROFILES } from '../../../utils/constants/CompanyDescription'
import { makeStyles } from '@material-ui/core/styles'
import { isEmptyObject } from '../../../utils/userFunctions'

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
    fontWeight: 'bold',
    zIndex: 900,
    top: 0,
    position: 'sticky',
    backgroundColor: '#2f5487',
    color: 'white'
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
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    zIndex: 1000,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800
  },
  stickyMetricHeader: {
    borderBottomColor: '#DEDEDE',
    backgroundColor: '#FCFCFC',
    zIndex: 800,
    position: 'sticky',
    top: '79.9px'
  },
  stickyMetricNameHeader: {
    borderBottomColor: '#DEDEDE',
    backgroundColor: '#FCFCFC',
    zIndex: 1000,
    position: 'sticky',
    top: '79.9px',
    left: 0
  },
  stickyYearHeader: {
    borderBottomColor: '#DEDEDE',
    backgroundColor: '#FCFCFC',
    zIndex: 800,
    position: 'sticky',
    top: '181px'
  },
  stickyYearNameHeader: {
    borderBottomColor: '#DEDEDE',
    backgroundColor: '#FCFCFC',
    zIndex: 1000,
    position: 'sticky',
    top: '181px',
    left: 0
  },
  stickyCompany: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 700
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

export default function EditPreviewTable ({ head, body, edit, errorObject, isLoading, trackChange }) {
  const classes = useStyles()
  const [isChange, setChange] = useState(false)
  const selectIndex = [2, 3, 4]
  const selectKey = { 2: 'sector', 3: 'vertical', 4: 'inves_profile_name' }

  const getFirstScenarioIndex = () => {
    const record = Object.values(body)[0]
    return Object.keys(record).indexOf('scenarios')
  }

  const onCellChange = (rowIndex, columnIndex, value, field) => {
    body[rowIndex][field] = value
    trackChange(rowIndex, columnIndex, value, field)
    validateTexfield(rowIndex, columnIndex, value)
  }
  const onScenarioChange = (rowIndex, columnIndex, scenarioIndex, value) => {
    body[rowIndex].scenarios[scenarioIndex].value = value
    trackChange(rowIndex, columnIndex, value, '')
    validateTexfield(rowIndex, columnIndex, value)
  }

  const onSelectChange = (rowIndex, columnIndex, value, field) => {
    const selectOption = getSelectValue(columnIndex, value)
    body[rowIndex][selectKey[columnIndex]] = selectOption
    trackChange(rowIndex, columnIndex, value, field)
    validateSelectOptions(rowIndex, columnIndex, value)
    setChange(!isChange)
  }

  const getSelectValue = (columnIndex, value) => {
    return Object.keys(options[columnIndex]).filter(option => options[columnIndex][option] === value.toLowerCase()).pop()
  }

  const assignSelectValue = (rowIndex, columnIndex, value, isValid) => {
    if (isValid) {
      const selectOption = getSelectValue(columnIndex, value)
      body[rowIndex][selectKey[columnIndex]] = selectOption
    }
  }

  const getPattern = (columnIndex) => {
    const firstIndex = getFirstScenarioIndex(Object.values(body)[0])
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
    let validOption = false
    if (value) {
      validOption = Object.values(options[columnIndex]).includes(value.toLowerCase())
    }
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
    const firstIndex = getFirstScenarioIndex(Object.values(body)[0])
    const pattern = getPattern(columnIndex)
    const regex = new RegExp(pattern)
    if ((columnIndex < selectIndex[0] && columnIndex !== 0) || (value !== '' && columnIndex >= firstIndex)) {
      return testRegex(rowIndex, columnIndex, value, regex)
    }
    if (value === '' && columnIndex >= firstIndex) {
      modifyErrorObject(rowIndex, columnIndex, true)
    }
    return true
  }

  const getTextFieldValue = (rowIndex, columnIndex, value) => {
    validateTexfield(rowIndex, columnIndex, value)
    return value
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

  const getScenarioValue = (rowIndex, columnIndex, value) => {
    const isValid = validateTexfield(rowIndex, columnIndex, value)
    return <Box className={classes.defaultRow}>
      <Typography variant='subtitle2' style={{ color: isValid ? '' : 'red' }}>{value}</Typography>
    </Box>
  }

  const selectPreview = (rowIndex, columnIndex, value, field) => {
    const validValue = validateSelectOptions(rowIndex, columnIndex, value)
    return (
      <Select
        value={body[rowIndex][selectKey[columnIndex]].toLowerCase()}
        onChange={(event) => { onSelectChange(rowIndex, columnIndex, event.target.value, field) }}
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

  const getStickyClassName = (index, stickyNameClass, stickyClass) => {
    return index === 1 ? stickyNameClass : stickyClass
  }

  const TableCellContainer = ({ cellKey, condition, rowIndex, columnIndex, item, field }) => {
    return <TableCell key={cellKey} align="center"
      className={`${classes.body} ${getStickyClassName(columnIndex, classes.stickyCompany, classes.body)}`}
    >
      { condition
        ? <Box minWidth={100} padding={0} component='form'>
          {
            selectIndex.includes(columnIndex)
              ? selectPreview(rowIndex, columnIndex, item, field)
              : <TextField
                id="outlined-basic" variant="outlined" defaultValue={getTextFieldValue(rowIndex, columnIndex, item)}
                inputProps={{
                  className: classes.input,
                  margin: 'none',
                  pattern: getPattern(columnIndex)
                }}
                onChange={(event) => {
                  onCellChange(rowIndex, columnIndex, event.target.value, field)
                }}
                required={columnIndex === 1}
              />
          }
        </Box>
        : getValue(rowIndex, columnIndex, item)}
    </TableCell>
  }

  const ScenarioTableCell = ({ cellKey, condition, rowIndex, columnIndex, scenarioIndex, item }) => {
    const value = ['undefined', 'null'].includes(item) ? '' : item
    return <TableCell key={`${cellKey}-cell`} align="center" className={classes.body}>
       { condition
         ? <Box minWidth={100} padding={0} component='form'>
            <TextField
              id="outlined-basic" variant="outlined" defaultValue={getTextFieldValue(rowIndex, columnIndex, value)}
              inputProps={{
                className: classes.input,
                margin: 'none',
                pattern: getPattern(columnIndex)
              }}
              onChange={(event) => {
                onScenarioChange(rowIndex, columnIndex, scenarioIndex, event.target.value)
              }}
            />
        </Box>
         : getScenarioValue(rowIndex, columnIndex, value)}
    </TableCell>
  }
  return (
    <TableContainer component={Paper} style={{ height: '100vh' }}>
      {
        !isLoading &&
        <Table>
        <TableHead>
          {
            head.length > 0 &&
            <TableRow key={'0-scanrios'} >
              {head.slice(0, 1)[0].map((item, index) => (
                item !== 'Sector' && item !== 'Vertical' &&
                  <TableCell
                    key={`${index}-names`}
                    align="center"
                    className={`${classes.primaryHead} ${getStickyClassName(index, classes.stickyHeaderName, classes.primaryHead)}`}
                  >
                    {item}
                  </TableCell>
              )
              )}
            </TableRow>
          }
          {head.slice(1, 2).map((row, index) => {
            return (
              <TableRow key={`${index}-scenario-header`}>
                {row.map((item, columnIndex) => {
                  return columnIndex !== 2 && columnIndex !== 3 &&
                  <TableCell key={columnIndex} align="center" className={`${classes.head} ${getStickyClassName(columnIndex, classes.stickyMetricNameHeader, classes.stickyMetricHeader)}`}>
                    {item}
                  </TableCell>
                }
                )}
              </TableRow>
            )
          })
          }
          {head.slice(2).map((row, index) => {
            return (
              <TableRow key={`${index}-year-header`}>
                {row.map((item, columnIndex) => {
                  return columnIndex !== 2 && columnIndex !== 3 &&
                  <TableCell
                    key={columnIndex}
                    align="center"
                    className={`${classes.head} ${getStickyClassName(columnIndex, classes.stickyYearNameHeader, classes.stickyYearHeader)}`}
                  >
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
              <TableRow key={`${rowIndex + 4}`} className={classes.customCell}>
                {Object.keys(row).map((key, index) => {
                  return key !== 'scenarios' && key !== 'sector' && key !== 'vertical'
                    ? <TableCellContainer
                      cellKey={`${row.id}-${key}`}
                      key={`${row.id}-${key}`}
                      condition={edit && index !== 0}
                      rowIndex={rowIndex}
                      columnIndex={index}
                      item={row[key]}
                      field={key}
                    />
                    : key === 'scenarios'
                      ? Object.values(row[key]).map((scenario, scenarioIndex) => {
                        const position = `${rowIndex}-${scenarioIndex}-scenario`
                        const cellKey = isEmptyObject(scenario) ? position : `${position}-${scenario.metric_id}`
                        return <ScenarioTableCell
                      cellKey={cellKey}
                      key={cellKey}
                      condition={edit}
                      rowIndex={rowIndex}
                      columnIndex={index + scenarioIndex}
                      scenarioIndex={scenarioIndex}
                      item={`${scenario.value}`}
                    />
                      })
                      : null
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      }
    </TableContainer>
  )
}
