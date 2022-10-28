import { Dashboard, DashboardListItem } from '../components/elements/dashboard/types'

export async function getDashboards (): Promise<DashboardListItem[]> {
  const response = await fetch('/api/dashboard/list', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  const resData = await response.json()
  console.log(resData)
  return resData
}

export async function createDashboard (dashboard: Dashboard): Promise<any> {
  const response = await fetch('/api/dashboard/list', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(dashboard)
  })
  const resData = await response.json()
  return resData
}