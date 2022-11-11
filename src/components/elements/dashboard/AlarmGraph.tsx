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
  Plugin,
  ChartDataset,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Alarm, ALARM_TYPE, SensorPredictions } from './types'

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
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
  alarms?: {[key in ALARM_TYPE]: Alarm}
  dataPrediction?: SensorPredictions
}

function addHours (numOfHours: number, date = new Date()): number {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000)
  return date.getTime()
}

export function AlarmGraph ({ time, measurments, label, title, unit, alarms, dataPrediction }: GraphParams): JSX.Element {
  const maxMeasurement = Math.max(...measurments)
  const minMeasurement = Math.min(...measurments)
  const alarmValues = (alarms != null) ? Object.values(alarms).map(alarm => alarm.value) : null
  const maxAlarm = (alarmValues != null) ? Math.max(...alarmValues) : -Infinity
  const minAlarm = (alarmValues != null) ? Math.min(...alarmValues) : Infinity
  const minPrediction = (dataPrediction?.percentile005 !== undefined) ? Math.min(...dataPrediction.percentile005) : Infinity
  const maxPrediction = (dataPrediction?.percentile095 !== undefined) ? Math.max(...dataPrediction.percentile095) : -Infinity

  const min = Math.min(minMeasurement, minAlarm, minPrediction)
  const max = Math.max(maxMeasurement, maxAlarm, maxPrediction)

  const options: ChartOptions<'line'> & {plugins: {alarmLines: {[key in ALARM_TYPE]?: Alarm}}} = {
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
        },
        max: Math.ceil(max + (max - min) / 10),
        min: Math.floor(min - (max - min) / 10)
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
      },
      alarmLines: {
        ...alarms
      }
    }
  }

  const pastTimes = time.map(t => (new Date(t + 'Z')))

  const predictionTimes = []

  const datasets: Array<ChartDataset<'line'>> = [
    {
      data: pastTimes.map((t, i) => ({ x: t.getTime(), y: measurments[i] })),
      backgroundColor: 'white',
      borderColor: 'blue',
      pointRadius (ctx, options) {
        const index = ctx.dataIndex
        return index % Math.ceil(measurments.length / 100) === 0 ? 3 : 0
      },
      pointBackgroundColor: (ctx, option) => {
        const index = ctx.dataIndex
        const value = ctx.dataset.data[index]
        return (alarms != null) ? alarmBackgroundColor(value as number, alarms) : 'white'
      }
    }
  ]
  if (dataPrediction !== undefined) {
    for (let i = 1; i <= 24; i++) {
      predictionTimes.push(addHours(i, new Date(dataPrediction?.time + 'Z')))
    }
    datasets.push({
      data: predictionTimes.map((t, i) => ({ x: t, y: dataPrediction.percentile095[i] })),
      fill: {
        target: '+1',
        above: 'rgba(55, 173, 221, 0.4)'
      },
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
      fill: {
        target: '-1',
        below: 'rgba(55, 173, 221, 0.4)'
      },
      pointRadius: 0
    })
  }
  const data: ChartData<'line'> = {
    datasets
  }

  const plugin: Plugin<'line', {[key in ALARM_TYPE]: Alarm}> = {
    id: 'alarmLines',
    afterDatasetDraw: (chartInstance, args, options) => {
      const yAxis = chartInstance.scales.y
      const xAxis = chartInstance.scales.x
      const ctx = chartInstance.ctx
      ctx.save()
      if (options != null) {
        Object.entries(options).forEach(([alarmType, alarm]) => {
          const yValueStart = yAxis.getPixelForValue(alarm.value)// yAxis.getPixelForValue(testLine[0])
          const yValueEnd = yValueStart
          const xValueStart = xAxis.left
          const xValueEnd = xAxis.right

          ctx.font = '18 px sans-serif'
          ctx.fillStyle = 'rgba(50, 155, 255, 0.85)'
          ctx.fillText((alarm.name != null) ? `${alarmType}:${alarm.name}` : '', 40, yValueStart + 10)
          ctx.setLineDash([15, 15])
          ctx.strokeStyle = 'rgba(50, 155, 255, 0.85)'
          ctx.lineWidth = 2.5
          ctx.beginPath()
          ctx.moveTo(xValueStart, yValueStart)
          ctx.lineTo(xValueEnd, yValueEnd)
          ctx.stroke()
          ctx.restore()
        })
      }
    }
  }

  return <Line options={options} data={data} plugins={[plugin]} />
}

function alarmBackgroundColor (value: Number, alarms: {[key in ALARM_TYPE]: Alarm}): string {
  const lowerAlarm = (alarms.Lower !== undefined ? value.y <= alarms.Lower.value : false)
  const upperAlarm = alarms.Upper !== undefined ? value.y >= alarms.Upper.value : false
  return lowerAlarm || upperAlarm ? 'red' : 'white'
}
