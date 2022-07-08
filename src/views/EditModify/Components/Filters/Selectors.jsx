import React, { useState, useEffect } from 'react'
import { Select, makeStyles, Box, Grid, FormControl, InputLabel, MenuItem, Typography, Button } from '@material-ui/core'
import { SECTORS, VERTICALS, INVESTOR_PROFILES } from '../../../../utils/constants/CompanyDescription'
import { BASE_SCENARIOS } from '../../../../utils/constants/Metrics'
import { Autocomplete, Stack, TextField } from '@mui/material'
import { FilterAlt, RestartAlt } from '@mui/icons-material'

const useStyles = makeStyles({
  select: {
    '&:before': {
      borderColor: '#008b9a'
    },
    '&:after': {
      borderColor: '#008b9a'
    }
  },
  autoComplete: {
    borderColor: 'red',
    '& .MuiAutocomplete-inputRoot': {
      flexWrap: 'nowrap !important',
      '&:before': {
        borderColor: '#008b9a'
      },
      '&:after': {
        borderColor: '#008b9a'
      }
    }
  },
  rowButton: {
    display: 'flex',
    paddingTop: 10,
    flexDirection: 'row-reverse'
  }
})

const SelectOptions = ({ tmpFilters, classes, onChange, field, label, names }) => {
  return (
    <Box style={{ marginLeft: 10 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          value={tmpFilters[field]}
          label={field}
          multiple
          onChange={(event) => onChange(event?.target?.value, field)}
          className={classes.select}
          style={{ width: 250 }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
        >
          {names.map((sector, index) => (
              <MenuItem key={`${index}-${field}`} value={sector}>{sector}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export const FilterSelectors = ({ companies, filters, setFilters }) => {
  const classes = useStyles()
  const [tmpFilters, setTmpFilters] = useState({
    names: [],
    scenarios: [],
    sectors: [],
    verticals: [],
    investor_profiles: []
  })

  useEffect(() => {
    setTmpFilters(JSON.parse(JSON.stringify(filters)))
  }, [])

  const copyObject = (object) => {
    return JSON.parse(JSON.stringify(object))
  }

  const emptyFilters = () => {
    return {
      names: [],
      scenarios: [],
      sectors: [],
      verticals: [],
      investor_profiles: []
    }
  }

  const onChange = (value, type) => {
    setTmpFilters({ ...filters, [type]: value })
  }

  const onNamesChange = (_event, companiesSelector) => {
    const validCompanies = companiesSelector.filter((company) => companies.includes(company))
    setTmpFilters({ ...filters, names: validCompanies })
  }

  const onReset = () => {
    const values = emptyFilters()
    setTmpFilters(copyObject(values))
    const isEmpty = Object.values(filters).filter((filterField) => filterField.length > 0).length === 0
    if (!isEmpty) {
      setFilters(copyObject(values))
    }
  }

  const onApply = () => {
    setFilters(copyObject(tmpFilters))
  }

  return (
    <Box
      sx={{ padding: 20, marginBottom: 30, backgroundColor: '#f3f4f8', borderRadius: '16px' }}
      data-testid='filters-edit-modify'
    >
      <Box sx ={{ marginLeft: 10, marginBottom: 10 }}>
        <Typography style={{ color: 'grey' }}>Choose your filters</Typography>
      </Box>
      <Box sx ={{ backgroundColor: 'white', borderRadius: '16px', paddingBottom: 25, paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}>
        <Grid container>
          <Grid item md={4} lg={4} xl={4}>
            <Box style={{ marginLeft: 10 }}>
              <Stack style={{ width: 250 }}>
                  <Autocomplete
                    style={{ width: '100%' }}
                    openOnFocus
                    freeSolo
                    multiple
                    value={tmpFilters?.names}
                    options={companies}
                    onChange={onNamesChange}
                    className={classes.autoComplete}
                    limitTags={1}
                    renderInput={(params) => (
                      <TextField
                      { ...params }
                      label='Name'
                      size='small'
                      variant='standard'
                      style = {{ padding: 0, flexWrap: 'wrap' }}
                      />
                    )}
                    renderTags={(values) => {
                      return <Typography
                      variant='body1'
                        style ={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: 200
                        }}
                      >
                        {values.join(', ')}
                      </Typography>
                    }}
                  />
              </Stack>
            </Box>
          </Grid>
          <Grid item md={4} lg={4}>
            <SelectOptions
              tmpFilters={tmpFilters}
              label={'Sector'}
              field={'sectors'}
              names={SECTORS}
              onChange={onChange}
              classes={classes}
            />
          </Grid>
          <Grid item lg={4} md={4}>
          <SelectOptions
              tmpFilters={tmpFilters}
              label={'Vertical'}
              field={'verticals'}
              names={VERTICALS}
              onChange={onChange}
              classes={classes}
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <SelectOptions
              tmpFilters={tmpFilters}
              label={'Investor Profile'}
              field={'investor_profiles'}
              names={INVESTOR_PROFILES}
              onChange={onChange}
              classes={classes}
            />
          </Grid>
          <Grid item lg={4} md={4}>
            <SelectOptions
              tmpFilters={tmpFilters}
              label={'Scenario'}
              field={'scenarios'}
              names={BASE_SCENARIOS}
              onChange={onChange}
              classes={classes}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.rowButton}>
        <Button
          variant='text'
          style={{ textTransform: 'none', fontSize: 15, marginLeft: 10 }}
          startIcon={<RestartAlt style={{ color: '#364b8a' }} />}
          onClick={onReset}
        >
          Reset filters
        </Button>
        <Button
          variant='text'
          style={{ textTransform: 'none', fontSize: 15 }}
          startIcon={<FilterAlt style={{ color: '#364b8a' }} />}
          onClick={onApply}
        >
          Apply filters
        </Button>
      </Box>
    </Box>
  )
}
