import { styled } from '@mui/system'
import React, { useEffect } from 'react'
import Navbar from './NavBar'
interface PageLayoutWrapperProps {
  children: React.ReactNode
}

/**
 * Wrapper for including sidebar and topbar in page.
 */
const PageLayoutWrapper = ({
  children
}: PageLayoutWrapperProps): JSX.Element => {
  useEffect(() => {
    const handleResize = (): void => {
      document.body.setAttribute('style', `--100vh: ${window.innerHeight}px;`)
    }

    window.addEventListener('resize', handleResize)

    // Trigger on initial load
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <FullPageWrapper>
      <Navbar />
      {children}
    </FullPageWrapper>
  )
}

const FullPageWrapper = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  `

export default PageLayoutWrapper
