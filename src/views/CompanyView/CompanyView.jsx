import React from 'react'
import { Grid } from '@material-ui/core'
import { CompanyCard } from './Components/CompanyCard'
import { DesciptionCard } from './Components/DescriptionCard'
import { ReportRuleGraph } from './Components/ReportRuleGraph'
import { useCompanyReport } from '../../hooks/useCompanyReport'
import { SelectCompany } from './Components/SelectCompany'
export function CompanyView ({ params }) {
  const { description, financialProfile, ruleOf40, isLoading, companyList, setCompany, year } = useCompanyReport({ companyId: params?.companyId })
  return (
    <>
     <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}><SelectCompany companyList={companyList} setCompany={setCompany} year={year}/></Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} sm={8} lg={12} xl={12}><ReportRuleGraph ruleOf40={ruleOf40}/></Grid>
          <Grid item xs={12} sm={4} lg={6} xl={6}><DesciptionCard description={description} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={4} lg={6} xl={6}><CompanyCard financialProfile={financialProfile} isLoading={isLoading}/></Grid>
      </Grid>
    </>
  )
}
