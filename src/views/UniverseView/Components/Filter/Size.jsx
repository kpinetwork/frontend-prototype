import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'

const options = [
  '<$10 million',
  '$10-<$30 million',
  '$30-<$50 million',
  '$50-<$100 million',
  '$100 million +'
]

export function Size ({ handleOptionsChange, fullEndpoint }) {
  const [selected, setSelected] = useState([])
  const isAllSelected = options.length > 0 && selected.length === options.length

  useEffect(() => {
    if (fullEndpoint) {
      const all = selected.length === options.length ? [] : options
      setSelected(all)
    }
  }, [fullEndpoint])

  const handleChange = (event) => {
    const value = event.target.value
    if (value === 'all') {
      const all = selected.length === options.length ? [] : options
      handleOptionsChange('size', all)
      setSelected(all)
      return
    }
    // added below code to update selected options
    const list = [...selected]
    const index = list.indexOf(value)
    index === -1 ? list.push(value) : list.splice(index, 1)
    handleOptionsChange('size', list)
    setSelected(list)
  }

  return (
    <FormGroup>
      <span>Size</span>
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
