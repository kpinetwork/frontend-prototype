import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ComparisonView } from '../../../src/views/ComparisonView/ComparisonView'

const company = {
  id: '123',
  name: 'Sample Company',
  sector: 'Online media',
  vertical: 'Education',
  size_cohort: '$50-$100 million',
  margin_group: 'Low growth (0-<10%)',
  revenue: 70,
  revenue_vs_budget: 109,
  rule_of_40: 80,
  growth: 55,
  ebitda_margin: 90,
  ebitda_vs_budget: 108
}

const defaultProps = {
  companyComparison: company,
  peersComparison: [company],
  isLoading: false,
  downloadComparisonCsv: jest.fn(),
  fromUniverseOverview: true,
  typeOfSelector: 'calendar'

}

jest.mock('file-saver', () => ({ saveAs: jest.fn() }))

const setUp = (props) => {
  render(<ComparisonView {...defaultProps} {...props}/>)
}

describe('<CompanyCard />', () => {
  describe('render', () => {
    it('render correctly', () => {
      setUp()

      const companyRow = screen.getByRole('row', { name: 'Sample Company Online media Education $ 70 55 % 90 % 109 % 108 % 80' })

      expect(screen.getByText('Export CSV')).toBeInTheDocument()
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(2)
      expect(companyRow).toBeInTheDocument()
    })

    it('render when no peersComparison', () => {
      setUp({ peersComparison: null })

      expect(screen.getByText('Export CSV')).toBeInTheDocument()
      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })

    it('render metric value with NA if doesnt exist from company report', () => {
      setUp({
        peersComparison: [{
          ...company,
          growth: null,
          revenue: 'NA'
        }],
        fromUniverseOverview: false
      })

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getAllByRole('cell', { name: 'NA' })).toHaveLength(2)
    })

    it('render company metric values with NA or null', () => {
      setUp({
        companyComparison: {
          ...company,
          growth: null,
          revenue: 'NA'
        },
        fromUniverseOverview: false
      })

      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('render when company comparison is null', () => {
      setUp({
        companyComparison: null,
        fromUniverseOverview: false
      })

      expect(screen.getByRole('table')).toBeInTheDocument()
    })

    it('render metric value when is not numeric and not NA or null', () => {
      setUp({
        peersComparison: [{
          ...company,
          growth: null,
          rule_of_40: null,
          revenue: '$50-$100 million'
        }],
        fromUniverseOverview: false
      })

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.getByRole('cell', { name: '$50-$100 million' })).toBeInTheDocument()
    })

    it('render when typeOfSelector is investor', () => {
      setUp({
        typeOfSelector: 'investor'
      })

      expect(screen.getByRole('table')).toBeInTheDocument()
      expect(screen.queryByText('Export CSV')).not.toBeInTheDocument()
    })
  })

  describe('actions', () => {
    it('click on Export CSV', () => {
      setUp()
      const exportButton = screen.getByText('Export CSV')
      waitFor(() => {
        fireEvent.click(exportButton)
      })

      expect(defaultProps.downloadComparisonCsv).toHaveBeenCalled()
    })
  })

  it('render when isLoading', () => {
    setUp({ isLoading: true })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
