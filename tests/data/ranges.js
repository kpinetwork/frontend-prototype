export const DATA = {
  total: 4,
  ranges: [
    {
      key: 'revenue',
      name: 'Revenue',
      ranges: [
        { label: '100+', max: null, min: 100 },
        { label: '50-100', max: 100, min: 50 },
        { label: '>50', max: 50, min: null }
      ]
    },
    {
      key: 'ebitda',
      name: 'Ebitda',
      ranges: [
        { label: '30+', max: null, min: 30 }
      ]
    }
  ]
}
