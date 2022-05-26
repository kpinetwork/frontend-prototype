import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import * as wouter from 'wouter'
import { CompaniesPanelTable } from '../../../../src/views/CompanyPanelView/Components/CompaniesTable'
import useCompaniesPanelTable from '../../../../src/hooks/useCompaniesPanelTable'
import Context from '../../../../src/context/appContext'

jest.mock('../../../../src/hooks/useCompaniesPanelTable')

const hookResponse = {
  initCompanies: jest.fn(),
  rowsPerPage: 10,
  offset: 0,
  wantsChange: false,
  setChange: jest.fn(),
  isLoading: false,
  companies: [
    {
      id: '1234',
      name: 'Sample company abc',
      sector: 'Application Software',
      vertical: 'Education',
      inves_profile_name: 'Growth stage VC',
      is_public: false
    }
  ],
  handleChange: jest.fn(),
  isCompanyChecked: jest.fn(),
  total: 1,
  page: 0,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn(),
  cleanCompaniesToChange: jest.fn(),
  onSave: jest.fn()
}

const setSelectedCompanyIDMock = jest.fn()

const setUp = () => {
  render(
    <Context.Provider value={{ company: { setSelectedCompanyID: setSelectedCompanyIDMock } }}>
      <CompaniesPanelTable />
    </Context.Provider>
  )
}

describe('<CompaniesPanelTable />', () => {
  describe('render', () => {
    it('Should render Companies Panel Table component', () => {
      useCompaniesPanelTable.mockImplementation(() => hookResponse)
      setUp()

      const rows = screen.getAllByRole('row')
      const button = screen.getByText('Change publicly')
      const company = screen.getByRole('row', { name: '1234 Sample company abc Application Software Education' })
      const pagination = screen.getByRole('row', { name: 'Rows per page: 10 1-1 of 1' })

      expect(screen.getByRole('table'))
      expect(rows).toHaveLength(3)
      expect(screen.getByRole('checkbox'))
      expect(button).toBeInTheDocument()
      expect(company).toBeInTheDocument()
      expect(pagination).toBeInTheDocument()
    })

    it('Should render loading progress when isLoading equals true', () => {
      const response = { ...hookResponse, isLoading: true }
      useCompaniesPanelTable.mockImplementation(() => response)
      setUp()

      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('click on Change Publicly', () => {
      useCompaniesPanelTable.mockImplementation(() => hookResponse)
      setUp()
      fireEvent.click(screen.getByText('Change publicly'))

      expect(hookResponse.setChange).toHaveBeenCalled()
    })

    it('handleChange should be called when click in checkbox', () => {
      useCompaniesPanelTable.mockImplementation(() => hookResponse)
      setUp()
      fireEvent.click(screen.getByRole('checkbox'))

      expect(hookResponse.handleChange).toHaveBeenCalled()
    })

    it('click on cancel', () => {
      const response = { ...hookResponse, wantsChange: true }
      useCompaniesPanelTable.mockImplementation(() => response)
      setUp()

      fireEvent.click(screen.getByText('Cancel'))

      expect(hookResponse.cleanCompaniesToChange).toHaveBeenCalled()
      expect(hookResponse.setChange).toHaveBeenCalled()
    })

    it('click on ID cell', () => {
      const response = { ...hookResponse, wantsChange: true }
      const setLocationMock = jest.fn()
      jest.spyOn(wouter, 'useLocation').mockReturnValue(['', setLocationMock])
      useCompaniesPanelTable.mockImplementation(() => response)
      setUp()

      fireEvent.click(screen.getByRole('cell', { name: '1234' }))

      expect(setSelectedCompanyIDMock).toHaveBeenCalled()
      expect(setLocationMock).toHaveBeenCalled()
    })
  })
})
