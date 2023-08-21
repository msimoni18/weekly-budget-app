// @ts-nocheck

import { useEffect, useState } from 'react'
import Plot from 'react-plotly.js'
import { useResizeDetector } from 'react-resize-detector'

export default function BarChart() {
  const { width, height, ref } = useResizeDetector()

  function setBarColors(values: number[]) {
    return values.map((value) => (value <= 200 ? 'blue' : 'red'))
  }

  const initialAmount = [200, 180, 300, 210]
  const data = [
    {
      x: [1, 2, 3, 4],
      y: initialAmount,
      type: 'bar',
      marker: {
        color: setBarColors(initialAmount),
      },
    },
  ]

  const [layout, setLayout] = useState({
    height: 300,
    width: width,
    font: {
      color: 'rgb(231, 229, 228)', // stone-200
      size: 12,
    },
    title: {
      text: '',
    },
    xaxis: {
      title: 'Week',
    },
    yaxis: {
      title: 'Dollars',
    },
    margin: {
      b: 80,
      l: 80,
      t: 60,
      r: 60,
    },
    showlegend: false,
    paper_bgcolor: 'rgb(24, 24, 27)',
    plot_bgcolor: '#242424',
  })

  useEffect(() => {
    setLayout((prevLayout) => {
      return {
        ...prevLayout,
        width: width,
      }
    })
  }, [width])

  return (
    <div ref={ref} className="max-w-lg m-auto">
      <div className="flex items-center justify-items-center overflow-hidden rounded-xl">
        <Plot
          data={data}
          layout={layout}
          config={{
            displayModeBar: false,
            // displaylogo: false,
          }}
        />
      </div>
    </div>
  )
}
