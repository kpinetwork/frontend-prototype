import { sortByKey } from '../../src/utils/sortSizeCohort'

const data = [
  {
    id: 1
  },
  {
    id: 3
  },
  {
    id: 2
  },
  {
    id: 2
  }
]

const orderedData = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 2
  },
  {
    id: 3
  }
]

describe('sort size by key', () => {
  it('function returns orderder array', async () => {
    const result = sortByKey(data, 'id')

    expect(result).toEqual(orderedData)
  })
})
