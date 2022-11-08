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
  ChartData,
  CategoryScale,
  Filler,
  ChartDataset
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { SensorPredictions } from './types'

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Filler,
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
  dataPrediction?: SensorPredictions
}

function addHours (numOfHours: number, date = new Date()): number {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)
  return date.getTime()
}

export function Graph ({ time, measurments, label, title, unit, dataPrediction }: GraphParams): JSX.Element {
  const options: ChartOptions<'line'> = {
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
  const pastTimes = time.map(t => (new Date(t + 'Z')))

  const predictionTimes = []

  const datasets: Array<ChartDataset<'line'>> = [
    {
      data: pastTimes.map((t, i) => ({ x: t.getTime(), y: measurments[i] })),
      borderColor: 'blue',
      backgroundColor: 'white'
    }
  ]
  if (dataPrediction !== undefined) {
    for (let i = 1; i <= 24; i++) {
      predictionTimes.push(addHours(i, new Date(dataPrediction?.time + 'Z')))
    }
    datasets.push({
      data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile095[i] })),
      fill: '+1',
      pointRadius: 0
    })
    datasets.push({
      data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile050[i] })),
      borderColor: 'green',
      backgroundColor: 'rgba(55, 173, 221, 0.6)',
      fill: false
    })
    datasets.push({
      data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile005[i] })),
      fill: '-1',
      pointRadius: 0
    })
  }
  const data: ChartData<'line'> = {
    datasets
  }
  return <Line options={options} data={data} />
}
