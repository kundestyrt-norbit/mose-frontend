type TimeWindow = number | [Date, Date] | null

export interface DashboardListItem {dashboardId: string, dashboardName: string}

interface Filter {
  timeWindow: TimeWindow
}

export interface Sensor {
  sensorId: number
  sensorType: string | null
  filter: Filter
}

export interface Dashboard {
  dashboardId: string
  dashboardName: string
  sensors: Sensor[]
}
