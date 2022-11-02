import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/dashboard/TopBar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DashBoardView from '../../components/elements/dashboard/DashBoardView'
import AddSensor from '../../components/elements/dashboard/AddSensor'
import { Dashboard } from '../../components/elements/dashboard/types'

const DashboardPage = (): JSX.Element => {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const router = useRouter()

  const updateDashboard = (): void => {
    if (router.query.dashboardNumber !== undefined) {
      fetch(`/api/dashboard/${router.query.dashboardNumber as string}`).then(async res => await res.json()).then(res => setDashboard(res)).catch(async () => await router.push('/dashboard'))
    }
  }

  useEffect(() => {
    updateDashboard()
  }, [router.query.dashboardNumber])

  return (
    <PageLayoutWrapper>
      {(dashboard != null) &&
        <>
          <TemporaryDrawer />
          <AddSensor dashboardId={dashboard.dashboardId} updateDashboard={updateDashboard} />
          <DashBoardView {...dashboard} />
        </>
      }
    </PageLayoutWrapper>
  )
}

export default DashboardPage
