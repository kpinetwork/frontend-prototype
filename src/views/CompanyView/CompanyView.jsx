import React from 'react'
import { Grid } from '@material-ui/core'
import { CompanyCard } from './Components/CompanyCard'
import { DesciptionCard } from './Components/DescriptionCard'
import { ReportRuleGraph } from './Components/ReportRuleGraph'
import { useCompanyReport } from '../../hooks/useCompanyReport'
import { Filter } from '../UniverseView/Components/Filter/Filter'
import { SelectCompany } from './Components/SelectCompany'
export function CompanyView ({ params }) {
  const {
    description,
    financialProfile,
    ruleOf40,
    isLoading,
    setCompanyID,
    companyID,
    year,
    filters,
    setFilters
  } = useCompanyReport({ companyId: params?.companyId })
  return (
    <>
     <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SelectCompany
          companyList={ruleOf40}
          setCompanyID={setCompanyID}
          companyID={companyID}
          year={year} />
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} sm={8} lg={6}><ReportRuleGraph ruleOf40={ruleOf40}/></Grid>
          <Grid item xs={12} sm={4} lg={6}><Filter setFilters={setFilters} fillFilters={false} filters={filters}/></Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} sm={6} lg={6} xl={6}><DesciptionCard description={description} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={6} lg={6} xl={6}><CompanyCard financialProfile={financialProfile} isLoading={isLoading}/></Grid>
      </Grid>
    </>
  )
}
