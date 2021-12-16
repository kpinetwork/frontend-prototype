import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import React, { useState } from 'react'

const options = [
  'Accounting & Auditing',
  'Banking',
  'Business Services',
  'Consumer Services',
  'Ecommerce',
  'Education',
  'Energy',
  'Engineering',
  'Entertaiment',
  'Environment',
  'Fashion',
  'Govermment',
  'Healthcare',
  'Heavy Industry',
  'Hotels',
  'Infrastructure',

  'Insurance',
  'Law',
  'Life Sciences',
  'Logistics',
  'Manufacturing',
  'Media',
  'Mining',
  'Non-profits',
  'Professional Services',
  'Publishing',
  'Real Estate',
  'Transportation',
  'Utilities',
  'Wholesale',
  'Horizontal'
]
export function Vertical ({ setFilters, fillFilters }) {
  const [selected, setSelected] = useState([])
  const isAllSelected = options.length > 0 && selected.length === options.length

  const handleChange = (event) => {
    const value = event.target.value
    if (value === 'all') {
      const all = selected.length === options.length ? [] : options
      setFilters((prev) => ({ ...prev, vertical: all.toString() }))
      setSelected(all)
      return
    }
    // added below code to update selected options
    const list = [...selected]
    const index = list.indexOf(value)
    index === -1 ? list.push(value) : list.splice(index, 1)
    setFilters((prev) => ({ ...prev, vertical: list.toString() }))
    setSelected(list)
  }

  return (
    <FormGroup>
      <span>Vertical</span>
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
      {options.map((option) => (
        <FormControlLabel
          key={option}
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
