import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor, getByRole } from '@testing-library/react'
import { SelectCompany } from '../../../../src/views/CompanyView/Components/SelectCompany'

const sampleCompanies = [
  {
    id: '1',
    name: 'Sample company abc'
  },
  {
    id: '2',
    name: 'Sample company xyz'
  },
  {
    id: '3',
    name: 'Test company'
  }
]
const defaultProps = {
  companyList: sampleCompanies,
  setCompanyID: jest.fn(),
  year: '2022',
  companyID: '1'
}

const setUp = (props) => {
  render(<SelectCompany {...defaultProps} {...props}/>)
}

describe('<SelectCompany />', () => {
  describe('render', () => {
    it('Should render Select Company', () => {
      setUp()

      expect(screen.getByText('Please select a company of the 2022:')).toBeInTheDocument()
      expect(screen.getByText(sampleCompanies[0].name)).toBeInTheDocument()
    })

    it('Should render Select Company when no companyID', () => {
      setUp({ companyID: null })

      expect(screen.getByText('Please select a company of the 2022:')).toBeInTheDocument()
      expect(screen.getByTestId('company-select')).toBeInTheDocument()
    })

    it('Should render Select Company when no list', () => {
      setUp({ companyList: null })

      expect(screen.getByText('Please select a company of the 2022:')).toBeInTheDocument()
      expect(screen.getByTestId('company-select')).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('Click on select', async () => {
      setUp()

      await waitFor(() => userEvent.click(getByRole(screen.getByTestId('company-select'), 'button')))
      await waitFor(() => userEvent.click(screen.getByText(sampleCompanies[2].name)))

      expect(screen.getByRole('button', { name: sampleCompanies[2].name })).toBeInTheDocument()
      expect(defaultProps.setCompanyID).toBeCalled()
    })
  })
})
