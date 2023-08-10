import React from 'react'
import { Box } from '@material-ui/core'
import { MetricSelector } from './MetricSelector'

export const TwoMetricSelector = ({ firstMetric, secondMetric, onFirstMetricChange, onSecondMetricChange }) => {
  return (
    <Box>
        <Box>
            <MetricSelector
                nameOfSelect="First Metric"
                metric={firstMetric}
                onChange={onFirstMetricChange}
                needEmptyValue={false}
                customStyle={{ marginBottom: 20, marginLeft: 10 }}
            />
            <MetricSelector
                nameOfSelect="Second Metric"
                metric={secondMetric}
                onChange={onSecondMetricChange}
                needEmptyValue={true}
            />
        </Box>
    </Box>
  )
}
