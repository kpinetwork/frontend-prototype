import React from 'react'
import { Grid } from '@material-ui/core'
import { CompanyCard } from './Components/CompanyCard'
import { DesciptionCard } from './Components/DescriptionCard'
import { ReportRuleGraph } from './Components/ReportRuleGraph'
import { useCompanyReport } from '../../hooks/useCompanyReport'
import { useComparisonPeers } from '../../hooks/useComparisionPeers'
import { Filter } from '../../components/Filter/Filter'
import { Information } from '../../components/HeaderInformation'
import { SelectCompany } from './Components/SelectCompany'
import { ComparisonView } from './../ComparisonView/ComparisonView'

export function CompanyView ({ params }) {
  const {
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
  } = useCompanyReport({ companyId: params?.companyId })
  const {
    companyComparison,
    peersComparison,
    ruleOf40,
    peersIsLoading,
    downloadComparisonCsv
  } = useComparisonPeers({ fromUniverseOverview: false })

  return (
    <>
     <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}><Information year={year} setYear={setYear}/></Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <SelectCompany
          companyList={publicCompanies}
          setCompanyID={setCompanyID}
          companyID={companyID}
          year={year} />
        </Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} sm={8} lg={6}><ReportRuleGraph ruleOf40={ruleOf40}/></Grid>
          <Grid item xs={12} sm={4} lg={6}><Filter setFilters={setFilters} fillFilters={false} filters={filters} xs={12} sm={10} md ={10} lg={6} xl={4}/></Grid>
      </Grid>
      <Grid container>
          <Grid item xs={12} sm={6} lg={6} xl={6}><DesciptionCard description={description} isLoading={isLoading}/></Grid>
          <Grid item xs={12} sm={6} lg={6} xl={6}><CompanyCard financialProfile={financialProfile} isLoading={isLoading}/></Grid>
      </Grid>
      <Grid>
        <ComparisonView params={params}
          companyComparison={companyComparison}
          peersComparison={peersComparison}
          isLoading={peersIsLoading}
          downloadComparisonCsv={downloadComparisonCsv}
        />
      </Grid>
    </>
  )
}
