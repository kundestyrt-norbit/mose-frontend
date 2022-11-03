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

export interface Dashboard {
  dashboardId: string
  dashboardName: string
  sensors: Sensor[]
}

export interface Sensor {
  id: number
  column: string
  metaData: SensorMetaData
  gatewayId: number
  filter?: Filter
}

export interface SensorIncludeDashboard extends Sensor{
  sensorIncludedInDashboard?: boolean
}
