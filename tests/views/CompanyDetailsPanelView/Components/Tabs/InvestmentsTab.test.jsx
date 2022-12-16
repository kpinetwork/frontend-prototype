import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InvestmentsTab } from '../../../../../src/views/CompanyDetailsPanelView/Components/Tabs/InvestmentsTab'
import useCompanyDetails from '../../../../../src/hooks/useCompanyDetails'

jest.mock('../../../../../src/hooks/useCompanyDetails')

const ADD_INVESTMENTS_RESPONSES = {
  added_response: { added: true },
  fail_response: { error: "Can't add investment" }
}

const hookResponse = {
  addInvestment: () => ADD_INVESTMENTS_RESPONSES.added_response,
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
  isLoading: false,
  setLoading: jest.fn()
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

  it('should render table with imcomplete data', () => {
    const response = {
      addInvestment: jest.fn(),
      investments: [{
        company_id: 'id',
        id: '123',
        investment_date: '2019-02'
      }],
      isLoading: false
    }
    useCompanyDetails.mockImplementation(() => response)
    setUp()

    const cells = screen.getAllByText('NA')

    expect(cells).toHaveLength(5)
  })

  it('should render progress line if data is loading', () => {
    const response = {
      addInvestment: jest.fn(),
      investments: [],
      isLoading: true
    }
    useCompanyDetails.mockImplementation(() => response)
    setUp()

    expect(screen.getByRole('progressbar'))
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

    const errorMessage = screen.getByText('Invalid investment date')

    expect(errorMessage).toBeInTheDocument()
  })

  it('click on save with valid data should call service', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()
    fireEvent.click(screen.getByRole('button', { name: 'Add investments' }))

    fireEvent.change(screen.getByPlaceholderText('Investment date'), { target: { value: '2020-09' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    const message = screen.queryByText('Investment added successfully')

    expect(message).toBeInTheDocument()
  })

  it('click on save with valid data successful and close alert', () => {
    useCompanyDetails.mockImplementation(() => hookResponse)
    setUp()
    fireEvent.click(screen.getByRole('button', { name: 'Add investments' }))

    fireEvent.change(screen.getByPlaceholderText('Investment date'), { target: { value: '2020-09' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    const message = screen.queryByText('Investment added successfully')

    const closeMessage = screen.getByRole('button', { name: 'Close' })
    fireEvent.click(closeMessage)

    waitFor(() => { expect(message).not.toBeInTheDocument() })
  })

  it('click on save with valid data fail should show error', () => {
    useCompanyDetails.mockImplementation(() => ({ ...hookResponse, addInvestment: () => ADD_INVESTMENTS_RESPONSES.fail_response }))
    setUp()
    fireEvent.click(screen.getByRole('button', { name: 'Add investments' }))

    fireEvent.change(screen.getByPlaceholderText('Investment date'), { target: { value: '2020-09' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    const message = screen.queryByText("Can't add investment")

    expect(message).toBeInTheDocument()
    expect(hookResponse.setLoading).toHaveBeenCalled()
  })
})
