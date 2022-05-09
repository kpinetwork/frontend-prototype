import React from 'react'
import { Auth } from 'aws-amplify'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import { CompaniesPanelTable } from './CompaniesTable'

const setUp = () => {
  render(<CompaniesPanelTable />)
}

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

jest.mock('../../../service/companyPanel', () => {
  return {
    getCompanyPanelFromQueryParams: {
      total: 1,
      companies: [
        {
          id: '1234',
          name: 'Sample company',
          sector: 'test sector',
          vertical: 'vertical sector',
          inves_profile_name: 'test inves profile',
          is_public: false
        }
      ]
    }
  }
})

describe('<CompaniesPanelTable />', () => {
  describe('Render', () => {
    fit('Should render Companies Panel Table component', async () => {
      setUp()
      await waitFor(() => {
        const changePubliclyButton = screen.getByText('Change publicly')
        const tableCols = screen.getAllByRole('columnheader')
        const nameHeader = screen.getByRole('columnheader', { name: 'Name' })
        const publicHeader = screen.getByRole('columnheader', { name: 'Public' })

        expect(changePubliclyButton).toBeInTheDocument()
        expect(tableCols).toHaveLength(4)
        expect(nameHeader).toBeInTheDocument()
        expect(publicHeader).toBeInTheDocument()
      })
    })
  })
})
