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
  filter?: Filter
  column: string
}

export interface Dashboard {
  dashboardId: string
  dashboardName: string
  sensors: Sensor[]
}
