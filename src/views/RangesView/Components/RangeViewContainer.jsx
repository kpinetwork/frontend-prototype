import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import useMetricRanges from '../../../hooks/useMetricRanges'
import { MetricRangesTable } from './MetricRangesTable'
import { MetricRangeForm } from './MetricRangeForm'
import { TOTALMETRICS } from '../../../utils/constants/Metrics'
import BasicSnackBar from '../../../components/Alert/BasicSnackBar'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '130vh'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      mimWidth: '55vh'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}))

export const RangeViewContainer = () => {
  const {
    page,
    total,
    metrics,
    pageSize,
    isLoading,
    isRangesLoading,
    allMetricRanges,
    metricRanges,
    metricSelected,
    rangesToDelete,
    setRangesToDelete,
    setMetricRanges,
    handleChangePage,
    setMetricSelected,
    handleChangePageSize,
    getRangesBySpecificMetric,
    modifyRanges,
    editedRanges,
    setEditedRanges,
    setIsLoading
  } = useMetricRanges()
  const classes = useStyles()
  const [openModify, setOpenModify] = useState(false)
  const [errors, setErrors] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [severity, setSeverity] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(null)
  const getMetricStandardName = (name) => {
    const metric = TOTALMETRICS.find(item => item.name === name)
    return metric.tableName
  }

  const handleSaveRanges = async () => {
    const response = await modifyRanges(getMetricStandardName(metricSelected))
    if (response.error) {
      setErrorMessage(response.error)
      setShowMessage(true)
      setSeverity('error')
      setIsLoading(false)
      setOpenModify(false)
    } else {
      setErrorMessage('Ranges modified successfully')
      setShowMessage(true)
      setSeverity('success')
      setOpenModify(false)
      setMetricSelected(null)
      getDefaultValue()
    }
  }

  const getDefaultValue = () => {
    setErrors([])
    setMetricRanges([])
    setRangesToDelete([])
    setEditedRanges([])
  }

  return (
       <Box display="flex" justifyContent="center" alignItems="center">
        <Box className={classes.root}>
          <BasicSnackBar
            open={showMessage}
            onClose={() => {
              setShowMessage(false)
              setErrorMessage(undefined)
            }}
            severity={severity}
            message={errorMessage}
          />
          <Box>
            {
              openModify &&
              <MetricRangeForm
              onCancel={() => {
                setOpenModify(false)
                setMetricSelected(null)
                getDefaultValue()
              }}
              onChange={(metric) => {
                setMetricSelected(metric)
                getRangesBySpecificMetric(getMetricStandardName(metric))
                getDefaultValue()
              }}
              onSave={() => {
                handleSaveRanges()
              }}
              metrics={metrics}
              metric={metricSelected}
              ranges={metricRanges}
              setRanges={setMetricRanges}
              isLoading={isRangesLoading}
              rangesToDelete={rangesToDelete}
              setRangesToDelete={setRangesToDelete}
              editedRanges={editedRanges}
              setEditedRanges={setEditedRanges}
              errors={errors}
              setErrors={setErrors}
              />
            }
          </Box>
          {
            !openModify && !isLoading &&
            <Box sx={{ flexDirection: 'row-reverse', display: 'flex' }}>
              <Button
                startIcon={< Edit style={{ color: '#364b8a' }}/>}
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
            ranges={allMetricRanges}
            isLoading={isLoading}
            rowsPerPage={pageSize}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangePageSize}
          />
        </Box>
      </Box>
  )
}
