type TimeWindow = number | [Date, Date] | null

interface Filter {
  type: string | null
  timeWindow: TimeWindow
}

export interface Sensor {
  sensorId: number
  filter: Filter
}

export interface Dashboard {
  dashboardId: number
  dashboardName: string
  sensors: Sensor[]
}
