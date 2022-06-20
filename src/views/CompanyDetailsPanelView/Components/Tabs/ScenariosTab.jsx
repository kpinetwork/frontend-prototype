import React, { useState } from 'react'
import { Box, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableFooter, Checkbox } from '@material-ui/core'
import { ScenarioForm } from './ScenarioForm'
import { Add, DeleteOutlined } from '@material-ui/icons'
import useScenariosTable from '../../../../hooks/useScenariosTable'
import LoadingProgress from '../../../../components/Progress'
import ButtonActions from '../../../../components/Actions'
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
  row: {
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: '#DDE7FF'
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
  const [openDelete, setOpenDelete] = useState(false)
  const [scenario, setScenario] = useState({})
  const [error, setError] = useState(undefined)
  const [selected, setSelected] = useState([])

  console.log(selected)
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

  const isSelected = (name) => (selected.indexOf(name) !== -1)

  const getValue = (name, value) => {
    if (value === 'NA' || isNaN(value)) {
      return value
    }
    const metric = BASEMETRICS.find(item => item.name === name)
    if (metric) {
      return `${metric.symbol} ${value}`
    }
    return value
  }

  const validateScenario = () => {
    scenario.value = Number(scenario.value)
  }

  const onChange = (value, type) => {
    setScenario({ ...scenario, [type]: value })
  }

  const validScenario = () => {
    const properties = ['scenario', 'metric', 'year', 'value']
    const hasAllKeys = properties.every(item => Object.prototype.hasOwnProperty.call(scenario, item))
    return hasAllKeys
  }

  const onSave = async () => {
    if (validScenario()) {
      validateScenario()
      const response = await addScenario(scenario, rowsPerPage, page * rowsPerPage)
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
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
          !openDelete && !openAdd && !isLoading &&
            <Button
              startIcon={<DeleteOutlined />}
              style={{ textTransform: 'none' }}
              onClick={(_) => setOpenDelete(true)}
              disabled={openDelete}
            >
              Delete Scenarios
            </Button>
        }
        {
          !openAdd && !openDelete && !isLoading &&
            <Button
              startIcon={<Add />}
              style={{ textTransform: 'none' }}
              onClick={(_) => setOpenAdd(true)}
              disabled={openAdd}
            >
              Add Scenario
            </Button>
        }
        { openDelete &&
          <Box sx={{ margin: 10 }}>
            <ButtonActions
            onOk={() => { console.log('delete') }}
            onCancel={() => {
              setOpenDelete(false)
              setSelected([])
            }}
            okName="Delete"
            cancelName="Cancel"
            />
          </Box>
      }
      </Box>
      <Box>
        {
          !isLoading &&
          <Table className={classes.root}>
            <TableHead>
              <TableRow className={classes.head}>
                { openDelete &&
                  <TableCell className={classes.head}></TableCell>
                }
                <TableCell className={classes.head}>Scenario</TableCell>
                <TableCell className={classes.head}>Metric</TableCell>
                <TableCell className={classes.head}>Year</TableCell>
                <TableCell className={classes.head}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { scenarios && scenarios.length > 0 &&
                scenarios.map((scenario) => {
                  const isItemSelected = isSelected(scenario.metric_id)
                  return (
                    <TableRow
                    key={scenario.metric_id}
                    selected={isItemSelected}
                    tabIndex={-1}
                    className={classes.row}>
                        {
                          openDelete &&
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              // indeterminate={numSelected > 0 && numSelected < rowCount}
                              onChange={(event) => handleClick(event, scenario.metric_id)}
                              inputProps={{
                                'aria-label': 'select all desserts'
                              }}
                          />
                          </TableCell>
                        }
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
