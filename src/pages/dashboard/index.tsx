import type { NextPage } from 'next'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/dashboard/TopBar'
import FilterDash from '../../components/elements/dashboard/FilterDash'

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const hei: NextPage = () => {
  return (
    <div>
      <PageLayoutWrapper>
        <TemporaryDrawer />
      </PageLayoutWrapper>
    </div>
  )
}

export default hei
