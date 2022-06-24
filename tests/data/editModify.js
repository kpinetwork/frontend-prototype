export const DATA = {
  head: [
    ['UID', 'Name', 'Sector', 'Vertical', 'Investor profile', 'Actuals', ''],
    ['', '', '', '', '', 'Revenue', 'Ebitda'],
    ['', '', '', '', '', '2020', '2020']
  ],
  body: [
    {
      id: '123',
      name: 'Company A',
      sector: 'Application Software',
      vertical: 'Engineering',
      inves_profile_name: 'Early stage VC',
      scenarios: [
        {
          scenario_id: '1',
          metric_id: '1',
          scenario: 'Actuals',
          metric: 'Revenue',
          year: 2020,
          value: 4.56
        },
        {
          scenario_id: '1',
          metric_id: '2',
          scenario: 'Actuals',
          metric: 'Ebitda',
          year: 2020,
          value: 11.1
        }
      ]
    },
    {
      id: '124',
      name: 'Company B',
      sector: 'Application Software',
      vertical: 'Engineering',
      inves_profile_name: 'Growth stage VC',
      scenarios: [
        {
          scenario_id: '2',
          metric_id: '3',
          scenario: 'Actuals',
          metric: 'Revenue',
          year: 2020,
          value: 8.01
        },
        {
          scenario_id: '2',
          metric_id: '4',
          scenario: 'Actuals',
          metric: 'Ebitda',
          year: 2020,
          value: 21.3
        }
      ]
    }
  ]
}
