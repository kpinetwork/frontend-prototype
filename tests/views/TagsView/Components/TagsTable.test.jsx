import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { TagsTable } from '../../../../src/views/TagsView/Components/TagsTable'
import useTagsTable from '../../../../src/hooks/useTagsTable'

jest.mock('../../../../src/hooks/useTagsTable')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const defaultProps = {
  isEditable: false
}

const setUp = (props) => {
  render(
      <TagsTable {...defaultProps} {...props}/>
  )
}

const hookResponse = {
  isLoading: false,
  total: 1,
  tags: [{ id: '123', name: 'Tag Sample', companies: [] }]
}

describe('<TagsTable />', () => {
  describe('render', () => {
    it('Should render tags Table', () => {
      useTagsTable.mockImplementation(() => hookResponse)
      setUp()

      const table = screen.getByRole('grid')
      const tagHeader = screen.getByText('Tag')
      const companiesHeader = screen.getByText('Tag')

      expect(table).toBeInTheDocument()
      expect(tagHeader).toBeInTheDocument()
      expect(companiesHeader).toBeInTheDocument()
    })

    it('Should render loading bar when data is loading', () => {
      const response = { ...hookResponse, isLoading: true }
      useTagsTable.mockImplementation(() => response)
      setUp()

      const loadingBar = screen.getByTestId('loading-progress')

      expect(loadingBar).toBeInTheDocument()
    })

    it('Should enable edition on table when table is editable', () => {
      useTagsTable.mockImplementation(() => hookResponse)
      setUp()
      const table = screen.getByRole('grid')
      const tagHeader = screen.getByText('Tag')
      const companiesHeader = screen.getByText('Companies')

      expect(table).toBeInTheDocument()
      expect(tagHeader).toBeInTheDocument()
      expect(companiesHeader).toBeInTheDocument()
    })
  })
})
