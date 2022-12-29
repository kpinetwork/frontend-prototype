import React from 'react'
import MaterialTable from '@material-table/core'
import { useEditModify } from '../../../hooks/useEditModify'
import { INVESTOR_PROFILES_OBJECT } from '../../../utils/constants/CompanyDescription'
import { TableHead, TableRow, TableCell, Box, Dialog } from '@material-ui/core'
import LoadingProgress from '../../../components/Progress'
import { getColumnsValues, getModifiedData } from './EditModifyTableHandler'

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
    borderRightWidth: 1,
    fontSize: 14
  },
  primaryHead: {
    fontWeight: 'bold',
    zIndex: 900,
    backgroundColor: '#2f5487',
    color: 'white',
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
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
  }
}))

export default function EditModifyTable () {
  const {
    body,
    head,
    isLoading,
    modifying,
    updateEditData
  } = useEditModify()

  const classes = useStyles()
  const checkValidData = (data) => {
    if (data == null) {
      return []
    } else {
      return data
    }
  }

  const validBody = checkValidData(body)
  const columns = [
    {
      title: 'Unique ID',
      field: 'id',
      editable: 'never',
      filtering: false,
      cellStyle: {
        borderRightStyle: 'solid',
        borderRightColor: '#DEDEDE',
        borderRightWidth: 1
      }
    },
    {
      title: 'Name',
      field: 'name',
      cellStyle: {
        borderRightStyle: 'solid',
        borderRightColor: '#DEDEDE',
        borderRightWidth: 1,
        position: 'sticky',
        left: 0,
        background: 'white',
        textAlign: 'center',
        zIndex: 700
      }
    },
    {
      title: 'Investor profile',
      field: 'inves_profile_name',
      lookup: INVESTOR_PROFILES_OBJECT,
      cellStyle: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
        borderRightStyle: 'solid',
        borderRightColor: '#DEDEDE',
        borderRightWidth: 1
      }
    },
    ...getColumnsValues(validBody)
  ]

  const getStickyClassName = (index, stickyNameClass, stickyClass) => {
    return index === 1 ? stickyNameClass : stickyClass
  }
  return (
    <Box data-testid='edit-modify-table-container'>
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'hidden'
          }
        }}
        open={isLoading || modifying}
        >
        <LoadingProgress/>
      </Dialog>
    {!isLoading && <MaterialTable
    components={{
      Header: () => (
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
      )
    }}
      title=""
      columns={columns}
      data={validBody}
      editable={{
        onBulkUpdate: changes =>
          new Promise((resolve) => {
            const modifiedData = getModifiedData(changes, head)
            updateEditData(modifiedData)
            resolve()
          })
      }}
      options={{
        filtering: true,
        rowStyle: {
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: 14
        },
        filterCellStyle: {
          background: '#F9F9F9',
          borderTopColor: '#DEDEDE',
          borderTopWidth: 21,
          borderTopStyle: 'solid'

        }
      }}
    />}
    </Box>
  )
}
