import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { TagsTab } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/TagsTab'
import useCompanyTags from '../../../../../src/hooks/useCompanyTags'
import { ARROW_DOWN, ENTER } from '../../../../keyEventCodes'

jest.mock('../../../../../src/hooks/useCompanyTags')

const hookResponse = {
  tagsByCompany: [
    {
      id: '1234',
      name: 'Sample tag'
    },
    {
      id: '1234',
      name: 'Sample tag'
    }
  ],
  listOfTags: [
    {
      id: '1',
      name: 'Tag',
      companies: [
        {
          id: '1',
          name: 'Tag'
        }
      ]
    },
    {

      id: '2',
      name: 'Tag Name',
      companies: [
        {
          id: '1',
          name: 'Company Name'
        }
      ]
    }
  ],
  isLoading: false,
  onSave: jest.fn(),
  onCancel: jest.fn(),
  handleTagsByCompany: jest.fn()
}

const setUp = () => {
  render(<TagsTab/>)
}
describe('<TagsTab/>', () => {
  it('autoComplete component when tag section is rendered successfully should be disabled', () => {
    useCompanyTags.mockImplementation(() => hookResponse)
    setUp()

    const tagsAutocomplete = screen.getByRole('combobox')
    const modifyButton = screen.getByRole('button', { name: 'Modify' })

    expect(tagsAutocomplete).toBeInTheDocument()
    expect(tagsAutocomplete).toBeDisabled()
    expect(modifyButton).toBeInTheDocument()
  })

  it('action buttons and autoComplete component when modify button is activated should be enabled and showed', () => {
    useCompanyTags.mockImplementation(() => hookResponse)
    setUp()
    const tagsAutocomplete = screen.getByRole('combobox')
    const modifyButton = screen.getByRole('button', { name: 'Modify' })

    fireEvent.click(modifyButton)

    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(tagsAutocomplete).toBeEnabled()
  })

  it('Should render progress bar when data is still loading', async () => {
    const response = { ...hookResponse, isLoading: true }
    useCompanyTags.mockImplementation(() => response)
    setUp()

    const progressBar = screen.getByTestId('loading-progress')

    expect(progressBar).toBeInTheDocument()
  })

  it('Should select tag if there is no previus saved tags when click on tags combobox', async () => {
    useCompanyTags.mockImplementation(() => hookResponse)
    setUp()
    const modifyButton = screen.getByRole('button', { name: 'Modify' })

    fireEvent.click(modifyButton)
    const tagsAutocomplete = screen.getByRole('combobox')
    fireEvent.change(tagsAutocomplete, { target: { value: 'Sample tag' } })
    fireEvent.keyDown(tagsAutocomplete, ARROW_DOWN)
    fireEvent.keyDown(tagsAutocomplete, ENTER)

    expect(hookResponse.handleTagsByCompany).toBeCalled()
  })

  it('should call on save method if edition mode is active when click on save button', async () => {
    useCompanyTags.mockImplementation(() => hookResponse)
    setUp()
    const modifyButton = screen.getByRole('button', { name: 'Modify' })

    fireEvent.click(modifyButton)
    fireEvent.click(screen.getByText('Save'))

    expect(hookResponse.onSave).toBeCalled()
  })

  it('should call on cancel method if edition mode is active when click on cancel button', async () => {
    useCompanyTags.mockImplementation(() => hookResponse)
    setUp()
    const modifyButton = screen.getByRole('button', { name: 'Modify' })

    fireEvent.click(modifyButton)
    fireEvent.click(screen.getByText('Cancel'))

    expect(hookResponse.onCancel).toBeCalled()
  })
})
