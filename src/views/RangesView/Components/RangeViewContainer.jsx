import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import useMetricRanges from '../../../hooks/useMetricRanges'
import { MetricRangesTable } from './MetricRangesTable'
import { MetricRangeForm } from './MetricRangeForm'

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
  const [openModify, setOpenModify] = useState(false)
  return (
        <Box>
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
  )
}
