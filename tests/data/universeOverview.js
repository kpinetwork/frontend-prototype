export const KPI_AVERAGE = [{ growth: '13' }, { ebitda_margin: '8' }, { rule_of_40: '-9' }]

export const COUNT_BY_SIZE = [
  { size_cohort: '$30-<$50 million', count: 15 },
  { size_cohort: '$50-<$100 million', count: 20 },
  { size_cohort: '$10-<$30 million', count: 6 },
  { size_cohort: '$100 million+', count: 11 },
  { size_cohort: '<$10 million', count: 2 }
]

export const GROWTH_AND_MARGIN = {
  '$10-<$30 million': { size_cohort: '$10-<$30 million', growth: '90', margin: '17.90' },
  '$30-<$50 million': { size_cohort: '$30-<$50 million', growth: '76', margin: '65' },
  '$50-<$100 million': { size_cohort: '$50-<$100 million', growth: '67', margin: '55' },
  '$100 million+': { size_cohort: '$100 million+', growth: '34', margin: '43' },
  '<$10 million': { size_cohort: '<$10 million', growth: '65', margin: '76' }
}

export const EXP_GROWTH_AND_MARGIN = {
  '$10-<$30 million': { size_cohort: '$10-<$30 million', growth: '90', margin: '17.90' },
  '$30-<$50 million': { size_cohort: '$30-<$50 million', growth: '76', margin: '65' },
  '$50-<$100 million': { size_cohort: '$50-<$100 million', growth: '67', margin: '55' },
  '$100 million+': { size_cohort: '$100 million+', growth: '34', margin: '43' },
  '<$10 million': { size_cohort: '<$10 million', growth: '65', margin: '76' }
}

export const REVENUE_AND_EBITDA = {
  '$10-<$30 million': { size_cohort: '$10-<$30 million', revenue: '90', ebitda: '17.90' },
  '$30-<$50 million': { size_cohort: '$30-<$50 million', revenue: '76', ebitda: '65' },
  '$50-<$100 million': { size_cohort: '$50-<$100 million', revenue: '67', ebitda: '55' },
  '$100 million+': { size_cohort: '$100 million+', revenue: '34', ebitda: '43' },
  '<$10 million': { size_cohort: '<$10 million', revenue: '65', ebitda: '76' }
}
