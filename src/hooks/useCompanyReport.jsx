import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Context from '../context/appContext'
import { getCompanyReportFromQueryParams } from '../service/companyReport'
import { getPublicCompanies } from '../service/company'

export const useCompanyReport = ({ companyId }) => {
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const { filters, setFilters, year, setYear, companyID, setCompanyID } = useContext(Context).filterFields
  const [description, setDescription] = useState(null)
  const [financialProfile, setFinancialProfile] = useState(null)
  const [publicCompanies, setPublicCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getCompanies()
    if (companyID) {
      setIsLoading(true)
      getCompanyReport({ company_id: companyID, year, ...filters })
      setLocation(`/company-report/${companyID}`)
    }
  }, [filters, year, companyID])

  const getCompanies = async () => {
    try {
      const result = await getPublicCompanies({})
      setPublicCompanies(result.companies)
    } catch (_error) {
      setPublicCompanies([])
    }
  }

  const getCompanyReport = async (options) => {
    const result = await getCompanyReportFromQueryParams(options)
    const {
      descriptionArray,
      financialProfileArray
    } = destructuring(result)
    setDescription(descriptionArray)
    setFinancialProfile(financialProfileArray)
    setIsLoading(false)
  }

  return {
    description,
    publicCompanies,
    financialProfile,
    isLoading,
    setCompanyID,
    companyID,
    year,
    setYear,
    filters,
    setFilters
  }
}

function destructuring (result) {
  const {
    description: descriptionArray,
    financial_profile: financialProfileArray
  } = result
  return {
    descriptionArray,
    financialProfileArray
  }
}
