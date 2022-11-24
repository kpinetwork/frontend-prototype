import React from 'react'
import { Box } from '@material-ui/core'
import { MetricSelector } from './MetricSelector'

export const TwoMetricSelector = ({ firstMetric, secondMetric, onMetricChange }) => {
  return (
    <Box>
        <Box>
            <MetricSelector
                nameOfSelect="First Metric"
                metric={firstMetric}
                onChange={(event) => onMetricChange(event.target.value, 'first')}
                needEmptyValue={false}
                customStyle={{ marginBottom: 20, marginLeft: 10 }}
            />
            <MetricSelector
                nameOfSelect="Second Metric"
                metric={secondMetric}
                onChange={(event) => onMetricChange(event.target.value, 'second')}
                needEmptyValue={true}
            />
        </Box>
    </Box>
  )
}
