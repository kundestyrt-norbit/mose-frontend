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

interface GraphParams {
  time: string[]
  measurments: number[]
  label: string
  title: string
}
export function Graph ({ time, measurments, label, title }: GraphParams): JSX.Element {
  console.log(measurments)
  const options = {
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
        text: title
      }
    }
  }
  const data = {
    labels: time.map(t => (new Date(t + 'Z'))),
    datasets: [
      {
        label,
        data: measurments,
        borderColor: 'blue',
        backgroundColor: 'white'
      }
    ]
  }
  // @ts-expect-error
  return <Line options={options} data={data} />
}
