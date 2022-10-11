import 'chartjs-adapter-moment'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    x: {

      type: 'time',
      time: {
        unit: 'day',
        tooltipFormat: 'YYYY-MM-DD HH:mm'

      },
      grid: {
        color: 'white'
      }

    },
    y: {
      grid: {
        color: 'white'
      }
    }

  },
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Temprature at parkinglot'
    }
  }
}

interface SensorParams {
  time: string[]
  measurments: number[]
}
export function SensorGraph ({ time, measurments }: SensorParams): JSX.Element {
  console.log(measurments)
  const data = {
    labels: time.map(t => (new Date(t + 'Z'))),
    datasets: [
      {
        label: 'Temperature',
        data: measurments,
        borderColor: 'blue',
        backgroundColor: 'white'
      }
    ]
  }
  // @ts-expect-error
  return <Line options={options} data={data} />
}
