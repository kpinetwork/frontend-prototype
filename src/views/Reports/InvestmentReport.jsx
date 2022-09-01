/* eslint-disable react/jsx-key */
import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { METRICS, BY_YEAR_METRICS } from '../../utils/constants/Metrics'
import { COMPANY_DESCRIPTION } from '../../utils/constants/CompanyDescription'
import { isEmptyObject } from '../../utils/userFunctions'
import HeadBodyGrid from '../../components/BodyGrid'

const useStyles = makeStyles(theme => ({
  header: {
    background: 'white'
  },
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 900
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800
  },
  stickyCompany: {
    position: 'sticky',
    left: 0,
    background: '#dbdbdb',
    top: '105px',
    zIndex: 900
  },
  sticky: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800
  },
  stickyFirstRow: {
    zIndex: 800,
    position: 'sticky',
    top: '105px',
    background: '#dbdbdb'
  }
}))

const fakeData = {
  headers: ['id', 'name', 'metric name', 'Investment - 2', 'Investment - 1', 'Year of investment', 'Investment + 1', 'Investment + 2', 'Investment + 3'],
  company_comparison_data: {
    id: '221603b7-0263-4c47-83b3-00b41665faaa',
    name: 'Apple',
    metrics: [
      {
        metric_name: 'ebitda_margin',
        2019: 'NA',
        2020: '+$10k',
        2021: 145,
        2022: 'NA',
        2023: 'NA',
        2024: 'NA'
      },
      {
        metric_name: 'rule_of_40',
        2019: 37,
        2020: 34,
        2021: 83,
        2022: 'NA',
        2023: 'NA',
        2024: 'NA'
      }
    ]
  },
  peers_comparison_data: [
    {
      id: '821603b7-0263-4c47-83b3-00b41665faaa',
      name: 'Boxlight Corp',
      metrics: [
        {
          metric_name: 'growth',
          2019: 'NA',
          2020: -8,
          2021: 145,
          2022: 'NA',
          2023: 'NA',
          2024: 'NA'
        },
        {
          metric_name: 'actuals_revenue',
          2019: 37,
          2020: 34,
          2021: 83,
          2022: 'NA',
          2023: 'NA',
          2024: 'NA'
        }
      ]
    },
    {
      id: '121603b7-0263-4c47-83b3-00b41665faaa',
      name: 'Test company',
      metrics: [
        {
          metric_name: 'actuals_customer_acquition_costs',
          2019: 'NA',
          2020: -8,
          2021: 145,
          2022: 'NA',
          2023: 'NA',
          2024: 'NA'
        },
        {
          metric_name: 'actuals_ebitda',
          2019: 37,
          2020: 34,
          2021: 83,
          2022: 'NA',
          2023: 'NA',
          2024: 'NA'
        }
      ]
    }
  ]
}
export const InvestmentReport = () => {
  const classes = useStyles()
  const isLoading = false
  const fromUniverseOverview = false
  const investmentHeader = fakeData.headers.splice(1)
  const investmentCompanyComparison = fakeData.company_comparison_data
  const investmentPeersComparison = fakeData.peers_comparison_data

  const getColumnValue = (column) => {
    const headers = [...COMPANY_DESCRIPTION, ...METRICS, ...BY_YEAR_METRICS]
    const header = headers.find(item => item.name === column)
    return header?.label || column
  }

  const getMetricName = (cell) => {
    const metrics = [...METRICS]
    const metric = metrics.find(item => item.name === cell)
    return metric?.label || cell
  }

  const getMetricValues = (metric) => {
    const { metric_name, ...metricValues } = metric
    return Object.values(metricValues)
  }

  const getFormatValue = (value, name) => {
    if (value == null) {
      return 'NA'
    }
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    const baseMetrics = METRICS.concat(BY_YEAR_METRICS)
    const metric = baseMetrics.find(item => item.name === name)
    return metric?.position === 'left' ? `${metric?.symbol} ${value}` : `${value} ${metric?.symbol}`
  }

  return (
    <Box>
        <Box>
          <Box style={{ height: '50vh', display: 'grid', alignSelf: 'left', justifySelf: 'center' }}>
            {!isLoading
              ? <TableContainer component={Paper} >
                  <Table>
                    <TableHead>
                      <TableRow>
                        {investmentHeader.map((column, index) => {
                          return (
                            <TableCell key={index} align={'left'} style={{ fontWeight: 'bold' }}
                              // className={column === 'name' ? classes.stickyHeaderName : classes.stickyHeader}
                            >
                              {getColumnValue(column)}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                        { !fromUniverseOverview && !isEmptyObject(investmentCompanyComparison) &&
                          <>
                          <TableRow
                            key={`${investmentCompanyComparison?.id}-1`}
                            style={{ backgroundColor: '#cececeb9' }}
                          >
                            <TableCell key={`${investmentCompanyComparison?.id}-1-id`} rowSpan={2}>{investmentCompanyComparison.name}</TableCell>
                            <TableCell key={`${investmentCompanyComparison?.id}-1-metric`} >{getMetricName(investmentCompanyComparison.metrics[0].metric_name)}</TableCell>
                            {getMetricValues(investmentCompanyComparison.metrics[0]).map((value, index) =>
                              <TableCell key={`${investmentCompanyComparison?.id}-${index}`}>{getFormatValue(value, investmentCompanyComparison.metrics[0].metric_name)}</TableCell>
                            )}
                          </TableRow>
                          <TableRow
                            key={`${investmentCompanyComparison?.id}-2`}
                            style={{ backgroundColor: '#cececeb9' }}
                          >
                            <TableCell key={'metric'}>{getMetricName(investmentCompanyComparison.metrics[1].metric_name)}</TableCell>
                            {getMetricValues(investmentCompanyComparison.metrics[1]).map((value, index) =>
                              <TableCell key={index}>{getFormatValue(value, investmentCompanyComparison.metrics[0].metric_name)}</TableCell>
                            )}
                          </TableRow></>
                        }
                    </TableHead>
                    <TableBody>
                      {investmentPeersComparison.map((peer) => {
                        console.log(peer)
                        return (
                          <>
                          <TableRow
                          key={`${peer.id}-1`}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell key={`${peer.id}-id-1`} rowSpan={2}>{peer.name}</TableCell>
                            <TableCell key={`${peer.id}-metric-1`}>{getMetricName(peer.metrics[0].metric_name)}</TableCell>
                            {getMetricValues(peer.metrics[0]).map((value, index) =>
                              <TableCell key={`${index}-${peer.id}-1`}>{getFormatValue(value, peer.metrics[0].metric_name)}</TableCell>
                            )}
                          </TableRow>
                          <TableRow key={`${peer.id}-2`}>
                              <TableCell key={`${peer.id}-metric-2`} >{getMetricName(peer.metrics[1].metric_name)}</TableCell>
                            {getMetricValues(peer.metrics[1]).map((value, index) =>
                              <TableCell key={`${index}-${peer.id}-2`}>{getFormatValue(value, peer.metrics[1].metric_name)}</TableCell>
                            )}
                            </TableRow></>
                        )
                      }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              : <HeadBodyGrid/>}
          </Box>
        </Box>
    </Box>
  )
}
