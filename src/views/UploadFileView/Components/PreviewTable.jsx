import React from 'react'
import { Table, TableRow, TableBody, TableCell, TableContainer, TableHead, Paper } from '@material-ui/core'
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
      borderRightWidth: 1
    }
  }
}))

export default function PreviewTable ({ head, body }) {
  const classes = useStyles()
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
                {row.map((item, index) => (
                  <TableCell key={index} align="center" className={classes.head}>
                    {item}
                  </TableCell>
                )
                )}
              </TableRow>
            )
          })
          }
      </TableHead>
        <TableBody>
        {body.map((row, index) => {
          return (
            <TableRow key={index}>
              {row.map((item, index) => (
              <TableCell key={index} align="center" className={classes.body}>
                {item}
              </TableCell>
              )
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
