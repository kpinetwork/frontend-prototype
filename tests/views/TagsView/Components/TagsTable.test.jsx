import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { TagsTable } from '../../../../src/views/TagsView/Components/TagsTable'

const defaultProps = {
  isEditable: false
}

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const setUp = (props) => {
  render(
      <TagsTable {...defaultProps} {...props}/>
  )
}

describe('<TagsTable />', () => {
  describe('render', () => {
    it('Should render tags Table', () => {
      setUp()
      const table = screen.getByRole('grid')
      const tagHeader = screen.getByText('Tag')
      const companiesHeader = screen.getByText('Tag')

      expect(table).toBeInTheDocument()
      expect(tagHeader).toBeInTheDocument()
      expect(companiesHeader).toBeInTheDocument()
    })

    it('Should enable edition on table when table is editable', () => {
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
