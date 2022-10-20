import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { TagsTab } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/TagsTab'
import useCompanyTags from '../../../../../src/hooks/useCompanyTags'

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
})
