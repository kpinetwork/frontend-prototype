import React, { useEffect } from 'react'
import { BubbleChart } from '@components/BubbleChart'
import faker from 'faker'
import { CardKPI } from '@components/Card/CardKPI'

/* export const data1 = {
  datasets: [
    {
      label: 'KPI Network',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 })
      })),
      backgroundColor: 'rgba(243, 165, 76, 0.5)'
    }
  ]
} */

export function RuleGraph ({ ruleOf40 }) {
  const [data, setData] = React.useState({
    datasets: []
  })
  useEffect(() => {
    if (ruleOf40) {
      const datasets = ruleOf40.map((row) => {
        const { name: label, revenue_growth_rate: x, ebitda_margin: y, revenue: r } = row
        const radio = r / 10
        console.log('row', r)
        return {
          label,
          data: [{ x, y, r: radio }],
          backgroundColor: faker.internet.color()
        }
      })
      console.log(datasets)
      setData((prev) => ({
        ...prev,
        datasets
      }))
    }
  }, [ruleOf40])

  return (
  <>
    <CardKPI title={'Rule of 40: By Sector'} actions={false} overflow={'auto'} textAlign={'center'}>
      <BubbleChart data={data} />
    </CardKPI>
  </>)
}
