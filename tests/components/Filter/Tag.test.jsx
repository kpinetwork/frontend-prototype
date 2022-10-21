import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import { Tag } from '../../../src/components/Filter/Tag'
import useTag from '../../../src/hooks/useTag'

jest.mock('../../../src/hooks/useTag')

const hookResponse = {
  tags: [
    { id: '123', name: 'Tag Sample 1' },
    { id: '122', name: 'Tag Sample 2' }
  ]
}

const defaultProps = {
  setFilters: jest.fn(),
  selectedList: hookResponse.tags[0].name
}

const setUp = (props) => {
  render(<Tag {...defaultProps} {...props}/>)
}

describe('<Tag />', () => {
  it('Should render Tag component ', () => {
    useTag.mockImplementation(() => hookResponse)
    setUp()

    const combobox = screen.getByRole('combobox')

    expect(combobox).toBeInTheDocument()
  })

  it('Should select tag if there is no previus saved tags when click on tags combobox', async () => {
    useTag.mockImplementation(() => hookResponse)
    setUp({ selectedList: undefined })

    const open = await screen.findByTitle('Open')
    fireEvent.click(open)
    const options = await screen.findAllByRole('option')
    fireEvent.click(options[0])

    expect(defaultProps.setFilters).toBeCalled()
  })

  it('Should select tag if there is previous saved tags when click on tags combobox', async () => {
    useTag.mockImplementation(() => hookResponse)
    setUp()

    const open = await screen.findByTitle('Open')
    fireEvent.click(open)
    const options = await screen.findAllByRole('option')
    fireEvent.click(options[0])

    expect(defaultProps.setFilters).toBeCalled()
  })
})
