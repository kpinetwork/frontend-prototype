import { useContext, useState, useEffect } from 'react'
import { getCompanyInvestments, addCompanyInvestment } from '../service/companyDetails'
import Context from '../context/appContext'

const useCompanyDetails = () => {
  const { selectedCompanyID } = useContext(Context).company
  const [investments, setInvestments] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getInvestments()
  }, [])

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
    getInvestments,
    addInvestment,
    investments,
    isLoading
  }
}

export default useCompanyDetails
