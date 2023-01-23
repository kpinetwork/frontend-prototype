import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { getHeaderValue, getColumnsValues, processChanges, processScenarios, getModifiedData } from '../../../../src/views/EditModify/Components/EditModifyTableHandler.jsx'

const changes = {
  1: {
    newData: {
      name: 'Company 1',
      inves_profile_name: 'Profile 1',
      scenarios: [
        { value: 10, metric_id: 1 },
        { value: 20, metric_id: 2 },
        { value: 30, metric_id: 3 }
      ]
    }
  },
  2: {
    newData: {
      name: 'Company 2',
      inves_profile_name: 'Profile 2',
      scenarios: [
        { value: 40, metric_id: 4 },
        { value: 50, metric_id: 5 },
        { value: 60, metric_id: 6 }
      ]
    }
  }
}
const headers = [
  ['', '', 'Scenario 1', 'Scenario 2', 'Scenario 3'],
  ['', '', 'Metric 1', 'Metric 1', 'Metric 2'],
  ['', '', 2021, 2022, 2023]
]

function TestGetModifiedData () {
  const modifiedData = getModifiedData(changes, headers)
  return (
    <ul>
      {modifiedData.edit.map((value) => (
        <li key={value.id}>{value.description.name}</li>
      ))}
    </ul>
  )
}

function TestGetHeaderValue () {
  const result = getHeaderValue(['a', 'b', 'c'], 2)
  return <div>{result}</div>
}

function TestGetColumnsValues () {
  const data = [
    { scenarios: [{ value: 1 }, { value: 2 }, { value: 3 }], id: '1' },
    { scenarios: [{ value: 4 }, { value: 5 }, { value: 6 }], id: '2' }
  ]
  const columns = getColumnsValues(data)
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {row.scenarios.map((value, index) => (
              <td key={index}>{value.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TestProcessChanges () {
  const changes = {
    1: {
      newData: {
        name: 'Test 1',
        inves_profile_name: 'Profile 1',
        scenarios: [
          { metric_id: 1, value: 10 },
          { metric_id: 2, value: 20 }
        ]
      }
    },
    2: {
      newData: {
        name: 'Test 2',
        inves_profile_name: 'Profile 2',
        scenarios: [
          { metric_id: 3, value: 30 },
          { metric_id: 4, value: 40 }
        ]
      }
    }
  }
  const processedChanges = processChanges(changes)
  return (
    <ul>
      {processedChanges.map((change) => (
        <li key={change.id}>{change.description.name}</li>
      ))}
    </ul>
  )
}

function TestProcessScenarios () {
  const headers = [
    ['', '', 'Scenario 1', 'Scenario 2', 'Scenario 3'],
    ['', '', 'Metric 1', 'Metric 1', 'Metric 2'],
    ['', '', 2021, 2022, 2023]
  ]
  const scenarios = [
    { value: 10 },
    { value: 20 },
    { value: 30 }
  ]
  const newValues = []
  processScenarios(scenarios, headers, newValues, 1)
  return (
    <ul>
      {newValues.map((value, index) => (
        <li key={index}>{value.value}</li>
      ))}
    </ul>
  )
}

test('getHeaderValue returns the correct result', () => {
  render(<TestGetHeaderValue />)
  const element = screen.getByText('c')

  expect(element).toBeInTheDocument()
})

test('getColumnsValues returns the correct columns', () => {
  render(<TestGetColumnsValues />)

  expect(screen.getAllByText('1')).toHaveLength(1)
  expect(screen.getAllByText('2')).toHaveLength(1)
  expect(screen.getAllByText('3')).toHaveLength(1)
  expect(screen.getAllByText('4')).toHaveLength(1)
  expect(screen.getAllByText('5')).toHaveLength(1)
  expect(screen.getAllByText('6')).toHaveLength(1)
})

test('processChanges returns the correct data', () => {
  render(<TestProcessChanges />)

  expect(screen.getAllByText('Test 1')).toHaveLength(1)
  expect(screen.getAllByText('Test 2')).toHaveLength(1)
})

test('processScenarios returns the correct data', () => {
  render(<TestProcessScenarios />)

  expect(screen.getAllByText('10')).toHaveLength(1)
  expect(screen.getAllByText('20')).toHaveLength(1)
  expect(screen.getAllByText('30')).toHaveLength(1)
})

test('getModifiedData returns the correct data', () => {
  render(<TestGetModifiedData />)

  expect(screen.getAllByText('Company 1')).toHaveLength(1)
  expect(screen.getAllByText('Company 2')).toHaveLength(1)
})
