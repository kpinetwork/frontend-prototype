import React from 'react'
import { Auth } from 'aws-amplify'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { CompaniesPanelTable } from '../../../../src/views/CompanyPanelView/Components/CompaniesTable'
import useCompanyPanel from '../../../../src/hooks/useCompanyPanel'

const setUp = () => {
  render(<CompaniesPanelTable />)
}

const hookResponse = {
  total: 1,
  companies: [
    {
      id: '1234',
      name: 'Sample company',
      sector: 'test sector',
      vertical: 'vertical sector',
      inves_profile_name: 'test invest profile',
      is_public: false
    }
  ],
  setCompanies: jest.fn(),
  isLoading: false,
  getCompanyPanel: jest.fn()
}

jest.mock('../../../../src/hooks/useCompanyPanel')

// jest.mock('../../../../src/service/companyPanel', () => {
//   return {
//     getCompanyPanel: {
//       total: 1,
//       companies: [
//         {
//           id: '1234',
//           name: 'Sample company',
//           sector: 'test sector',
//           vertical: 'vertical sector',
//           inves_profile_name: 'test invest profile',
//           is_public: false
//         }
//       ],
//       setCompanies: jest.fn(),
//       isLoading: false,
//       getCompanyPanel: jest.fn()
//     }
//   }
// })

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('<CompaniesPanelTable />', () => {
  describe('Render', () => {
    it('Should render Companies Panel Table component', async () => {
      useCompanyPanel.mockImplementation(() => hookResponse)
      await waitFor(() => {
        setUp()
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

    describe('Actions', () => {
      it('Click on change publicly, check checkbox and save changes', async () => {
        useCompanyPanel.mockImplementation(() => hookResponse)
        setUp()
        await waitFor(() => {
          fireEvent.click(screen.getByText('Change publicly'))
        })
        const textInformation = screen.getByText('Select all the companies that will be shared over KPI.')
        const checkbox = screen.getByRole('checkbox')

        expect(checkbox.checked).toBeFalsy()

        fireEvent.click(checkbox)
        const saveButton = screen.getByText('Save')
        fireEvent.click(saveButton)

        expect(textInformation).toBeInTheDocument()
        expect(saveButton).toBeInTheDocument()
        expect(checkbox.checked).toBeTruthy()
      })
      it('Click on change publicly, check checkbox and cancel changes', async () => {
        useCompanyPanel.mockImplementation(() => hookResponse)
        setUp()
        await waitFor(() => {
          fireEvent.click(screen.getByText('Change publicly'))
        })
        const checkbox = screen.getByRole('checkbox')

        expect(checkbox.checked).toBeFalsy()

        fireEvent.click(checkbox)
        const cancelButton = screen.getByText('Cancel')
        fireEvent.click(cancelButton)

        expect(checkbox.checked).toBeFalsy()
        expect(cancelButton).not.toBeInTheDocument()
      })
      // it('Click on next page', async () => {
      //   const response = {
      //     ...hookResponse,
      //     getCompanyPanel: hookResponse,
      //     setCompanies: [{
      //       id: 10,
      //       name: 'Sample company',
      //       sector: 'test sector',
      //       vertical: 'vertical sector',
      //       inves_profile_name: 'test invest profile',
      //       is_public: false
      //     }],
      //     companies: Array(11).fill(hookResponse.companies[0]).map(
      //       (company, index) => (
      //         { ...company, id: index }
      //       )
      //     )
      //   }
      //   useCompanyPanel.mockImplementation(() => response)
      //   setUp()
      //   const nextPage = screen.getByTitle('Next page')
      //   screen.debug()
      //   // fireEvent.click(nextPage)
      //   await waitFor(() => {
      //     fireEvent.click(nextPage)
      //   })
      // })
    })
  })
})
