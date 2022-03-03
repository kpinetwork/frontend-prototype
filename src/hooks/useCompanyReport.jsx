import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import Context from '../context/appContext'
import { getCompanyReportFromQueryParams } from '../service/companyReport'
import { getPublicCompanies } from '../service/company'

export const useCompanyReport = ({ companyId }) => {
  // eslint-disable-next-line no-unused-vars
  const [companyParams, _] = useState(companyId)
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const { filters, setFilters, year, setYear, companyID, setCompanyID } = useContext(Context).filterFields
  const [description, setDescription] = useState(null)
  const [financialProfile, setFinancialProfile] = useState(null)
  const [ruleOf40, setRuleOf40] = useState([])
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getCompanies()
    if (companyParams && companyParams !== 'undefined' && companyParams === companyID) {
      setIsLoading(true)
      getCompanyReport({ company_id: companyParams, year, ...filters })
    } else {
      setIsLoading(false)
      getCompanyReport({ company_id: companyID, year, ...filters })
      setLocation(`/company-report/${companyID}`)
    }
  }, [filters, year, companyID])

  const getCompanies = async () => {
    try {
      const result = await getPublicCompanies()
      setCompanies(result)
    } catch (_error) {
      setCompanies([])
    }
  }

  const getCompanyReport = async (options) => {
    const result = await getCompanyReportFromQueryParams(options)
    const {
      descriptionArray,
      financialProfileArray,
      ruleOf40Array
    } = destructuring(result)
    setDescription(descriptionArray)
    setFinancialProfile(financialProfileArray)
    setRuleOf40(ruleOf40Array)
    setIsLoading(false)
  }

  return {
    description,
    companies,
    financialProfile,
    ruleOf40,
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
    financial_profile: financialProfileArray,
    rule_of_40: ruleOf40Array
  } = result
  return {
    descriptionArray,
    financialProfileArray,
    ruleOf40Array
  }
}
