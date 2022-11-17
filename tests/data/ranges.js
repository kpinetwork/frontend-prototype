export const DATA = {
  total: 5,
  ranges: [
    {
      key: 'revenue',
      name: 'Revenue',
      ranges: [
        { label: '<50', max_value: 50, min_value: null },
        { label: '50-70', max_value: 70, min_value: 50 },
        { label: '70-100', max_value: 100, min_value: 70 },
        { label: '100+', max_value: null, min_value: 100 }
      ]
    },
    {
      key: 'ebitda',
      name: 'Ebitda',
      ranges: [
        { label: '30+', max_value: null, min_value: 30 }
      ]
    }
  ]
}
