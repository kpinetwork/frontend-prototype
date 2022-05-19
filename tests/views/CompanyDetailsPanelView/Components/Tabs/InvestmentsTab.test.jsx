import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { InvestmentsTab } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/InvestmentsTab'
import useCompanyDetails from '../../../../../src/hooks/useCompanyDetails'

jest.mock('../../../../../src/hooks/useCompanyDetails')

const hookResponse = {
  addInvestment: jest.fn(),
  investments: [
    {
      company_id: 'id',
      id: '123',
      investment_date: '2019-02',
      divestment_date: null,
      round: 1,
      structure: 'Primary',
      ownership: 'Minority',
      investor_type: 'Private equity'
    }
  ],
  isLoading: false
}

const setUp = () => {
  render(<InvestmentsTab/>)
}

describe('<InvestmentsTab/>', () => {
  it('should render table with data', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()

    const cellInvestDate = screen.getByText('2019-02')

    expect(cellInvestDate).toBeInTheDocument()
  })

  it('click on add button should open form', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()
    const button = screen.getByRole('button', { name: 'Add investments' })

    fireEvent.click(button)

    expect(screen.getByText('Add investment')).toBeInTheDocument()
  })

  it('click on cancel should close form', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()

    fireEvent.click(screen.getByRole('button', { name: 'Add investments' }))
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(cancelButton)

    expect(cancelButton).not.toBeInTheDocument()
  })

  it('click on save without valid data should display error', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()
    fireEvent.click(screen.getByRole('button', { name: 'Add investments' }))

    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    const errorText = screen.getByText('Invalid investment date')

    expect(errorText).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('click on save with valid data should call service', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()
    fireEvent.click(screen.getByRole('button', { name: 'Add investments' }))

    fireEvent.change(screen.getByPlaceholderText('Investment date'), { target: { value: '2020-09' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))

    expect(hookResponse.addInvestment).toBeCalled()
  })
})
