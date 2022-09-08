import React from 'react'
import { styled } from '@mui/system'
import { LinkWithIconGridRouter } from '../../elements/LinkWithIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RouteFolders, Routes } from '../../../pages/MainRouter'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { setMenuOpen } from '../../../store/layout/layout.actions'

/**
 * The sidebar on the left side of the screen containing links for navigating the pages.
 * Can be opened and closed when using narrow screen or window.
 */
const SideBar = (): JSX.Element => {
  const dispatch = useDispatch()
  const menuOpen = useSelector(
    (rootState: RootState) => rootState.layout.menuOpen
  )

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const closeMenu = () => dispatch(setMenuOpen(false))

  return (
    <MainWrapper>
      <SideBarOuterWrapper open={menuOpen}>
        <SideBarInnerWrapper>
          <LinkWithIconGridRouter to={RouteFolders.BASE} onClick={closeMenu}>
            <FontAwesomeIcon icon={['fas', 'home']} /> <span>Home</span>
          </LinkWithIconGridRouter>
          <LinkWithIconGridRouter to={Routes.SENSOR} onClick={closeMenu}>
          <FontAwesomeIcon icon={['fas', 'temperature-high']} />{' '}
            <span>Sensors</span>
          </LinkWithIconGridRouter>
        </SideBarInnerWrapper>
      </SideBarOuterWrapper>
      {menuOpen && <Backdrop onClick={closeMenu} />}
    </MainWrapper>
  )
}

const MainWrapper = styled('div')`
  position: sticky;
  top: 0;
  z-index: 150;
`

const Backdrop = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  height: var(--100vh);
  width: 100%;
  z-index: -1;
`

const SideBarInnerWrapper = styled('div')`
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.background.paper};
  flex-grow: 1;
  border-right: 1px solid ${({ theme }) => theme.palette.border.main};
  font-size: 1.2rem;

  & > * {
    margin: 2rem 0;
  }
`

const SideBarOuterWrapper = styled('nav')<{ open: boolean }>`
  --sidebar-width: 14rem;

  position: sticky;
  top: 0;

  display: flex;
  flex-shrink: 0;
  overflow: auto;

  height: 100%;
  max-height: 100%;
  width: var(--sidebar-width);

  transition: transform 200ms ease;
  word-break: break-all;

  ${({ theme }) => theme.breakpoints.down('md')} {
    transform: translateX(0);
    margin-left: calc(-1 * var(--sidebar-width));
    z-index: 100;

    ${(props) =>
      props.open
        ? `
      transform: translateX(var(--sidebar-width));
    `
        : ''}
  }
`

export default SideBar
