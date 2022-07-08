import { useContext, useState, useEffect } from 'react'
import { getCompanyDetails, getCompanyInvestments, addCompanyInvestment, deleteCompany } from '../service/companyDetails'
import Context from '../context/appContext'

const useCompanyDetails = () => {
  const { selectedCompanyID, setSelectedCompanyID } = useContext(Context).company
  const [company, setCompany] = useState({})
  const [investments, setInvestments] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [openDeleted, setOpenDeleted] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [deleteInProgress, setDeleteInProgress] = useState(false)

  useEffect(() => {
    getCompanyData()
    getInvestments()
  }, [])

  const getCompanyData = async () => {
    try {
      setLoading(true)
      const response = await getCompanyDetails({ selectedCompanyID })
      const companyDetails = destructuringCompany(response)
      setCompany(companyDetails)
      return response.scenarios.metrics
    } catch (_error) {
      setCompany({})
      setLoading(false)
    }
  }

  const getInvestments = async () => {
    try {
      setLoading(true)
      const response = await getCompanyInvestments(selectedCompanyID)
      setInvestments(response)
      setLoading(false)
    } catch (_error) {
      setInvestments([])
      setLoading(false)
    }
  }

  const addInvestment = async (investment) => {
    try {
      setLoading(true)
      const response = await addCompanyInvestment(selectedCompanyID, investment)
      await getInvestments()
      return response.added
    } catch (_error) {
      setLoading(false)
      return false
    }
  }

  const deleteCompanyInformation = async () => {
    setDeleteInProgress(true)
    try {
      const response = await deleteCompany(selectedCompanyID)
      setOpenDeleted(false)
      setDeleteInProgress(false)
      if (response.deleted) {
        setSelectedCompanyID(undefined)
      } else {
        throw new Error('Fail to delete company')
      }
    } catch (_error) {
      setDeleteInProgress(false)
      setOpenDeleted(false)
      setErrorMessage('Can not delete company, try again.')
    }
  }

  return {
    company,
    openDeleted,
    errorMessage,
    investments,
    isLoading,
    deleteInProgress,
    deleteCompanyInformation,
    setErrorMessage,
    setOpenDeleted,
    getInvestments,
    addInvestment
  }
}

export default useCompanyDetails

function destructuringCompany (result) {
  const {
    id,
    name,
    sector,
    vertical,
    inves_profile_name: investorProfile
  } = result
  return {
    id,
    name,
    sector,
    vertical,
    investorProfile
  }
}
