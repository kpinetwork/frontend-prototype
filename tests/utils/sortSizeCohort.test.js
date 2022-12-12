import { sortByKey, order } from '../../src/utils/sortSizeCohort'

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

const sizes = [
  {
    size_cohort: '$30-<$50 million',
    count: 16
  },
  {
    size_cohort: '$50-<$100 million',
    count: 15
  },
  {
    size_cohort: '$10-<$30 million',
    count: 9
  },
  {
    size_cohort: '$100 million+',
    count: 12
  },
  {
    size_cohort: '<$10 million',
    count: 1
  }
]

const orderedObj = { '$10-<$30 million': 1, '$100 million+': 4, '$30-<$50 million': 2, '$50-<$100 million': 3, '<$10 million': 0 }

describe('sort size by key', () => {
  it('function should returns ordered array', async () => {
    const result = sortByKey(data, 'id')

    expect(result).toEqual(orderedData)
  })
})

describe('build ordered object', () => {
  it('function should returns ordered label object when list is not empy', async () => {
    const result = order(sizes)

    expect(result).toEqual(orderedObj)
  })

  it('function should returns empty object when list is empy', async () => {
    const result = order([])

    expect(result).toEqual({})
  })
})
