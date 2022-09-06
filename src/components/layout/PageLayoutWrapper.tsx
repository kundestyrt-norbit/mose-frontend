import { styled } from '@mui/system';
import React, { useEffect } from 'react';
import Div100vh from 'react-div-100vh';
import { SectionsWrapper } from '../elements/Section';
import TopBar from './TopBar/TopBar';
import SideBar from './SideBar/SideBar';
import Hamburger from './TopBar/Hamburger';

interface PageLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper for including sidebar and topbar in page.
 */
const PageLayoutWrapper = ({ children }: PageLayoutWrapperProps) => {

  // Use effect for setting height values on resize
  useEffect(() => {
    const handleResize = () => {
      document.body.setAttribute('style', `--100vh: ${window.innerHeight}px;`);
    };

    window.addEventListener('resize', handleResize);

    // Trigger on initial load
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FullPageWrapper>
      <SideBar />
      <div style={{ flexGrow: 1 }}>
        <TopBar />
        <Hamburger />
        <main>
          <ChildrenInnerWrapper>{children}</ChildrenInnerWrapper>
        </main>
      </div>
    </FullPageWrapper>
  );
};

const ChildrenInnerWrapper = styled(SectionsWrapper)``;

const FullPageWrapper = styled('div')`
  height: var(--100vh);
  width: 100%;
  display: flex;

  overflow: auto;
  position: relative;
`;

export default PageLayoutWrapper;
