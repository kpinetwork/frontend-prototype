import '@testing-library/jest-dom/extend-expect'
import { useTrackChanges } from '../../../../src/views/EditModify/Components/tracker'
import { DATA } from './../../../data/editModify'

const defaultProps = {
  changeObject: {},
  addObject: {},
  deleteObject: {},
  initialData: JSON.parse(JSON.stringify(DATA.body)),
  head: [...DATA.head]
}

const getTracker = (props) => {
  const { trackChange } = useTrackChanges({ ...props })
  return trackChange
}

describe('track changes', () => {
  it('should add new record to changeObject with description', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    const name = 'Company A changed'
    const expectedChange = { 123: { description: { name: name }, id: '123', scenarios: [] } }
    const trackChange = getTracker(props)

    trackChange(0, 1, name, 'name')

    expect(props.changeObject).toEqual(expectedChange)
  })

  it('should add new record to changeObject with scenario', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    const value = '4.36'
    const expectedChange = { 123: { description: {}, id: '123', scenarios: [{ metric_id: '1', value: value }] } }
    const trackChange = getTracker(props)

    trackChange(0, 5, '5.56', '')
    trackChange(0, 5, value, '')

    expect(props.changeObject).toEqual(expectedChange)
  })

  it('should add new record to deleteObject', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    const expectedDelete = { 123: { scenarios: [{ metric_id: '1', scenario_id: '1' }] } }
    const trackChange = getTracker(props)

    trackChange(0, 5, '', '')

    expect(props.deleteObject).toEqual(expectedDelete)
  })

  it('should add new record to addObject', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    props.initialData[0].scenarios[0] = {}
    const expectedAdd = {
      123: [
        {
          year: '2020',
          metric: 'Revenue',
          scenario: 'Actuals',
          company_id: '123',
          value: '23.45'
        }
      ]
    }
    const trackChange = getTracker(props)

    trackChange(0, 5, '2.67', '')
    trackChange(0, 5, '23.45', '')

    expect(props.addObject).toEqual(expectedAdd)
  })

  it('should add new record to deleteObject with previous data', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    const expectedDelete = { 123: { scenarios: [{ metric_id: '1', scenario_id: '1' }] } }
    const expectedChange = { 123: { id: '123', description: {}, scenarios: [] } }
    const trackChange = getTracker(props)

    trackChange(0, 5, '5.56', '')
    trackChange(0, 5, '', '')

    expect(props.deleteObject).toEqual(expectedDelete)
    expect(props.changeObject).toEqual(expectedChange)
  })

  it('should add new record to addObject with previous data', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    const expectedChange = { 123: { id: '123', description: {}, scenarios: [{ metric_id: '1', value: '5.56' }] } }
    const trackChange = getTracker(props)

    trackChange(0, 5, '', '')
    trackChange(0, 5, '5.56', '')

    expect(props.deleteObject).toEqual({ 123: { scenarios: [] } })
    expect(props.changeObject).toEqual(expectedChange)
  })

  it('should delete from change and delete objects data when value is initial', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    const expectedChange = { 123: { id: '123', description: {}, scenarios: [] } }
    const trackChange = getTracker(props)

    trackChange(0, 5, '', '')
    trackChange(0, 5, '4.56', '')
    trackChange(0, 6, '12.10', '')
    trackChange(0, 6, '11.1', '')

    expect(props.deleteObject).toEqual({ 123: { scenarios: [] } })
    expect(props.changeObject).toEqual(expectedChange)
  })

  it('should delete from add object data when value is initial', () => {
    const props = JSON.parse(JSON.stringify(defaultProps))
    props.initialData[0].scenarios[0] = {}
    const trackChange = getTracker(props)

    trackChange(0, 5, '4.56', '')
    trackChange(0, 5, '', '')

    expect(props.addObject).toEqual({ 123: [] })
  })
})
