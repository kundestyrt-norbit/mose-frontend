import { Dashboard, DashboardListItem, SensorIncludeDashboard } from '../components/elements/dashboard/types'

export async function getDashboards (): Promise<DashboardListItem[]> {
  const response = await fetch('/api/dashboard/list', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const resData = await response.json()

  return resData
}

export async function getDashboardsIncludeHasSensor (gatewayId: number, sensorId: number, column: string): Promise<DashboardListItem[]> {
  const response = await fetch(`/api/dashboard/list/${gatewayId}/${sensorId}/${column}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const resData = await response.json()

  return resData
}

export async function getSensorsIncludeDashboard (dashboardId: string): Promise<SensorIncludeDashboard[]> {
  const response = await fetch(`/api/sensor/list/${dashboardId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const resData = await response.json()

  return resData
}

export async function createDashboard (dashboard: Dashboard): Promise<any> {
  const response = await fetch('/api/dashboard/', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(dashboard)
  })
  const resData = await response.json()
  return resData
}

export async function deleteDashboard (dashboardId: string): Promise<any> {
  const response = await fetch(`/api/dashboard/${dashboardId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  })
  return response.ok
}
