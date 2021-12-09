import React from 'react'
import { BubbleChart } from '../../../components/BubbleChart'
import faker from 'faker'
import { CardKPI } from '../../../components/Card/CardKPI'

export const data = {
  datasets: [
    {
      label: 'Red dataset',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 })
      })),
      backgroundColor: 'rgba(243, 165, 76, 0.5)'
    },
    {
      label: 'Blue dataset',
      data: Array.from({ length: 50 }, () => ({
        x: faker.datatype.number({ min: -100, max: 100 }),
        y: faker.datatype.number({ min: -100, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 20 })
      })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
}

export function RuleGraph () {
  return <>
  <CardKPI title={'Rule of 40: By Sector'} actions={false} overflow={'auto'} textAlign={'center'}>
    <BubbleChart data={data} />
  </CardKPI>
  </>
}
