export const SAMPLECOMPANIES = [
  {
    id: '1',
    name: 'Sample company abc',
    sector: 'Application Software',
    vertical: 'Media',
    inves_profile_name: 'Private equity',
    size_cohort: '$100 million+',
    margin_group: 'High growth (30%-<50%)'
  },
  {
    id: '2',
    name: 'Sample company xyz',
    sector: 'Professional Services',
    inves_profile_name: 'Growth stage VC',
    size_cohort: '$100 million+',
    margin_group: 'Medium growth (10%-<30%)'
  }
]

export const COMPANIESDETAILS = {
  id: 'bd5db452-308f-4850-a39f-7081545b4ea0',
  name: 'Company A',
  sector: 'Application Software',
  vertical: 'Education',
  inves_profile_name: 'Invest Profile',
  is_public: true,
  size_cohort: 'NA',
  margin_group: 'NA',
  scenarios: {
    total: 2,
    metrics: [
      {
        scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
        scenario: 'Actuals',
        year: 2019,
        metric_id: '9cd20ace-79e1-426a-89ac-c8b92921a514',
        metric: 'Revenue',
        value: 124.844
      },
      {
        scenario_id: '02b8fc45-204c-450b-b4aa-525b35ad2323',
        scenario: 'Actuals',
        year: 2019,
        metric_id: '13563a52-76f7-46e0-89b4-f7eedcb45c31',
        metric: 'Ebitda',
        value: -24.107
      }
    ]
  }
}

export const SCENARIO = {
  company_id: 'bd5db452-308f-4850-a39f-7081545b4ea0',
  scenario: 'Actuals',
  year: 2021,
  metric: 'Revenue',
  value: 50
}
