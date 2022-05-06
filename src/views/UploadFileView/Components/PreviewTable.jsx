import React, { useState } from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper, TextField, Box, Select, MenuItem } from '@material-ui/core'
import { Vertical, Sector, InvestorProfile } from './../../../utils/constants/CompanyDescription'
import { makeStyles } from '@material-ui/core/styles'

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
  }
}))

const options = {
  2: Object.values(Sector),
  3: Object.values(Vertical),
  4: Object.values(InvestorProfile)
}

export default function PreviewTable ({ head, body, edit }) {
  const classes = useStyles()
  const [isChange, setChange] = useState(false)
  const selectIndex = [2, 3, 4]

  const onCellChange = (rowIndex, columnIndex, value) => {
    body[rowIndex][columnIndex] = value
  }

  const onSelectChange = (rowIndex, columnIndex, value) => {
    body[rowIndex][columnIndex] = value
    setChange(!isChange)
  }

  const selectPreview = (rowIndex, columnIndex, value) => {
    return (
      <Select
        value={body[rowIndex][columnIndex]}
        defaultValue={value}
        onChange={(event) => { onSelectChange(rowIndex, columnIndex, event.target.value) }}
        style={{ margin: 'none', fontSize: 12, border: '1px solid #ced4da', width: '100%' }}
      >
        {
          options[columnIndex].map((option) => {
            return <MenuItem key={`${option}`} value={option}>{option}</MenuItem>
          })
        }
      </Select>
    )
  }

  return (
    <TableContainer component={Paper}>
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
              <TableRow key={rowIndex} className={edit ? classes.customCell : ''}>
                {row.map((item, index) => {
                  return <TableCell key={index} align="center" className={classes.body}>
                    {edit && index !== 0
                      ? <Box minWidth={100} padding={0}>
                        {
                          selectIndex.includes(index)
                            ? selectPreview(rowIndex, index, item)
                            : <TextField
                              id="outlined-basic" variant="outlined" defaultValue={item.toString()}
                              inputProps={{ style: { fontSize: 12, padding: '10px 5px', textAlign: 'center' }, margin: 'none' }}
                              onChange={(event) => {
                                onCellChange(rowIndex, index, event.target.value)
                              }}
                            />
                        }
                      </Box>
                      : item}
                  </TableCell>
                }
                )}
              </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
