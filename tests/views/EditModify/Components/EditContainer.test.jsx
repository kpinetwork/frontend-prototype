import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { useEditModify } from '../../../../src/hooks/useEditModify'
import EditPreviewContainer from '../../../../src/views/EditModify/Components/EditContainer'
import { useTrackChanges } from '../../../../src/views/EditModify/Components/tracker'
import { DATA } from './../../../data/editModify'

const editModifyHookResponse = {
  modifying: false,
  isLoading: false,
  body: [...DATA.body],
  head: [...DATA.head],
  initialData: [...DATA.body],
  edit: false,
  openErrorFormat: false,
  openResetModal: false,
  changeObject: {},
  addObject: {},
  deleteObject: {},
  errorObject: {
    0: [], 1: []
  },
  companies: [{ name: 'Company A' }, { name: 'Company B' }],
  filters: {
    names: [],
    sectors: [],
    verticals: [],
    investor_profiles: [],
    scenarios: []
  },
  errorMessage: null,
  setEdit: jest.fn(),
  resetData: jest.fn(),
  setErrorMessage: jest.fn(),
  setOpenResetModal: jest.fn(),
  setOpenErrorFormat: jest.fn(),
  updateEditData: jest.fn(),
  setFilters: jest.fn()
}

const trackHookResponse = {
  trackChange: jest.fn()
}

jest.mock('../../../../src/hooks/useEditModify')
jest.mock('../../../../src/views/EditModify/Components/tracker')

const setUp = () => {
  render(<EditPreviewContainer />)
}

describe('<EditPreviewContainer/>', () => {
  it('Should render component', () => {
    useEditModify.mockImplementation(() => editModifyHookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')

    expect(container).toBeInTheDocument()
  })

  it('Should call onCancel when cancel edit', () => {
    const hookResponse = { ...editModifyHookResponse, edit: true }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const cancel = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(cancel)

    expect(container).toBeInTheDocument()
    expect(hookResponse.setOpenErrorFormat).toHaveBeenCalled()
    expect(hookResponse.setOpenResetModal).toHaveBeenCalled()
    expect(hookResponse.setEdit).toHaveBeenCalled()
  })

  it('Should call onSend when save data', () => {
    const hookResponse = { ...editModifyHookResponse, edit: true }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const cancel = screen.getByRole('button', { name: 'Save Data' })
    fireEvent.click(cancel)

    expect(container).toBeInTheDocument()
    expect(hookResponse.updateEditData).toHaveBeenCalled()
  })

  it('Should open error snackbar', () => {
    const error = 'Test error'
    const hookResponse = { ...editModifyHookResponse, errorMessage: error }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const snackbar = screen.getByText(error)

    expect(container).toBeInTheDocument()
    expect(snackbar).toBeInTheDocument()
  })

  it('Should render loading circular progress', () => {
    const hookResponse = { ...editModifyHookResponse, isLoading: true, modifying: true }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const loading = screen.getByTestId('loading-progress')

    expect(container).toBeInTheDocument()
    expect(loading).toBeInTheDocument()
  })

  it('Should render reset modal', () => {
    const hookResponse = { ...editModifyHookResponse, openResetModal: true }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const okButton = screen.getByRole('button', { name: 'YES' })
    fireEvent.click(okButton)

    expect(container).toBeInTheDocument()
    expect(hookResponse.resetData).toHaveBeenCalled()
  })

  it('Should close reset modal', () => {
    const hookResponse = { ...editModifyHookResponse, openResetModal: true }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const cancelButton = screen.getByRole('button', { name: 'NO' })
    fireEvent.click(cancelButton)

    expect(container).toBeInTheDocument()
    expect(hookResponse.setOpenResetModal).toHaveBeenCalled()
  })

  it('Should close invalid formar modal', () => {
    const hookResponse = { ...editModifyHookResponse, openErrorFormat: true }
    useEditModify.mockImplementation(() => hookResponse)
    useTrackChanges.mockImplementation(() => trackHookResponse)
    setUp()

    const container = screen.getByTestId('edit-modify-container')
    const closeButton = screen.getByRole('button', { name: 'Close' })
    fireEvent.click(closeButton)

    expect(container).toBeInTheDocument()
    expect(hookResponse.setOpenErrorFormat).toHaveBeenCalled()
  })
})
