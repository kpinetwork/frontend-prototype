import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Context from '../context/appContext'
import { getCompanyReportFromQueryParams } from '../service/companyReport'
import { getPublicCompanies } from '../service/company'

export const useCompanyReport = () => {
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

    return () => {
      setPublicCompanies([])
      setDefaultValues()
    }
  }, [filters, year, companyID])

  const setDefaultValues = () => {
    setDescription(null)
    setFinancialProfile(null)
    setIsLoading(false)
  }

  const getCompanies = async () => {
    try {
      const result = await getPublicCompanies({})
      setPublicCompanies(result.companies)
    } catch (_error) {
      setPublicCompanies([])
    }
  }

  const getCompanyReport = async (options) => {
    try {
      const result = await getCompanyReportFromQueryParams(options)
      const {
        descriptionArray,
        financialProfileArray
      } = destructuring(result)
      setDescription(descriptionArray)
      setFinancialProfile(financialProfileArray)
      setIsLoading(false)
    } catch (_error) {
      setDefaultValues()
    }
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
