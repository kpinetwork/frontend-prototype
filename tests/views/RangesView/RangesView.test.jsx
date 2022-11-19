import React from 'react'
import { Auth } from 'aws-amplify'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { RangesView } from '../../../src/views/RangesView/RangesView'
import useMetricRanges from '../../../src/hooks/useMetricRanges'
import { DATA } from '../../data/ranges'

jest.mock('../../../src/hooks/useMetricRanges')

jest.spyOn(Auth, 'currentAuthenticatedUser').mockReturnValue({
  getAccessToken: () => ({
    getJwtToken: () => ('Secret-Token')
  })
})

const hookResponse = {
  page: 0,
  total: DATA.total,
  metrics: ['Revenue', 'Ebitda'],
  pageSize: 10,
  isLoading: false,
  allMetricRanges: DATA.ranges,
  metricSelected: null,
  metricRanges: [{ id: '1', max_value: 20, min_value: 10 }],
  handleChangePage: jest.fn(),
  setMetricSelected: jest.fn(),
  handleChangePageSize: jest.fn(),
  getRangesBySpecificMetric: jest.fn()
}

const setUp = () => {
  render(
      <RangesView />
  )
}

describe('<RangesView />', () => {
  describe('render', () => {
    it('Should render ranges view components', async () => {
      useMetricRanges.mockImplementation(() => hookResponse)
      setUp()

      const table = screen.getByRole('table')

      expect(table).toBeInTheDocument()
    })
  })
})
