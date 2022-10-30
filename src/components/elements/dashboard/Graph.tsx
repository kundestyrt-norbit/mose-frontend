import 'chartjs-adapter-moment'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
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
  label?: string
  title?: string
  unit?: string
}
export function Graph ({ time, measurments, label, title, unit }: GraphParams): JSX.Element {
  const options: ChartOptions = {
    responsive: true,
    elements: {
      point: {
        radius: 3
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
          color: 'gray'
        }

      },
      y: {
        grid: {
          color: 'gray'
        },
        ticks: {
          callback: function (value, index, values) {
            return `${value} ${unit ?? ''}`
          }
        }
      }

    },
    plugins: {
      title: {
        display: title != null,
        text: title
      },
      legend: {
        display: label != null
      },
      tooltip: {
        callbacks: {
          label: (tooltipItems) => `${tooltipItems.formattedValue}${unit ?? ''}`
        }
      }
    }
  }
  const data: ChartData<'line'> = {
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
