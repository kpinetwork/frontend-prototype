import React, { useState, useEffect } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import CustomTooltipTitle from '../CustomTooltip'
import { tooltipTitles } from '../../utils/tooltipTitles'

export function Size ({ setFilters, fillFilters, selectedList, rangesOptions }) {
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

  const isAllSelected = rangesOptions.length > 0 && selected.length === rangesOptions.length

  const handleChange = (event) => {
    const value = event.target.value
    if (value === 'all') {
      const all = selected.length === rangesOptions.length ? [] : rangesOptions
      setFilters((prev) => ({ ...prev, size: all.toString() }))
      setSelected(all)
      return
    }
    const list = [...selected]
    const index = list.indexOf(value)
    index === -1 ? list.push(value) : list.splice(index, 1)
    setFilters((prev) => ({ ...prev, size: list.toString() }))
    setSelected(list)
  }

  return (
    <FormGroup>
      <CustomTooltipTitle
        name={'Size'}
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
            indeterminate={selected.length > 0 && selected.length < rangesOptions.length}
            value="all"
            onChange={handleChange}
            />}
        label="Select All"
      />
      {rangesOptions.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              color='default'
              checked={selected.indexOf(option) > -1}
              value={option}
              onChange={handleChange}
            />}
          label={option}
        />
      ))}
    </FormGroup>
  )
}
