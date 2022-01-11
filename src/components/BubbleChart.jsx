import React from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js'
import { Bubble } from 'react-chartjs-2'
import zoomPlugin from 'chartjs-plugin-zoom'
import { useMediaQuery } from '@material-ui/core'

ChartJS.register(LinearScale, PointElement, Tooltip, zoomPlugin)

export function BubbleChart ({ data }) {
  const isPhone = useMediaQuery('(max-width: 768px)')

  const handleclick = async (e, element) => {
    if (element.length > 0) {
      const { datasetIndex } = element[0]
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
          enabled: false,
          mode: 'xy',
          overScaleMode: 'y'
        },
        zoom: {
          wheel: {
            enabled: false
          },
          pinch: {
            enabled: false
          },
          mode: 'xy',
          overScaleMode: 'y'
        }
      }
    },
    onClick: handleclick
  }
  return <Bubble options={options} data={data} width={100} height={isPhone ? '80vh' : '40vh'} />
}
