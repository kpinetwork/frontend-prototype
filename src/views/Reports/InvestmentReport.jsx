/* eslint-disable array-callback-return */
import React from 'react'
import { Box, TableCell, Table, TableContainer, Paper, TableRow, TableBody, TableHead } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { METRICS, BY_YEAR_METRICS } from '../../utils/constants/Metrics'
import { COMPANY_DESCRIPTION } from '../../utils/constants/CompanyDescription'
import { isEmptyObject } from '../../utils/userFunctions'
import { TwoMetricSelector } from '../../components/TwoMetricSelectors'
import { useInvestmentDateReport } from '../../hooks/useInvestmentDateReport'
import { getFromLocalStorage } from '../../utils/useLocalStorage'
import HeadBodyGrid from '../../components/BodyGrid'

const useStyles = makeStyles(theme => ({
  header: {
    background: 'white'
  },
  stickyHeaderName: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 900,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyHeader: {
    position: 'sticky',
    left: 0,
    background: 'white',
    zIndex: 800,
    backgroundColor: '#2f5487',
    color: 'white'
  },
  stickyCompany: {
    position: 'sticky',
    left: 0,
    background: '#dbdbdb',
    zIndex: 900,
    [theme.breakpoints.down('md')]: {
      top: '80px'
    },
    [theme.breakpoints.up('md')]: {
      top: '57px'
    }
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
    background: '#dbdbdb',
    [theme.breakpoints.down('md')]: {
      top: '80px'
    },
    [theme.breakpoints.up('md')]: {
      top: '57px'
    }
  },
  stickySecondRow: {
    zIndex: 800,
    position: 'sticky',
    background: '#dbdbdb',
    [theme.breakpoints.down('md')]: {
      top: '161px'
    },
    [theme.breakpoints.up('md')]: {
      top: '114px'
    }
  }
}))

export const InvestmentReport = ({ fromUniverseOverview }) => {
  const {
    isLoading,
    firstMetric,
    secondMetric,
    investHeaders,
    investPeersComparison,
    investCompanyComparison,
    setFirstMetric,
    setSecondMetric
  } = useInvestmentDateReport({
    fromUniverseOverview,
    selectedMetric: getFromLocalStorage('firstMetric') || 'growth',
    secondSelectedMetric: getFromLocalStorage('secondMetric') || 'ebitda_margin'
  })
  const classes = useStyles()

  const getColumnValue = (column) => {
    const headers = [...COMPANY_DESCRIPTION, ...METRICS, ...BY_YEAR_METRICS]
    const header = headers.find(item => item.name === column)
    return header?.label || column
  }

  const getHeader = (headers) => {
    const investmentHeader = [...headers]
    return investmentHeader.splice(1)
  }

  const getMetricName = (cell) => {
    const metrics = [...METRICS]
    const metric = metrics.find(item => item.name === cell)
    return metric?.label || cell
  }

  const getMetricValues = (metric) => {
    const values = { ...metric }
    delete values.metric_name

    return Object.values(values).splice(0, 6)
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
  const onFirstMetricSelector = (_event, value) => {
    if (value.name === secondMetric || value.name === firstMetric) {
      setFirstMetric(value.name)
      setSecondMetric('None')
    } else {
      setFirstMetric(value.name)
    }
  }

  const onSecondMetricSelector = (_event, value) => {
    if (value.name === secondMetric || value.name === firstMetric) {
      setFirstMetric(value.name)
      setSecondMetric('None')
    } else {
      setSecondMetric(value.name)
    }
  }

  const getValidPeer = (peer) => {
    const defaultValues = Object.assign(...getHeader(investHeaders).splice(2).map(key => ({ [key]: 'NA' })))
    const validPeer = { ...peer }
    validPeer.metrics.map((metricObject, index) => {
      if (Object.entries(metricObject).length === 0) {
        const updatedMetrics = validPeer.metrics.filter((item) => Object.entries(item).length > 0)
        validPeer.metrics = [...updatedMetrics, { metric_name: index === 0 ? firstMetric : secondMetric, ...defaultValues }]
      }
    })
    return validPeer
  }

  const getTableRowsFromCompany = (peer, isPeerGroup) => {
    if (Object.prototype.hasOwnProperty.call(peer, 'id')) {
      const metricsLength = peer.metrics.length
      const validPeer = getValidPeer(peer)
      const tableRows = [
      <TableRow
        key={`${peer.id}-1`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell
            rowSpan={metricsLength > 1 ? 2 : 1}
            className={!isPeerGroup ? classes.stickyCompany : classes.sticky }
          >{peer.name}</TableCell>
          <TableCell
            className={!isPeerGroup ? classes.stickyFirstRow : ''}
          >{getMetricName(validPeer.metrics[0].metric_name)}</TableCell>
          {getMetricValues(validPeer.metrics[0]).map((value, index) =>
            <TableCell
            key={index}
            className={!isPeerGroup ? classes.stickyFirstRow : ''}
            >{getFormatValue(value, validPeer.metrics[0].metric_name)}</TableCell>
          )}
      </TableRow>
      ]
      if (metricsLength > 1) {
        tableRows.push(
        <TableRow key={`${peer.id}-2`}>
        <TableCell
        className={!isPeerGroup ? classes.stickySecondRow : ''}
        >
          {getMetricName(validPeer.metrics[1].metric_name)}</TableCell>
        {getMetricValues(validPeer.metrics[1]).map((value, index) =>
          <TableCell
          key={index}
          className={!isPeerGroup ? classes.stickySecondRow : ''}
          >{getFormatValue(value || 'NA', validPeer.metrics[1].metric_name)}</TableCell>
        )}
      </TableRow>
        )
      }

      return tableRows
    }
  }

  return (
    <Box>
        <Box>
          <TwoMetricSelector
            firstMetric={firstMetric}
            secondMetric={secondMetric}
            onMFirstetricChange={onFirstMetricSelector}
            onSecondMetricChange={onSecondMetricSelector}
          />
        </Box>
        <Box>
          <Box style={{ height: '50vh', display: 'grid', alignSelf: 'left', justifySelf: 'center' }}>
            {!isLoading
              ? <TableContainer component={Paper} >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {getHeader(investHeaders).map((column, index) => {
                          return (
                            <TableCell
                              key={index}
                              align={'left'}
                              style={{ fontWeight: 'bold' }}
                              className={column === 'name' ? classes.stickyHeaderName : classes.stickyHeader}
                            >
                              {getColumnValue(column)}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                      { !fromUniverseOverview && !isEmptyObject(investCompanyComparison) &&
                        getTableRowsFromCompany(investCompanyComparison, false)
                      }
                    </TableHead>
                    <TableBody>
                      {investPeersComparison.map(peer => (
                        getTableRowsFromCompany(peer, true)
                      )
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
