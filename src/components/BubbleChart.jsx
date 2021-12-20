import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'

ChartJS.register(LinearScale, PointElement, Tooltip, zoomPlugin)

export function BubbleChart ({ data }) {
  const handleclick = async (e, element) => {
    if (element.length > 0) {
      const { datasetIndex } = element[0]
      console.log(data.datasets[datasetIndex])
    }
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
          overScaleMode: 'y'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
          overScaleMode: 'y'
        }
      }
    },
    onClick: handleclick
  }

  return <Bubble options={options} data={data} width={100} height={40}/>
}
