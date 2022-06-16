import React, { useState } from 'react'
import { Box, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableFooter } from '@material-ui/core'
import { ScenarioForm } from './ScenarioForm'
import { Add } from '@material-ui/icons'
import useScenariosTable from '../../../../hooks/useScenariosTable'
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
  const [openAdd, setOpenAdd] = useState(false)
  const [scenario, setScenario] = useState({})
  const [error, setError] = useState(undefined)
  const {
    rowsPerPage,
    isLoading,
    scenarios,
    total,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    addScenario
  } = useScenariosTable()

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

  const validValue = (value) => {
    return !isNaN(value) ? Number(value) : value
  }

  const onChange = (value, type) => {
    setScenario({ ...scenario, [type]: validValue(value) })
  }

  const validScenario = () => {
    const properties = ['scenario', 'metric', 'year', 'value']
    const hasAllKeys = properties.every(item => Object.prototype.hasOwnProperty.call(scenario, item))
    return hasAllKeys
  }

  const onSave = async () => {
    if (validScenario()) {
      const response = await addScenario(scenario)
      if (!response) {
        setError('Something went wrong, the scenario could not be added, please try again')
      } else {
        setScenario({})
        setOpenAdd(false)
        setError(undefined)
      }
    } else {
      setError('Please fill in all the required fields')
    }
  }

  return (
    <Grid>
      <Box>
        {
          openAdd &&
            <Box>
              <ScenarioForm
                scenario = {scenario}
                error={error}
                onChange={onChange}
                onCancel={() => {
                  setOpenAdd(false)
                  setScenario({})
                  setError(undefined)
                }}
                onSave={onSave}
              />
            </Box>
        }
      </Box>
      <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
        {
          !openAdd && !isLoading &&
            <Button
              startIcon={<Add />}
              style={{ textTransform: 'none' }}
              onClick={(_) => setOpenAdd(true)}
              disabled={openAdd}
            >
              Add Scenario
            </Button>
        }
      </Box>
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
            <TableFooter>
              <TableRow>
              <TablePagination
                  colSpan={4}
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              >
              </TablePagination>
              </TableRow>
            </TableFooter>
          </Table>
        }
        {isLoading &&
          <LoadingProgress />
        }
      </Box>
    </Grid>
  )
}
