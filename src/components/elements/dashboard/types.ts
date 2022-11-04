import { SensorMetaData } from '../../../pages/api/sensor/_sensorMetaData'

type TimeWindow = number | [Date, Date] | null

export interface DashboardListItem {
  dashboardId: string
  dashboardName: string
  hasSensor?: boolean
}

interface Filter {
  timeWindow: TimeWindow
}

export interface Sensor {
  id: number
  gatewayId: number
  metaData: SensorMetaData
  filter?: Filter
  column: string
  alarms?: {[key in ALARM_TYPE]: Alarm}
}

export enum ALARM_TYPE {
  LOWER = 'Lower',
  UPPER = 'Upper'
}

export interface Alarm {
  value: number
  name?: string
  type: ALARM_TYPE
}

export interface Dashboard {
  dashboardId: string
  dashboardName: string
  sensors: Sensor[]
}

export interface SensorIncludeDashboard extends Sensor{
  sensorIncludedInDashboard?: boolean
}
