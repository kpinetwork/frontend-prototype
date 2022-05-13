import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import PreviewTable from '../../../../src/views/UploadFileView/Components/PreviewTable'

const props = {
  head: [
    ['UID', 'Name', 'Sector', 'Vertical', 'Investor profile', 'Size cohort', ':Actuals', ''],
    ['', '', '', '', '', '', ':Revenue', ':Ebitda'],
    ['', '', '', '', '', '', '2020', '2020']
  ],
  body: [
    ['', 'Company A', 'Application Software', 'Engineering', 'Early stage VC', '100+', '4.56', '11.1'],
    ['', 'Company BC', 'Application Software', 'Engineering', 'Growth stage VC', '<10', '8.01', '21.3']
  ],
  errorObject: {
    0: [],
    1: []
  }
}
const setUp = (defaultProps) => {
  render(<PreviewTable {...props} {...defaultProps}/>)
}

describe('<PreviewTable /> without edit feature', () => {
  it('Should render preview table with all information', () => {
    setUp({ edit: false })
    const table = screen.getByRole('table')
    const headerCells = screen.getAllByRole('columnheader')
    const bodyCells = screen.getAllByRole('cell')

    expect(table).toBeInTheDocument()
    expect(headerCells).toHaveLength(props.head.length * props.head[0].length)
    expect(bodyCells).toHaveLength(props.body.length * props.body[0].length)
  })
})

describe('<PreviewTable /> with format validation', () => {
  it('Should render preview table with metric value error style', () => {
    const invalidMetric = '4,56'
    setUp({
      edit: false,
      body: [
        ['', ' A ', 'Application Software', 'Engineering', 'Early stage VC', '', invalidMetric, '11.1']
      ]
    })
    const inputCells = screen.getAllByRole('cell')
    const cell = inputCells.filter(td => td.firstChild.textContent === invalidMetric)[0]

    expect(cell.firstChild.firstChild).toHaveStyle('color: red')
  })

  it('Should render preview table with select cell error style', () => {
    const invalidVertical = 'Engineering 2'
    setUp({
      edit: false,
      body: [
        ['Hola', ' A ', 'Application Software', invalidVertical, 'Early stage VC', '', '4,56', '11.1']
      ]
    })
    const inputCells = screen.getAllByRole('cell')
    const cell = inputCells.filter(td => td.firstChild.textContent === invalidVertical)[0]

    expect(cell.firstChild.firstChild).toHaveStyle('color: red')
  })

  it('Edit metric texfield and set empty should not show an error', () => {
    setUp({
      edit: true,
      body: [
        ['Hola', ' A ', 'Application Software', 'Engineering', 'Early stage VC', 'Size', '3,78', '11.1']
      ]
    })
    const inputCells = screen.getAllByRole('textbox')
    const cell = inputCells.filter(elem => elem.value === '3,78')[0]

    fireEvent.change(cell, { target: { value: '' } })

    expect(cell.value).toBe('')
  })
})

describe('<PreviewTable /> with edit feature', () => {
  beforeEach(() => {
    setUp({ edit: true })
  })

  it('Should render preview table with textfields in cells', () => {
    const table = screen.getByRole('table')
    const inputCells = screen.getAllByRole('textbox')

    expect(table).toBeInTheDocument()
    expect(inputCells).toHaveLength(props.body.length * 4)
  })

  it('Should change value when editing textfield table cell', () => {
    const inputCells = screen.getAllByRole('textbox')
    const companyName = 'Company A changes!'
    const nameCellA = inputCells[0]

    fireEvent.change(nameCellA, { target: { value: companyName } })

    expect(nameCellA.value).toBe(companyName)
  })

  it('Should change value when editing select input table cell', async () => {
    const sector = 'communication equipment'

    fireEvent.mouseDown(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getAllByRole('option')[1])
    const options = screen.getAllByDisplayValue(sector)

    expect(options[0]).toBeInTheDocument()
  })
})
