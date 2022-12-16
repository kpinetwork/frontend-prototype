import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { DescriptionCard } from '../../../../src/views/CompanyView/Components/DescriptionCard'

const companyDescription = {
  name: '100',
  id: '100',
  inves_profile_name: 'Private equity',
  size_cohort: '$100 million+',
  margin_group: 'High growth (30%-<50%)'
}

const defaultProps = {
  isLoading: false
}

const setUp = (props) => {
  render(<DescriptionCard {...defaultProps} {...props}/>)
}

describe('<DescriptionCard />', () => {
  it('render correctly', () => {
    setUp({ description: companyDescription })

    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(Object.keys(companyDescription).length)
  })

  it('render when no description', () => {
    setUp()

    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.queryByRole('row')).not.toBeInTheDocument()
  })

  it('render when is loading', () => {
    setUp({ isLoading: true })

    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
