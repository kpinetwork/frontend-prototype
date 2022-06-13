import { useContext, useState, useEffect } from 'react'
import { getCompanyDetails, getCompanyInvestments, addCompanyInvestment } from '../service/companyDetails'
import Context from '../context/appContext'

const useCompanyDetails = () => {
  const { selectedCompanyID } = useContext(Context).company
  const [company, setCompany] = useState({})
  const [scenarios, setScenarios] = useState([])
  const [totalScenarios, setTotalScenarios] = useState(0)
  const [investments, setInvestments] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getCompany()
    getInvestments()
  }, [])

  const getCompany = async () => {
    try {
      setLoading(true)
      const response = await getCompanyDetails(selectedCompanyID)
      const companyDetails = destructuringCompany(response)
      setCompany(companyDetails)
      setScenarios(response.scenarios.metrics)
      setTotalScenarios(response.scenarios.total)
    } catch (_error) {
      setCompany({})
      setScenarios([])
      setTotalScenarios(0)
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

  return {
    company,
    scenarios,
    totalScenarios,
    getInvestments,
    addInvestment,
    investments,
    isLoading
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
