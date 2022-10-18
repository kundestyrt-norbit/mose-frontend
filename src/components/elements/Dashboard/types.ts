interface Filter {
  type: string | null
  timeWindow: string | null
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
