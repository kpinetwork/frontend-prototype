import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, getByRole, waitFor } from '@testing-library/react'
import { InvestmentReport } from '../../../src/views/Reports/InvestmentReport'
import userEvent from '@testing-library/user-event'

const companies = [
  {
    id: '123',
    name: 'Sample Company',
    metrics: {
      2020: 14,
      2021: 8,
      2022: 18
    }
  },
  {
    id: '122',
    name: 'Test Company',
    metrics: {
      2019: 45,
      2021: 34,
      2022: 158
    }
  }
]

const defaultProps = {
  fromUniverseOverview: true
}

const setUp = (props) => {
  render(<InvestmentReport {...defaultProps} {...props}/>)
}

jest.mock('../../../src/hooks/useMetricReport')

describe('<InvestmenteReport />', () => {
  describe('render', () => {
    it('should render', () => {
      setUp()
      screen.debug()
    })
  })
})
