import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import FilterContext from '../context/filterContext'
import { getCompanyReportFromQueryParams } from '../service/companyReport'

export const useCompanyReport = ({ companyId }) => {
  // eslint-disable-next-line no-unused-vars
  const [companyParams, _] = useState(companyId)
  // eslint-disable-next-line no-unused-vars
  const [__, setLocation] = useLocation()
  const { filters, year, companyID, setCompanyID } = useContext(FilterContext)
  const [description, setDescription] = useState(null)
  const [financialProfile, setFinancialProfile] = useState(null)
  const [ruleOf40, setRuleOf40] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (companyParams) {
      setIsLoading(true)
      getCompanyReport({ company_id: companyParams, year, ...filters })
    } else {
      setIsLoading(false)
      getCompanyReport({ company_id: companyID, year, ...filters })
      setLocation(`/company-report/${companyID}`)
    }
  }, [filters, year, companyID])

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
    financialProfile,
    ruleOf40,
    isLoading,
    setCompanyID,
    companyID,
    year
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
