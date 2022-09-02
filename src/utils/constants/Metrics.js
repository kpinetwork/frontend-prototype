export const METRICS = [
  {
    name: 'actuals_revenue',
    label: 'Revenue - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_cost_of_goods',
    label: 'Cost of goods - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_gross_profit',
    label: 'Gross profit - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_sales_marketing',
    label: 'Sales & marketing expenses - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_research_development',
    label: 'Research & development expenses - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_general_admin',
    label: 'General & administration expenses - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_ebitda',
    label: 'Ebitda - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_customer_lifetime_value',
    label: 'CLV - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_customer_acquition_costs',
    label: 'CAC - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_customer_annual_value',
    label: 'CAV - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_run_rate_revenue',
    label: 'Run rate revenue - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_headcount',
    label: 'Headcount - actual',
    symbol: '',
    position: 'left'
  },
  {
    name: 'actuals_losses_and_downgrades',
    label: 'Losses and downgrades - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_upsells',
    label: 'Upsells - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_new_bookings',
    label: 'New bookings - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_revenue',
    label: 'Revenue - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_gross_profit',
    label: 'Gross profit - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_sales_marketing',
    label: 'Sales & marketing expenses - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_research_development',
    label: 'Research & development expenses - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_general_admin',
    label: 'General & administration expenses - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_ebitda',
    label: 'Ebitda - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_customer_lifetime_value',
    label: 'CLV - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_customer_acquition_costs',
    label: 'CAC - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_customer_annual_value',
    label: 'CAV - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_run_rate_revenue',
    label: 'Run rate revenue - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_headcount',
    label: 'Headcount - budget',
    symbol: '',
    position: 'left'
  },
  {
    name: 'budget_losses_and_downgrades',
    label: 'Losses and downgrades - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_upsells',
    label: 'Upsells - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_new_bookings',
    label: 'New bookings - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'growth',
    label: 'Growth rate',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'gross_margin',
    label: 'Gross margin',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'sales_and_marketing',
    label: 'Sales & marketing as percentage of revenue',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'research_and_development',
    label: 'Research & development as a percentage of revenue',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'general_and_admin',
    label: 'General & administration as a percentage of revenue',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'revenue_vs_budget',
    label: 'Revenue vs budget',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'ebitda_vs_budget',
    label: 'Ebitda vs budget',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'ebitda_margin',
    label: 'Ebitda margin',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'rule_of_40',
    label: 'Rule of 40',
    symbol: '',
    position: ''
  },
  {
    name: 'clv_cac_ratio',
    label: 'CLV/CAC ratio',
    symbol: '',
    position: 'right'
  },
  {
    name: 'cac_ratio',
    label: 'CAC ratio',
    symbol: '',
    position: 'right'
  },
  {
    name: 'opex_as_revenue',
    label: 'Opex as a percentage of revenue',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'revenue_per_employee',
    label: 'Revenue per employee',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'gross_retention',
    label: 'Gross retention',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'net_retention',
    label: 'Net retention',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'new_bookings_growth',
    label: 'New bookings growth',
    symbol: '%',
    position: 'right'
  }
]

export const BY_YEAR_METRICS = [
  {
    name: 'revenue',
    label: 'Revenue',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'growth',
    label: 'Growth',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'gross_profit',
    label: 'Gross Profit',
    symbol: '$',
    position: 'left'
  }
]

export const BASEMETRICS = [
  {
    name: 'Revenue',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Ebitda',
    symbol: '$',
    position: 'left'
  }
]

export const BASE_SCENARIOS = [
  'Actuals', 'Budget'
]
