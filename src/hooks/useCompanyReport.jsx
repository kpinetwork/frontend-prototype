import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import FilterContext from '../context/filterContext'
import { getCompanyReportFromQueryParams } from '../service/companyReport'

export const useCompanyReport = ({ companyId }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, setLocation] = useLocation()
  const { filters, year, companyList } = useContext(FilterContext)
  const [description, setDescription] = useState(null)
  const [financialProfile, setFinancialProfile] = useState(null)
  const [ruleOf40, setRuleOf40] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [company, setCompany] = useState(companyId)

  useEffect(() => {
    // console.log(company, filters, year, companyList)
    setIsLoading(true)
    getCompanyReport({ company_id: company, year: year, ...filters })
    if (company) { setLocation(`/company-report/${company}`) }
  }, [filters, year, company])

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
    companyList,
    setCompany,
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
