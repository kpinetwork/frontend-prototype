import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { AdminPanelContainer } from '../../../src/views/AdminPanel/AdminPanelContainer'

const defaultProps = {
  initialTab: 'users'
}
const setUp = (props) => {
  render(
    <AdminPanelContainer {...defaultProps} {...props}/>
  )
}

describe('<AdminPanelContainer />', () => {
  it('should render AdminPanelContainer', () => {
    setUp()

    const tabs = screen.getAllByRole('tab')
    const usersTab = screen.getByText('Users')
    const companiesTab = screen.getByText('Companies')
    const importDataTab = screen.getByText('Import Data')
    const editTab = screen.getByText('Edit Modify')
    const tagsTab = screen.getByText('Tags')
    const rangesTab = screen.getByText('Ranges')

    expect(tabs).toHaveLength(6)
    expect(usersTab).toBeInTheDocument()
    expect(companiesTab).toBeInTheDocument()
    expect(importDataTab).toBeInTheDocument()
    expect(editTab).toBeInTheDocument()
    expect(tagsTab).toBeInTheDocument()
    expect(rangesTab).toBeInTheDocument()
  })

  it('should render AdminPanelContainer when there is no initial Tab', () => {
    setUp({ initialTab: null })

    const tabs = screen.getAllByRole('tab')
    const usersTab = screen.getByText('Users')
    const companiesTab = screen.getByText('Companies')
    const importDataTab = screen.getByText('Import Data')
    const editTab = screen.getByText('Edit Modify')
    const tagsTab = screen.getByText('Tags')
    const rangesTab = screen.getByText('Ranges')

    expect(tabs).toHaveLength(6)
    expect(usersTab).toBeInTheDocument()
    expect(companiesTab).toBeInTheDocument()
    expect(importDataTab).toBeInTheDocument()
    expect(editTab).toBeInTheDocument()
    expect(tagsTab).toBeInTheDocument()
    expect(rangesTab).toBeInTheDocument()
  })
})
