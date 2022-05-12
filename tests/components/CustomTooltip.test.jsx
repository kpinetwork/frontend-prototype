import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomTooltipTitle from '../../src/components/CustomTooltip'

const name = 'Custom name'
const title = 'Tooltip open!'
const setUp = (props) => {
  const { container } = render(<CustomTooltipTitle {...props} />)
  return container
}

describe('<CustomTooltipTitle />', () => {
  it('show tooltip title when mouse over', async () => {
    const container = setUp({ name, title })
    const icon = container.querySelector('[aria-hidden="true"')

    fireEvent.mouseOver(icon)
    const tooltip = await screen.findByText(title)

    expect(tooltip).toBeInTheDocument()
  })

  it('show tooltip icon with custom color icon', async () => {
    const customColor = 'black'
    const container = setUp({ name, title, customColor })

    const icon = container.querySelector('[aria-hidden="true"')

    expect(icon).toHaveStyle(`color: ${customColor}; font-size: 18px`)
  })

  it('show tooltip icon with custom styles', async () => {
    const variant = 'body1'
    setUp({ name, title, variant, justifyContent: 'start' })

    const nameElement = screen.getByText(name)

    expect(nameElement.className.includes(variant)).toBeTruthy()
  })
})
