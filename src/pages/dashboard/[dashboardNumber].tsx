import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/dashboard/SideBar'
import FilterDash from '../../components/elements/dashboard/FilterDash'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const DashboardPage = (): JSX.Element => {
  const [dashboard, setDashboard] = useState({})
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/dashboard/${router.query.dashboardNumber as string}`).then(async res => await res.json()).then(res => setDashboard(res)).catch(err => console.log(err))
  }, [])

  console.log(dashboard)
  return (
    <PageLayoutWrapper>
      <TemporaryDrawer />
      <FilterDash />
    </PageLayoutWrapper>
  )
}

export default DashboardPage
