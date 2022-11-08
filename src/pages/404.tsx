import { SectionsWrapper } from '../components/layout/Section'
import PageLayoutWrapper from '../components/layout/PageLayoutWrapper'
import React from 'react'

/**
 * Page for when we enter a route that does not lead to any other page.
 */
const NotFoundPage = (): JSX.Element => {
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>Side ikke funnet.</SectionsWrapper>
    </PageLayoutWrapper>
  )
}

export default NotFoundPage
