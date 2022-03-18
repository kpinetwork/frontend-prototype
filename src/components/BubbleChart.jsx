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

  const options = {
    scales: {
      y: {
        title: {
          text: 'Ebitda margin',
          display: true
        },
        beginAtZero: true
      },
      x: {
        title: {
          text: 'Revenue growth',
          display: true
        }
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
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const raw = context.raw
            return `${context.dataset.label}: (${raw.x}, ${raw.y})`
          }
        }
      }
    }
  }
  return <Bubble options={options} data={data} width={100} height={isPhone ? '80vh' : '40vh'} />
}
