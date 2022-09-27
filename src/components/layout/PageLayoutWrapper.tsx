import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './NavBar/NavBar';
import Sidebar from './SideBar/SideBar';
interface PageLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper for including sidebar and topbar in page.
 */
const PageLayoutWrapper = ({
  children,
}: PageLayoutWrapperProps): JSX.Element => {
  // const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true)

  // const toggleDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent | undefined) => {
  //     if (event !== undefined &&
  //       event.type === 'keydown' &&
  //       ((event as React.KeyboardEvent).key === 'Tab' ||
  //         (event as React.KeyboardEvent).key === 'Shift')) {
  //       return
  //     }
  //     setSidebarIsOpen(open)
  //   }
  // Use effect for setting height values on resize
  useEffect(() => {
    const handleResize = (): void => {
      document.body.setAttribute('style', `--100vh: ${window.innerHeight}px;`);
    };

    window.addEventListener('resize', handleResize);

    // Trigger on initial load
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <FullPageWrapper>
      {/* <Navbar onSidebarOpen={() => setSidebarIsOpen(true)} /> */}
      <Navbar />
      {/* <Sidebar toggleDrawer={toggleDrawer} open={sidebarIsOpen} /> */}
      <PageLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </PageLayoutRoot>
    </FullPageWrapper>
  );
};

const PageLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

const FullPageWrapper = styled('div')`
  height: var(--100vh);
  width: 100%;
  display: flex;

  overflow: auto;
  position: relative;
`;

export default PageLayoutWrapper;
