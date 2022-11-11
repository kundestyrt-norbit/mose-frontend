import type { NextPage } from 'next'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/dashboard/TopBar'
import React from 'react'

/**
 * Landing page of the app.
 */
const DashboardPage: NextPage = () => {
  return (
    <div>
      <PageLayoutWrapper>
        <TemporaryDrawer />
        <h2>Choose a dashboard or create a dashboard by clicking on the button above</h2>
      </PageLayoutWrapper>
    </div>
  )
}

export default DashboardPage
