import React, { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'

const options = [
  'Application Software',
  'Communication Equipment',
  'Computer Hardware',
  'Online Media',
  'Semiconductors'
]

export function Sectors ({ handleOptionsChange, fullEndpoint }) {
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
      handleOptionsChange('sector', all)
      setSelected(all)
      return
    }
    // added below code to update selected options
    const list = [...selected]
    const index = list.indexOf(value)
    index === -1 ? list.push(value) : list.splice(index, 1)
    handleOptionsChange('sector', list)
    setSelected(list)
  }

  return (
    <FormGroup>
      <span>Sectors</span>
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

/* export function Sectors ({ handleOptionsChange }) {
  const [sectors, setSelectors] = useState({
    option1: [false, 'Application Software'],
    option2: [false, 'Communication Equipment'],
    option3: [false, 'Computer Hardware'],
    option4: [false, 'Online Media'],
    option5: [false, 'Semiconductors']
  })

  const handleSelectorChange = (event) => {
    setSelectors((prevState) => {
      const newState = { ...prevState, [event.target.name]: [!prevState[event.target.name][0], prevState[event.target.name][1]] }
      listEnabled('sector', newState, handleOptionsChange)
      return newState
    })
  }

  return (
    <>
      <FormGroup>
          <span>Sectors</span>
          <FormControlLabel control={<Checkbox color="default" onChange={handleSelectorChange} name='option1' checked={sectors.option1[0]}/>} label={sectors.option1[1]} />
          <FormControlLabel control={<Checkbox color="default" onChange={handleSelectorChange} name='option2' checked={sectors.option2[0]}/>} label={sectors.option2[1]} />
          <FormControlLabel control={<Checkbox color="default" onChange={handleSelectorChange} name='option3' checked={sectors.option3[0]}/>} label={sectors.option3[1]} />
          <FormControlLabel control={<Checkbox color="default" onChange={handleSelectorChange} name='option4' checked={sectors.option4[0]}/>} label={sectors.option4[1]} />
          <FormControlLabel control={<Checkbox color="default" onChange={handleSelectorChange} name='option5' checked={sectors.option5[0]}/>} label={sectors.option5[1]}/>
      </FormGroup>
    </>
  )
}

*/
// @ts-check

// /**
//   * Fuction filter an array only with elements in true
//   * @param {string} name recive name of the array
//   * @param {object} object receive an object
//   * @param {CallableFunction} callback receive a function
//  */
// export const listEnabled = async (name, object, callback) => {
//   const res = Object.values(object).filter(row => row[0])
//   const result = res.map(res => res[1])
//   callback(name, result)
// }
