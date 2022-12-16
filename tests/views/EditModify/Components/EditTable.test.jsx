import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EditPreviewTable from '../../../../src/views/EditModify/Components/EditTable'
import { DATA } from '../../../data/editModify'

const defaultProps = {
  head: [...DATA.head],
  body: [...DATA.body],
  isLoading: false,
  edit: false,
  trackChange: jest.fn(),
  errorObject: {
    0: [],
    1: []
  }
}

const setUp = (props) => {
  render(<EditPreviewTable {...defaultProps} {...props} />)
}

describe('<PreviewTable /> without edit feature', () => {
  it('Should render preview table with all information', () => {
    setUp({ edit: false })
    const table = screen.getByRole('table')

    expect(table).toBeInTheDocument()
  })
})

describe('<EditPreviewTable /> with format validation', () => {
  it('Should render preview table with metric value error style', () => {
    const invalidMetric = '4,56'
    const company = JSON.parse(JSON.stringify({ ...defaultProps.body[0] }))
    company.scenarios[0].value = invalidMetric
    setUp({
      edit: false,
      body: [company]
    })
    const inputCells = screen.getAllByRole('cell')
    const cell = inputCells.filter(td => td.firstChild.textContent === invalidMetric)[0]

    expect(cell.firstChild.firstChild).toHaveStyle('color: red')
  })

  it('Should render edit preview table with select cell error style', () => {
    const invalidVertical = 'Engineering 2'
    const company = JSON.parse(JSON.stringify({ ...defaultProps.body[0] }))
    company.vertical = invalidVertical
    setUp({
      edit: false,
      body: [company]
    })
    const inputCells = screen.getAllByRole('cell')
    const cell = inputCells.filter(td => td.firstChild.textContent === invalidVertical)[0]

    waitFor(() => {
      expect(cell.firstChild.firstChild).toHaveStyle('color: red')
    })
  })

  it('Edit metric texfield and set empty should not show an error', () => {
    const company = JSON.parse(JSON.stringify({ ...defaultProps.body[0] }))
    setUp({
      edit: true,
      body: [company]
    })
    const inputCells = screen.getAllByRole('textbox')
    const cell = inputCells.filter(elem => elem.value === '4.56')[0]

    fireEvent.change(cell, { target: { value: '' } })

    expect(cell.value).toBe('')
  })

  it('Should render empty string with empty scenario data', () => {
    const company = JSON.parse(JSON.stringify({ ...defaultProps.body[0] }))
    company.scenarios[0] = {}

    setUp({
      edit: false,
      body: [company]
    })
    const inputCells = screen.getAllByRole('cell')
    const cells = inputCells.filter(td => td.firstChild.textContent === '')

    expect(cells.length).toBe(1)
  })
})

describe('<EditPreviewTable /> with edit feature', () => {
  beforeEach(() => {
    setUp({ edit: true })
  })

  it('Should render preview table with textfields in cells', () => {
    const table = screen.getByRole('table')
    const inputCells = screen.getAllByRole('textbox')

    expect(table).toBeInTheDocument()
    expect(inputCells).toHaveLength(defaultProps.body.length * 3)
  })

  it('Should change value when editing textfield table cell', () => {
    const inputCells = screen.getAllByRole('textbox')
    const companyName = 'Company A changes!'
    const nameCellA = inputCells[0]

    fireEvent.change(nameCellA, { target: { value: companyName } })

    expect(nameCellA.value).toBe(companyName)
  })

  it('Should change value when editing select input table cell', async () => {
    const investor = 'Growth stage VC'
    let options

    fireEvent.mouseDown(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getAllByRole('option')[1])
    waitFor(() => { options = screen.getAllByDisplayValue(investor) })

    waitFor(() => { expect(options[0]).toBeInTheDocument() })
  })
})
