import type { NextPage } from 'next'
import PageLayoutWrapper from '../../components/layout/PageLayoutWrapper'
import TemporaryDrawer from '../../components/elements/dashboard/TopBar'
import React from 'react'
import { Container } from '@mui/material'

/**
 * Landing page of the app.
 */
const DashboardPage: NextPage = () => {
  return (
    <div>
      <PageLayoutWrapper>
        <TemporaryDrawer />
        <Container sx={{ display: 'flex', justifyContent: 'center' }}><h2>Choose a dashboard or create a dashboard by clicking on the button above</h2></Container>
      </PageLayoutWrapper>
    </div>
  )
}

export default DashboardPage
