import React from 'react'
import { makeStyles, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Typography } from '@material-ui/core'
import ButtonActions from '../../../components/Actions'

const useStyles = makeStyles({
  cancelButton: {
    backgroundColor: '#364b8a',
    color: 'white',
    marginRight: 10,
    width: 100
  },
  border: {
    borderBottom: '1px solid lightgray',
    marginTop: 2,
    marginBottom: 10
  }
})

export default function PreviewModal ({ open, onClose, onOk, onCancel, validData, data }) {
  const classes = useStyles()

  const getListFromValues = (data, title, text) => {
    if (data == null || Object.keys(data).length === 0) {
      return <></>
    }
    return (
      <Box sx={{ marginBottom: 20 }}>
        <Typography variant='body1'>{title}</Typography>
        <Divider className={classes.border} />
        <Typography variant="subtitle2" >{text}</Typography>
        <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
          {Object.keys(data).map((elem) => (
            <Typography key={elem} variant="body2">
              {`${elem}: ${data[elem]} times`}
            </Typography>
          ))}
        </Box>
      </Box>
    )
  }

  const getRepeatedNames = () => {
    const names = data.repeated_names || {}
    const text = 'There are repeated company names in your file, the companies are:'
    return getListFromValues(names, 'Repeated names', text)
  }

  const getRepeatedIds = () => {
    const ids = data.repeated_ids || {}
    const text = 'There are repeated ids in your file, the id must be unique for each company, the ids are:'
    return getListFromValues(ids, 'Repeated ids', text)
  }

  const getExistingNames = () => {
    const names = data.existing_names || []
    if (names.length === 0) {
      return <></>
    }
    const text = 'The following companies already exist on KPI, please change with a valid name'
    return (
      <Box sx={{ marginBottom: 20 }}>
        <Typography variant='body1'>Existing company names</Typography>
        <Divider className={classes.border} />
        <Typography variant="subtitle2" >{text}</Typography>
        <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
          {names.map((name) => (
            <Typography key={`existing-${name}`} variant="body2">
              {name}
            </Typography>
          ))}
        </Box>
      </Box>
    )
  }
  const getRepeatedScenarios = () => {
    if (data.validated_companies == null || data.validated_companies.length === 0) {
      return <></>
    }
    const scenarios = getScenarioDetails(data.validated_companies || [])
    const text = 'We detect existing financial information about the following companies, if you send them we will overwrite metric values.'
    return (
      <Box sx={{ marginBottom: 20 }}>
        <Typography variant='body1'>Existing scenarios</Typography>
        <Divider className={classes.border} />
        <Typography variant="subtitle2" >{text}</Typography>
        <Box sx={{ borderRadius: '16px', backgroundColor: 'white', py: 2, px: 2, marginTop: 5 }}>
          {scenarios.map((scenario) => (
            <Box key={`scenarios-${scenario.name}`}>
              <Typography variant="body2">
                {scenario.name}
              </Typography>
              <Box sx={{ px: 5, pb: 2 }}>
                {scenario.scenarios.map((metric) => (
                  <Typography key={`existing-metric-${metric}`} variant="subtitle2">
                    {metric}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  const getScenarioDetails = (companies) => {
    const data = companies.map((company) => {
      const keys = Object.keys(company.scenarios)
      const repeatedScenarios = []
      for (const scenario of keys) {
        const metrics = Object.keys(company.scenarios[scenario]).filter((metric) => company.scenarios[scenario][metric])
        if (metrics && metrics.length > 0) {
          const metricText = metrics.join(', ')
          repeatedScenarios.push(`${scenario}: ${metricText}`)
        }
      }
      return { name: company.companies_name, scenarios: repeatedScenarios }
    })
    return data
  }

  return (
    <Dialog open={open} onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#f3f4f8',
          boxShadow: 'none'
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ paddingLeft: 10, paddingTop: 10 }}>
          <Typography variant='h5' style={{ fontWeight: 600 }}>{validData ? 'VALID DATA' : 'NO VALID DATA'}</Typography>

        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: 500 }} p={2}>
          {!validData &&
            <Box>
              <Box sx={{ marginBottom: 20 }}>
                <Typography>The data from csv file is invalid, please read the following information for more details:</Typography>
              </Box>
              {getRepeatedNames()}
              {getRepeatedIds()}
              {getExistingNames()}
            </Box>
          }
          {validData &&
            <Box sx={{ marginBottom: 20 }}>
              <Typography>There is not existing or repeated companies descriptive information in your file.</Typography>
            </Box>
          }
          {getRepeatedScenarios()}
        </Box>
      </DialogContent>
      <DialogActions sx={{ py: 10 }}>
        {validData &&
          <ButtonActions
            okName={'Upload file'}
            cancelName={'Edit data'}
            onOk={onOk}
            onCancel={onCancel}
          />
        }
        {!validData &&
          <Button className={classes.cancelButton} onClick={onCancel}>Close</Button>
        }
      </DialogActions>
    </Dialog>
  )
}
