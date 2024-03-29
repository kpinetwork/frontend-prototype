import { tooltipTitles } from '../tooltipTitles'

export const METRICS = [
  {
    name: 'actuals_revenue',
    label: 'Revenue - actual',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.revenue} - actuals`
  },
  {
    name: 'actuals_cost_of_goods',
    label: 'Cost of goods - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_gross_profit',
    label: 'Gross profit - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_sales_marketing',
    label: 'Sales & marketing expenses - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_research_development',
    label: 'Research & development expenses - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_general_admin',
    label: 'General & administration expenses - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_other_operating_expenses',
    label: 'Other operating expenses - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_ebitda',
    label: 'Ebitda - actual',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.ebitda} - actuals`
  },
  {
    name: 'growth',
    label: 'Growth rate',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.growth
  },
  {
    name: 'gross_margin',
    label: 'Gross margin',
    symbol: '%',
    position: 'right',
    hoverText: null
  },
  {
    name: 'sales_and_marketing',
    label: 'Sales & marketing as percentage of revenue',
    symbol: '%',
    position: 'right',
    hoverText: null
  },
  {
    name: 'research_and_development',
    label: 'Research & development as a percentage of revenue',
    symbol: '%',
    position: 'right',
    hoverText: null
  },
  {
    name: 'general_and_admin',
    label: 'General & administration as a percentage of revenue',
    symbol: '%',
    position: 'right',
    hoverText: null
  },
  {
    name: 'opex_as_revenue',
    label: 'Opex as a percentage of revenue',
    symbol: '%',
    position: 'right',
    hoverText: null
  },
  {
    name: 'ebitda_margin',
    label: 'Ebitda margin',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.ebitda_margin
  },
  {
    name: 'rule_of_40',
    label: 'Rule of 40',
    symbol: '',
    position: '',
    hoverText: tooltipTitles.rule_of_40
  },
  {
    name: 'actuals_run_rate_revenue',
    label: 'Run rate revenue - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'revenue_per_employee',
    label: 'Revenue per employee',
    symbol: '$',
    position: 'left',
    hoverText: tooltipTitles.revenue_per_employee
  },
  {
    name: 'clv_cac_ratio',
    label: 'CLV/CAC ratio',
    symbol: '',
    position: 'right',
    hoverText: tooltipTitles.clv_cac_ratio
  },
  {
    name: 'actuals_customer_lifetime_value',
    label: 'CLV - actual',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.customer_lifetime_value} - actuals`
  },
  {
    name: 'cac_ratio',
    label: 'CAC ratio',
    symbol: '',
    position: 'right',
    hoverText: tooltipTitles.cac_ratio
  },
  {
    name: 'actuals_customer_acquition_costs',
    label: 'CAC - actual',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.customer_acquition_costs} - actuals`
  },
  {
    name: 'actuals_customer_annual_value',
    label: 'CAV - actual',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.customer_annual_value} - actuals`
  },
  {
    name: 'gross_retention',
    label: 'Gross retention',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.gross_retention
  },
  {
    name: 'actuals_losses_and_downgrades',
    label: 'Losses and downgrades - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'net_retention',
    label: 'Net retention',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.net_retention
  },
  {
    name: 'actuals_upsells',
    label: 'Upsells - actual',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'new_bookings_growth',
    label: 'New bookings growth',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.new_bookings_growth
  },
  {
    name: 'actuals_new_bookings',
    label: 'New bookings - actual',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.new_bookings} - actuals`
  },
  {
    name: 'actuals_headcount',
    label: 'Headcount - actual',
    symbol: '',
    position: 'left',
    hoverText: null
  },
  {
    name: 'actuals_cash_and_equivalents',
    label: 'Cash & equivalents - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_long_term_debt',
    label: 'Long term debt - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_equity_invested',
    label: 'Equity invested - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'actuals_cash_flow_operations',
    label: 'Cash flow operations - actual',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'debt_ebitda',
    label: 'Debt/ebitda ',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'budget_revenue',
    label: 'Revenue - budget',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.revenue} - budget`
  },
  {
    name: 'budget_cost_of_goods',
    label: 'Cost of goods - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_gross_profit',
    label: 'Gross profit - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_sales_marketing',
    label: 'Sales & marketing expenses - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_research_development',
    label: 'Research & development expenses - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_general_admin',
    label: 'General & administration expenses - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_other_operating_expenses',
    label: 'Other operating expenses - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_ebitda',
    label: 'Ebitda - budget',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.ebitda} - budget`
  },
  {
    name: 'budget_run_rate_revenue',
    label: 'Run rate revenue - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_customer_lifetime_value',
    label: 'CLV - budget',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.customer_lifetime_value} - budget`
  },
  {
    name: 'budget_customer_acquition_costs',
    label: 'CAC - budget',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.customer_acquition_costs} - budget`
  },
  {
    name: 'budget_customer_annual_value',
    label: 'CAV - budget',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.customer_annual_value} - budget`
  },
  {
    name: 'budget_losses_and_downgrades',
    label: 'Losses and downgrades - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_upsells',
    label: 'Upsells - budget',
    symbol: '$',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_new_bookings',
    label: 'New bookings - budget',
    symbol: '$',
    position: 'left',
    hoverText: `${tooltipTitles.new_bookings} - budget`
  },
  {
    name: 'budget_headcount',
    label: 'Headcount - budget',
    symbol: '',
    position: 'left',
    hoverText: null
  },
  {
    name: 'budget_cash_and_equivalents',
    label: 'Cash & equivalents - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_long_term_debt',
    label: 'Long term debt - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_equity_invested',
    label: 'Equity invested - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'budget_cash_flow_operations',
    label: 'Cash flow operations - budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'revenue_vs_budget',
    label: 'Revenue vs budget',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.revenue_vs_budget
  },
  {
    name: 'ebitda_vs_budget',
    label: 'Ebitda vs budget',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.ebitda_vs_budget
  }
]

export const BY_YEAR_METRICS = [
  {
    name: 'revenue',
    label: 'Revenue',
    symbol: '$',
    position: 'left',
    hoverText: tooltipTitles.revenue
  },
  {
    name: 'growth',
    label: 'Growth',
    symbol: '%',
    position: 'right',
    hoverText: tooltipTitles.growth
  },
  {
    name: 'gross_profit',
    label: 'Gross Profit',
    symbol: '$',
    position: 'left',
    hoverText: null
  }
]

export const BASEMETRICS = [
  {
    name: 'Revenue',
    tableName: 'revenue',
    symbol: '$',
    position: 'left',
    hoverText: tooltipTitles.revenue
  },
  {
    name: 'Ebitda',
    tableName: 'ebitda',
    symbol: '$',
    position: 'left',
    hoverText: tooltipTitles.ebitda
  },
  {
    name: 'General & administration',
    tableName: 'general_admin',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Research & development',
    tableName: 'research_development',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Sales & marketing',
    tableName: 'sales_marketing',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Cost of goods',
    tableName: 'cost_of_goods',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Headcount',
    tableName: 'headcount',
    symbol: '',
    position: 'left'
  },
  {
    name: 'CLV',
    tableName: 'customer_lifetime_value',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'CAC',
    tableName: 'customer_acquition_costs',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'CAV',
    tableName: 'customer_annual_value',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Other operating expenses',
    tableName: 'other_operating_expenses',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Run rate revenue',
    tableName: 'run_rate_revenue',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Losses and downgrades',
    tableName: 'losses_and_downgrades',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Upsells',
    tableName: 'upsells',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'New bookings',
    tableName: 'new_bookings',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Cash & Equivalents',
    tableName: 'cash_and_equivalents',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Long term debt',
    tableName: 'long_term_debt',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Equity invested',
    tableName: 'equity_invested',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Cash flow from operations',
    tableName: 'cash_flow_operations',
    symbol: '$',
    position: 'left'
  }
]

export const BASE_SCENARIOS = [
  'Actuals', 'Budget'
]

export const QUARTERSEXCLUDEDMETRICS = [
  {
    name: 'Revenue vs budget',
    tableName: 'revenue_vs_budget',
    symbol: '$',
    position: 'left'
  },
  {
    name: 'Ebitda vs budget',
    tableName: 'ebitda_vs_budget',
    symbol: '$',
    position: 'left'
  }
]

export const CALCULATEDMETRICS = [{
  name: 'Revenue per employee',
  tableName: 'revenue_per_employee',
  symbol: '$',
  position: 'left'
},
{
  name: 'Gross profit',
  tableName: 'gross_profit',
  symbol: '$',
  position: 'left'
}]

export const QUARTERSADITIONALMETRICS = [
  {
    name: 'Growth rate',
    tableName: 'growth',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'Gross margin',
    tableName: 'gross_margin',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'Opex as percentage of revenue',
    tableName: 'opex_as_revenue',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'Ebitda margin',
    tableName: 'ebitda_margin',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'Rule of 40',
    tableName: 'rule_of_40',
    symbol: '',
    position: 'left'
  },
  {
    name: 'CLV/CAC ratio',
    tableName: 'clv_cac_ratio',
    symbol: '',
    position: 'left'
  },
  {
    name: 'CAC ratio',
    tableName: 'cac_ratio',
    symbol: '',
    position: 'left'
  },
  {
    name: 'Gross retention',
    tableName: 'gross_retention',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'Net retention',
    tableName: 'net_retention',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'New bookings growth',
    tableName: 'new_bookings_growth',
    symbol: '%',
    position: 'right'
  },
  {
    name: 'Debt / Ebitda',
    tableName: 'debt_ebitda',
    symbol: '%',
    position: 'right'
  }
]
export const TOTALMETRICS = BASEMETRICS.concat(QUARTERSADITIONALMETRICS).concat(CALCULATEDMETRICS).filter(metric => metric.name !== 'Headcount')

export const METRIC_PERIOD_NAMES = [
  { name: 'Q1', label: 'Q1' },
  { name: 'Q2', label: 'Q2' },
  { name: 'Q3', label: 'Q3' },
  { name: 'Q4', label: 'Q4' },
  { name: 'Full-year', label: 'Full year' }
]
