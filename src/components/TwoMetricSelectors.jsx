import React from 'react'
import { Box } from '@material-ui/core'
import { MetricSelector } from './MetricSelector'
import { useInvestmentDateReport } from '../hooks/useInvestmentDateReport'

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

export const RandomComponent = () => {
  const {
    // isLoading,
    firstMetric,
    secondMetric,
    // investHeaders,
    // investPeersComparison,
    // investCompanyComparison,
    setFirstMetric,
    setSecondMetric
  } = useInvestmentDateReport({ fromUniverseOverview: true, selectedMetric: 'growth', secondSelectedMetric: 'ebitda_margin' })

  const onChangeMetric = (value, type) => {
    if (type === 'first') {
      setFirstMetric(value)
    } else {
      const nextMetric = firstMetric === secondMetric ? 'None' : value
      setSecondMetric(nextMetric)
    }
  }

  return (
    <Box>
      <TwoMetricSelector
        firstMetric={firstMetric}
        secondMetric={secondMetric}
        onMetricChange={onChangeMetric}
      />
    </Box>
  )
}
