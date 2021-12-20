import React, { useEffect, useState } from 'react'
import { BubbleChart } from '@components/BubbleChart'
import faker from 'faker'

export function ReportRuleGraph ({ ruleOf40 }) {
  const [data, setData] = useState({
    datasets: []
  })
  useEffect(() => {
    if (ruleOf40) {
      const datasets = ruleOf40.map((row) => {
        const { name: label, revenue_growth_rate: x, ebitda_margin: y, revenue: r, company_id: id } = row
        const radio = r / 10
        return {
          label,
          data: [{
            x,
            y,
            r: radio
          }],
          backgroundColor: faker.internet.color(),
          id
        }
      })
      setData((prev) => ({
        ...prev,
        datasets
      }))
    }
  }, [ruleOf40])
  return <BubbleChart data={data} />
}
