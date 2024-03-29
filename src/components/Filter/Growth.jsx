import React, { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import CustomTooltipTitle from '../CustomTooltip'
import { tooltipTitles } from '../../utils/tooltipTitles'

const optionLabels = [
  'Negative (<0%)',
  'Low (0-<10%)',
  'Medium (10%-<30%)',
  'High (30%-<50%)',
  'Hyper (50%+)'
]

const options = [
  'Negative growth (<0%)',
  'Low growth (0-<10%)',
  'Medium growth (10%-<30%)',
  'High growth (30%-<50%)',
  'Hyper growth (50%+)'
]
export function Growth ({ setFilters, fillFilters, selectedList }) {
  const [selected, setSelected] = useState(() => {
    if (selectedList !== '') {
      return selectedList.split(',')
    }
    return []
  })

  useEffect(() => {
    if (selectedList !== '') {
      setSelected(selectedList.split(','))
    }
  }, [selectedList])

  const isAllSelected = options.length > 0 && selected.length === options.length

  const handleChange = (event) => {
    const value = event.target.value
    if (value === 'all') {
      const all = selected.length === options.length ? [] : options
      setFilters((prev) => ({ ...prev, growth_profile: all.toString() }))
      setSelected(all)
      return
    }
    const list = [...selected]
    const index = list.indexOf(value)
    index === -1 ? list.push(value) : list.splice(index, 1)
    setFilters((prev) => ({ ...prev, growth_profile: list.toString() }))
    setSelected(list)
  }

  return (
    <FormGroup>
      <CustomTooltipTitle
        name={'Growth Profile'}
        title={tooltipTitles.size_cohort}
        justifyContent='start'
        nameStyle={{ marginRight: 10 }}
        variant='body1'
      />
     <FormControlLabel
        control={
          <Checkbox
            color='default'
            checked={fillFilters}
            disabled={true}
            />}
        label="All"
      />
     <FormControlLabel
        control={
          <Checkbox
            color='default'
            checked={isAllSelected}
            indeterminate={selected.length > 0 && selected.length < options.length}
            value="all"
            onChange={handleChange}
            />}
        label="Select All"
      />
      {options.map((option, index) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              color='default'
              checked={selected.indexOf(option) > -1}
              value={option}
              onChange={handleChange}
            />}
          label={optionLabels[index]}
        />
      ))}
    </FormGroup>
  )
}
