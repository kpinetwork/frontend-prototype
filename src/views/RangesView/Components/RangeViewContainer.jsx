import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import useMetricRanges from '../../../hooks/useMetricRanges'
import { MetricRangesTable } from './MetricRangesTable'
import { MetricRangeForm } from './MetricRangeForm'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '130vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}))

export const RangeViewContainer = () => {
  const {
    page,
    total,
    metrics,
    pageSize,
    isLoading,
    metricRanges,
    metricSelected,
    handleChangePage,
    setMetricSelected,
    handleChangePageSize
  } = useMetricRanges()
  const classes = useStyles()
  const [openModify, setOpenModify] = useState(false)
  return (
       <Box display="flex" justifyContent="center" alignItems="center">
        <Box className={classes.root}>
          <Box>
            {
              openModify &&
              <MetricRangeForm
              onCancel={() => {
                setOpenModify(false)
                setMetricSelected(null)
              }}
              onChange={(metric) => {
                setMetricSelected(metric)
              }}
              onSave={() => {}}
              metrics={metrics}
              metric={metricSelected}
              />
            }
          </Box>
          {
            !openModify && !isLoading &&
            <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
              <Button
                startIcon={< Edit/>}
                style={{ textTransform: 'none' }}
                onClick={(_) => setOpenModify(true)}
              >
                Modify
              </Button>
            </Box>
          }
          <MetricRangesTable
            page={page}
            total={total}
            ranges={metricRanges}
            isLoading={isLoading}
            rowsPerPage={pageSize}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangePageSize}
          />
        </Box>
      </Box>
  )
}
