import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import PreviewTable from '../../../../src/views/UploadFileView/Components/PreviewTable'

const props = {
  head: [
    ['UID', 'Name', 'Sector', 'Vertical', 'Investor profile', ':Actuals', ''],
    ['', '', '', '', '', ':Revenue', ':Ebitda'],
    ['', '', '', '', '', '2020', '2020']
  ],
  body: [
    ['', 'Company A', 'Application Software', 'Engineering', 'Early stage VC', '4.56', '11.1'],
    ['', 'Company BC', 'Application Software', 'Engineering', 'Growth stage VC', '8.01', '21.3']
  ]
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

describe('<PreviewTable /> with edit feature', () => {
  beforeEach(() => {
    setUp({ edit: true })
  })

  it('Should render preview table with textfields in cells', () => {
    const table = screen.getByRole('table')
    const inputCells = screen.getAllByRole('textbox')

    expect(table).toBeInTheDocument()
    expect(inputCells).toHaveLength(props.body.length * 3)
  })

  it('Should change value when editing textfield table cell', () => {
    const inputCells = screen.getAllByRole('textbox')
    const companyName = 'Company A changes!'
    const nameCellA = inputCells[0]

    fireEvent.change(nameCellA, { target: { value: companyName } })

    expect(nameCellA.value).toBe(companyName)
  })

  it('Should change value when editing select input table cell', async () => {
    const sector = 'Communication Equipment'

    fireEvent.mouseDown(screen.getAllByRole('button')[0])
    fireEvent.click(screen.getAllByRole('option')[1])
    const options = screen.getAllByDisplayValue(sector)

    expect(options[0]).toBeInTheDocument()
  })
})
