import { Box, CircularProgress } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
import { DateRange } from 'react-day-picker'
import useSWR from 'swr'
import { SensorMeasurements } from '../../../pages/api/sensor/_queryClient'
import { AlarmGraph } from './AlarmGraph'
import { Alarm, ALARM_TYPE } from './types'
interface SensorAlarmGraphProps {
  id: number
  column: string
  friendlyName?: string
  sx?: SxProps<Theme>
  unit?: string
  alarms?: {[key in ALARM_TYPE]: Alarm}
  range?: DateRange
}

export function SensorAlarmGraph ({ id, column, sx, friendlyName, unit, alarms, range }: SensorAlarmGraphProps): JSX.Element {
  let fetcher
  if (range?.from != null && range?.to != null && range?.from < range?.to) {
    fetcher = async (input: string, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(`${input}?${new URLSearchParams(
      { from: range.from?.toISOString() ?? '', to: range.to?.toISOString() ?? '' }
    ).toString()}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => await (res.json() as Promise<SensorMeasurements>))
  } else {
    fetcher = async (input: string, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))
  }
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  return (
    <Box sx={sx}>
      {(data != null) ? <AlarmGraph time={data.times} measurments={data.measurements} unit={unit} alarms={alarms} /> : <CircularProgress size={100} />}
    </Box>
  )
}
