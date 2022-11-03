import { Box, CircularProgress } from '@mui/material'
import { SxProps, Theme } from '@mui/system'
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
}

const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SensorMeasurements> => await fetch(input, init).then(async (res) => await (res.json() as Promise<SensorMeasurements>))

export function SensorAlarmGraph ({ id, column, sx, friendlyName, unit, alarms }: SensorAlarmGraphProps): JSX.Element {
  console.log(alarms)
  const { data } = useSWR(`/api/sensor/${id}/${column}`, fetcher)
  console.log(data)
  return (
    <Box sx={sx}>
      {(data != null) ? <AlarmGraph time={data.times} measurments={data.measurements} unit={unit} alarms={alarms} /> : <CircularProgress size={100} />}
    </Box>
  )
}
