import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { CompanyDetailsCard } from '../../../../src/views/CompanyDetailsPanelView/Components/CompanyDetailsCard'
import useCompanyDetails from '../../../../src/hooks/useCompanyDetails'
import Context from '../../../../src/context/appContext'

const setUp = (id) => {
  render(
    <Context.Provider value={{ company: { selectedCompanyID: id } }}>
      <CompanyDetailsCard />
    </Context.Provider>
  )
}

jest.mock('../../../../src/hooks/useCompanyDetails')

const companyDetailshookResponse = {
  company: {
    id: '132',
    name: 'Sample Company',
    sector: 'Education',
    vertical: 'Education',
    investorProfile: 'Public'
  },
  deleteInProgress: false,
  deleteCompanyInformation: jest.fn(),
  errorMessage: null,
  setErrorMessage: jest.fn(),
  openDeleted: false,
  setOpenDeleted: jest.fn()
}

describe('<CompanyDetailCard />', () => {
  it('should render', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    setUp('123')

    const companyCell = screen.getByText('Sample Company')
    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    expect(companyCell).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  })

  it('should call open modal to confirm delete action', () => {
    useCompanyDetails.mockImplementation(() => companyDetailshookResponse)
    setUp('123')
    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    fireEvent.click(deleteButton)

    expect(companyDetailshookResponse.setOpenDeleted).toHaveBeenCalled()
  })

  it('should call delete company function when user confirms', () => {
    const hook = { ...companyDetailshookResponse, openDeleted: true }
    useCompanyDetails.mockImplementation(() => hook)
    setUp('123')
    const confirmButton = screen.getByRole('button', { name: 'Yes' })

    fireEvent.click(confirmButton)

    expect(hook.deleteCompanyInformation).toHaveBeenCalled()
  })

  it('should call close delete modal when user cancels', () => {
    const hook = { ...companyDetailshookResponse, openDeleted: true }
    useCompanyDetails.mockImplementation(() => hook)
    setUp('123')
    const cancelButton = screen.getByRole('button', { name: 'No' })

    fireEvent.click(cancelButton)

    expect(hook.setOpenDeleted).toHaveBeenCalled()
  })

  it('should call close delete modal when user cancels', () => {
    const hook = { ...companyDetailshookResponse, openDeleted: true }
    useCompanyDetails.mockImplementation(() => hook)
    setUp('123')
    const cancelButton = screen.getByRole('button', { name: 'No' })

    fireEvent.click(cancelButton)

    expect(hook.setOpenDeleted).toHaveBeenCalled()
  })

  it('should call set error message when snackbar is closed', async () => {
    const hook = { ...companyDetailshookResponse, errorMessage: 'Test error' }
    useCompanyDetails.mockImplementation(() => hook)
    setUp('123')

    await new Promise(function (resolve) { setTimeout(resolve, 1000) })

    expect(hook.setErrorMessage).toHaveBeenCalled()
  })
})
