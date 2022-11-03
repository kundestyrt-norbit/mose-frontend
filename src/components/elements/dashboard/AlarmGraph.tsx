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
  Plugin
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Alarm, ALARM_TYPE } from './types'

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
  alarms?: {[key in ALARM_TYPE]: Alarm}
}
export function AlarmGraph ({ time, measurments, label, title, unit, alarms }: GraphParams): JSX.Element {
  const maxMeasurement = Math.max(...measurments)
  const minMeasurement = Math.min(...measurments)
  const alarmValues = (alarms != null) ? Object.values(alarms).map(alarm => alarm.value) : null
  const maxAlarm = (alarmValues != null) ? Math.max(...alarmValues) : 0
  const minAlarm = (alarmValues != null) ? Math.min(...alarmValues) : Infinity

  const min = minAlarm < minMeasurement ? minAlarm : minMeasurement
  const max = maxAlarm > maxMeasurement ? maxAlarm : maxMeasurement

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
  const data: ChartData<'line'> = {
    labels: time.map(t => (new Date(t + 'Z'))),
    datasets: [
      {
        label,
        data: measurments,
        borderColor: 'blue',
        pointBackgroundColor: (ctx, option) => {
          const index = ctx.dataIndex
          const value = ctx.dataset.data[index]
          return (alarms != null) ? alarmBackgroundColor(value as number, alarms) : 'white'
        }
      }
    ]
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
  const lowerAlarm = (alarms.Lower !== undefined ? value <= alarms.Lower.value : false)
  const upperAlarm = alarms.Upper !== undefined ? value >= alarms.Upper.value : false
  return lowerAlarm || upperAlarm ? 'red' : 'white'
}
