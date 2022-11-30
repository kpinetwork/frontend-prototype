import { Auth } from 'aws-amplify'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TagsTable } from '../../../../src/views/TagsView/Components/TagsTable'
import { TrendingUpOutlined } from '@mui/icons-material'

const defaultProps = {
  isEditable: false,
  companies: {
    1: 'E. CORP',
    2: 'Sample Company',
    3: 'Test Inc.'
  },
  data: {
    1: {
      id: 1,
      name: 'Education',
      companies: [1]
    },
    2: {
      id: 2,
      name: 'Technology',
      companies: []
    },
    3: {
      id: 3,
      name: 'Fashion',
      companies: [2]
    }
  },
  total: 3,
  isLoading: false,
  actionWaiting: false,
  pageSize: 10,
  page: 0,
  handleChangePage: jest.fn(),
  handleChangePageSize: jest.fn(),
  tagsToDelete: [],
  setTagsToDelete: jest.fn(),
  openEdit: true,
  setData: jest.fn(),
  initialData: {
    1: {
      id: 1,
      name: 'Education',
      companies: [1]
    },
    2: {
      id: 2,
      name: 'Technology',
      companies: []
    },
    3: {
      id: 3,
      name: 'Fashion',
      companies: [2]
    }
  }
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
      const data = JSON.parse(JSON.stringify(defaultProps.data))
      data[2].companies = null
      setUp({ data })

      const table = screen.getByRole('grid')
      const tagHeader = screen.getByText('Tag')
      const companiesHeader = screen.getByText('Tag')

      expect(table).toBeInTheDocument()
      expect(tagHeader).toBeInTheDocument()
      expect(companiesHeader).toBeInTheDocument()
    })

    it('Should render loading bar when data is loading', () => {
      setUp({ isLoading: true })

      const loadingBar = screen.getByTestId('loading-progress')

      expect(loadingBar).toBeInTheDocument()
    })
  })

  describe('edition', () => {
    it('Should change tag name on edition name texfield when table is editable', async () => {
      setUp({ isEditable: TrendingUpOutlined })
      const tag = screen.getByRole('cell', { name: 'Education' })

      fireEvent.doubleClick(tag)
      const inputCell = screen.getByRole('textbox')
      fireEvent.change(inputCell, { target: { value: 'Science' } })
      await waitFor(() => fireEvent.click(screen.getByRole('cell', { name: 'Fashion' })))

      expect(inputCell.value).toBe('Science')
    })

    it('Should change tag companies on edition companies select when table is editable', async () => {
      setUp({ isEditable: true })
      const companyToSelect = 'Sample Company'
      const companyAlreadySelected = 'E. CORP'

      fireEvent.doubleClick(screen.getByRole('cell', { name: companyAlreadySelected }))
      fireEvent.mouseDown(screen.getByRole('button', { name: companyAlreadySelected }))
      fireEvent.click(screen.getByRole('option', { name: companyToSelect }))
      await waitFor(() => fireEvent.click(screen.getByText('Fashion')))

      expect(
        screen.getByRole('cell',
          { name: `${companyAlreadySelected},${companyToSelect}` })
      ).toBeInTheDocument()
    })

    it('Should reset initial data on table when edition is cancelled', async () => {
      setUp({ isEditable: true, openEdit: false })

      expect(defaultProps.setData).toHaveBeenCalled()
    })
  })

  describe('pagination', () => {
    it('Should call handleChangePage when click on change page', async () => {
      setUp({ total: 20 })
      const buttonNextPage = screen.getByRole('button', { name: 'Go to next page' })

      fireEvent.click(buttonNextPage)

      expect(defaultProps.handleChangePage).toHaveBeenCalled()
    })

    it('Should call handleChangePageSize when click on change page size', async () => {
      setUp({ total: 20 })
      const buttonPageSize = screen.getByRole('button', { name: 'Rows per page: 10' })

      fireEvent.mouseDown(buttonPageSize)
      fireEvent.click(screen.getByRole('option', { name: '50' }))

      expect(defaultProps.handleChangePageSize).toHaveBeenCalled()
    })
  })

  describe('checkbox selection', () => {
    it('Should call setTagsToDelete when select a tag to delete', async () => {
      setUp({ allowSelectionDelete: true })
      const checkboxTagID = screen.getAllByRole('checkbox')[0]

      fireEvent.click(checkboxTagID)

      expect(defaultProps.setTagsToDelete).toHaveBeenCalled()
    })
  })
})
