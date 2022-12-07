import React, { useState } from 'react'
import { Box, Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableFooter, TableSortLabel, Checkbox } from '@material-ui/core'
import { ScenarioForm } from './ScenarioForm'
import { ScenariosModal } from './ScenariosModal'
import { Add, DeleteOutlined } from '@material-ui/icons'
import useScenariosTable from '../../../../hooks/useScenariosTable'
import LoadingProgress from '../../../../components/Progress'
import ButtonActions from '../../../../components/Actions'
import { makeStyles } from '@material-ui/core/styles'
import { BASEMETRICS } from '../../../../utils/constants/Metrics'
import BasicSnackBar from '../../../../components/Alert/BasicSnackBar.jsx'

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
  },
  icon: {
    color: '#3f51b5',
    fill: '#3f51b5',
    '&:hover': {
      color: 'white',
      fill: 'white'
    }
  }
}))

export function ScenariosTab () {
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [scenario, setScenario] = useState({})
  const [error, setError] = useState(undefined)
  const [selectedScenarios, setSelectedScenarios] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [severity, setSeverity] = useState(undefined)
  const {
    rowsPerPage,
    metricNames,
    isLoading,
    scenarios,
    company,
    total,
    page,
    orderDirection,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortScenarios,
    addScenario,
    deleteScenarios
  } = useScenariosTable()

  const isSelected = (metricId) => (selectedScenarios.map(scenario => scenario.metric_id).indexOf(metricId) !== -1)

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
      const response = await addScenario(scenario, 100, 0)
      if (response.error) {
        setError(response.error)
        setShowMessage(true)
        setSeverity('error')
      } else {
        setScenario({})
        setOpenAdd(false)
        setError('Scenario added successfully')
        setShowMessage(true)
        setSeverity('success')
      }
    } else {
      setError('Please fill in all the required fields')
      setShowMessage(true)
      setSeverity('error')
    }
  }

  const onDeleteModal = async () => {
    setOpenModal(false)
    const response = await deleteScenarios(selectedScenarios, 100, 0)
    if (response['scenarios deleted']) {
      setError('Scenarios deleted: ' + response['scenarios deleted'])
      setShowMessage(true)
      setSeverity('success')
    }
    setSelectedScenarios([])
    setOpenDelete(false)
  }

  const handleClick = (metricScenario) => {
    const selectedIndex = selectedScenarios.map(scenario => scenario.metric_id).indexOf(metricScenario.metric_id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedScenarios, metricScenario)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedScenarios.slice(1))
    } else if (selectedIndex === selectedScenarios.length - 1) {
      newSelected = newSelected.concat(selectedScenarios.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedScenarios.slice(0, selectedIndex),
        selectedScenarios.slice(selectedIndex + 1)
      )
    }

    setSelectedScenarios(newSelected)
  }

  return (
    <Grid>
      <Box>
        <BasicSnackBar
        open={showMessage}
        onClose={() => {
          setError(undefined)
          setShowMessage(false)
          setSeverity(undefined)
        }}
        severity={severity}
        message={error}
        />
        {
          openAdd &&
            <Box>
              <ScenarioForm
                scenario = {scenario}
                metrics={metricNames}
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
              startIcon={<DeleteOutlined style={{ color: '#364b8a' }}/>}
              style={{ textTransform: 'none' }}
              onClick={(_) => setOpenDelete(true)}
              disabled={openDelete}
            >
              Delete scenarios
            </Button>
        }
        {
          !openAdd && !openDelete && !isLoading &&
            <Button
              startIcon={<Add style={{ color: '#364b8a' }}/>}
              style={{ textTransform: 'none' }}
              onClick={(_) => setOpenAdd(true)}
              disabled={openAdd}
            >
              Add scenario
            </Button>
        }
        { openDelete &&
          <Box sx={{ margin: 10 }}>
            <ButtonActions
            onOk={() => {
              setOpenModal(true)
            }}
            onCancel={() => {
              setOpenDelete(false)
              setSelectedScenarios([])
            }}
            okName="Delete"
            cancelName="Cancel"
            />
          </Box>
      }
      </Box>
      { openModal &&
        <ScenariosModal
          open={openModal}
          onOk={() => onDeleteModal()}
          onCancel={() => setOpenModal(false)}
          scenarios={selectedScenarios}
          company={company}
        />
      }
      <Box>
        {
          !isLoading &&
          <Table className={classes.root}>
            <TableHead>
              <TableRow className={classes.head}>
                { openDelete &&
                  <TableCell className={classes.head}></TableCell>
                }
                <TableCell className={classes.head}>Scenario
                  <TableSortLabel
                      classes={{ icon: classes.icon }}
                      active={true}
                      direction={orderDirection}
                      onClick={handleSortScenarios}
                  />
                </TableCell>
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
                              onChange={(_) => handleClick(scenario)}
                              inputProps={{
                                'aria-label': scenario.metric_id
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
                  colSpan={openDelete ? 5 : 4}
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
