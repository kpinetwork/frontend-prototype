import React from 'react'
import { Box, Grid, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableFooter } from '@material-ui/core'
import useCompanyDetails from '../../../../hooks/useCompanyDetails'
import LoadingProgress from '../../../../components/Progress'
import { makeStyles } from '@material-ui/core/styles'
import { BASEMETRICS } from '../../../../utils/constants/Metrics'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  head: {
    '&.MuiTableRow-head': {
      backgroundColor: '#2f5487'
    },
    '&.MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold'
    }
  },
  roleName: {
    marginRight: 10,
    textTransform: 'capitalize'
  }
}))

export function ScenariosTab () {
  const classes = useStyles()
  const { scenarios, totalScenarios, isLoading } = useCompanyDetails()

  const getValue = (name, value) => {
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    const metric = BASEMETRICS.find(item => item.name === name)
    if (metric) {
      return metric.position === 'left' ? `${metric.symbol} ${value}` : `${value} ${metric.symbol}`
    }
    return value
  }

  return (
    <Grid>
      <Box>
        {
          !isLoading &&
          <Table className={classes.root}>
            <TableHead>
              <TableRow className={classes.head}>
                <TableCell className={classes.head}>Scenario</TableCell>
                <TableCell className={classes.head}>Metric</TableCell>
                <TableCell className={classes.head}>Year</TableCell>
                <TableCell className={classes.head}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { scenarios && scenarios.length > 0 &&
                scenarios.map((scenario) => {
                  return (
                    <TableRow key={scenario.metric_id}>
                      <TableCell>{scenario.scenario}</TableCell>
                      <TableCell>{scenario.metric || 'NA'}</TableCell>
                      <TableCell>{scenario.year || 'NA'}</TableCell>
                      <TableCell>{getValue(scenario.metric, scenario.value) || 'NA'}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        }
        {isLoading &&
          <LoadingProgress />
        }
      </Box>
    </Grid>
  )
}
