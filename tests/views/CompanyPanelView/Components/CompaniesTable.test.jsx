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
  getCompanyPanel: () => {}
}

jest.mock('../../../../src/hooks/useCompanyPanel')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

describe('<CompaniesPanelTable />', () => {
  describe('Render', () => {
    it('Should render Companies Panel Table component', async () => {
      useCompanyPanel.mockImplementation(() => hookResponse)
      setUp()
      await waitFor(() => {
        expect(screen.getByText('Change publicly')).toBeInTheDocument()
        expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
        expect(screen.getByRole('columnheader', { name: 'Public' })).toBeInTheDocument()
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
    })
  })
})
