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
  Filler
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

function addHours (numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)
  return date
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
  const lab = time.map(t => (new Date(t + 'Z')))
  const predictionTimes = []
  for (let i = 1; i <= 24; i++) {
    predictionTimes.push(addHours(i, new Date(dataPrediction?.time + 'Z')))
  }
  const data: ChartData<'line'> = {
    labels: lab,
    datasets: [
      {
        // label: lab,
        data: lab.map((t, i) => ({ x: t, y: measurments[i] })),
        borderColor: 'blue',
        backgroundColor: 'white'
      },
      {
        // label: predictionTimes,
        data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile095[i] })),
        fill: '+1',
        pointRadius: 0
      },
      {
        // label: predictionTimes,
        data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile050[i] })),
        borderColor: 'green',
        // backgroundColor: 'white',
        backgroundColor: 'rgba(55, 173, 221, 0.6)',
        fill: false

      },
      {
        // label: predictionTimes,
        data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile005[i] })),
        fill: '-1',
        pointRadius: 0
      }
    ]
  }
  if (dataPrediction !== undefined) {
    // const predictionDataChart: ChartData<'bar'> = {
    //   labels: [1, 2, 3, 4, 5],
    //   datasets: [
    //     {
    //       label: 'Set 1',
    //       backgroundColor: 'rgba(55, 173, 221,  0.6)',
    //       data: [8, 18, 48, 38, 28],
    //       borderWidth: 0.1,
    //       fill: false,
    //       pointRadius: 0.0
    //     },

    //     {
    //       label: 'Set 2',
    //       backgroundColor: 'rgba(55, 173, 221,  1)',
    //       data: [10, 20, 50, 40, 30],
    //       borderColor: '#00F',
    //       fill: false,
    //       pointRadius: 0.0
    //     },

    //     {
    //       label: 'Set 3',
    //       type: 'line',
    //       backgroundColor: 'rgba(55, 173, 221,  0.6)',
    //       borderColor: 'transparent',
    //       data: [15, 22, 52, 42, 32],
    //       borderWidth: 0.1,
    //       tension: 0,
    //       fill: 0,
    //       pointRadius: 0.0
    //     }

    //   ]
    // }
    // const chartOptionsPredictions: ChartOptions<'line'> = {
    //   responsive: true,
    //   plugins: {
    //     title: {
    //       display: true,
    //       text: 'Bad Confidence Intervals'
    //     }
    //   }
    // }
    // return (
    //     <>
    //       {/* <Line options={options} data={data} /> */}
    //       <Line options={chartOptionsPredictions} data={predictionDataChart} />
    //     </>
    // )
  }

  return <Line options={options} data={data} />
}
