import { JsonObject } from 'aws-jwt-verify/safe-json-parse'

type TimeWindow = number | [Date, Date] | null
export interface DashboardList {[dashboardId: string]: string}

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

export function JSONToDashBoard (json: JsonObject): DashboardList {
  const dashboardList: DashboardList = {}
  const items = json?.Items
  if (items !== null) {
    for (const dashboard in items) {
      dashboardList[items[dashboard].dashboardId] = items[dashboard].dashboardName
    }
  }
  return dashboardList
}

export function JSONToDashBoardList (json: JsonObject): void {
  console.log(json?.Items)
}
