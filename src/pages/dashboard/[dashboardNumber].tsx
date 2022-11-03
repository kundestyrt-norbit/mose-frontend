import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/dashboard/TopBar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DashBoardView from '../../components/elements/dashboard/DashBoardView'

const DashboardPage = (): JSX.Element => {
  const [dashboard, setDashboard] = useState({})
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/dashboard/${router.query.dashboardNumber as string}`).then(async res => await res.json()).then(res => setDashboard(res)).catch(async () => await router.push('/dashboard'))
  }, [router.query.dashboardNumber])

  return (
    <PageLayoutWrapper>
      <TemporaryDrawer />
      <DashBoardView dashboard={dashboard} />
    </PageLayoutWrapper>
  )
}

export default DashboardPage
