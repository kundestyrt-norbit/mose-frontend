import React from 'react';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setMenuOpen } from '../../../store/layout/layout.actions';

interface HamburgerProps {}

/**
 * Button for opening and closing the sidebar.
 */
const Hamburger = ({}: HamburgerProps) => {
  const dispatch = useDispatch();
  const menuOpen = useSelector(
    (rootState: RootState) => rootState.layout.menuOpen
  );
  return (
    <HamburgerWrapper
      tabIndex={0}
      open={menuOpen}
      onClick={() => dispatch(setMenuOpen(!menuOpen))}
      onKeyDown={(e) => {
        if (e.key === 'Enter') dispatch(setMenuOpen(!menuOpen));
      }}
      aria-label="hamburger menu button"
      data-testid="hamburger-button"
    >
      <span />
      <span />
      <span />
      <span />
    </HamburgerWrapper>
  );
};

const HamburgerWrapper = styled('div')<{ open: boolean }>`
  font-size: 2rem;

  position: fixed;
  z-index: 150;

  top: 1.1rem;
  right: 1.6rem;
  width: 1.4em;
  height: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 200ms ease;
  &:hover {
    cursor: pointer;
  }

  & > span {
    height: 2px;
    width: 100%;
    background-color: #fff;
    transition: transform 200ms ease, opacity 200ms ease;
  }
  & > span:nth-of-type(2) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ${(props) =>
    props.open &&
    `
  & > span:nth-of-type(3) {
    transform: rotateZ(-45deg);
  }
  & > span:nth-of-type(2) {
    transform: rotateZ(45deg);
  }
  & > span:nth-of-type(1) {
    opacity: 0;
    transform: translateY(1000%) scaleX(0.2);
  }
  & > span:nth-of-type(4) {
    opacity: 0;
    transform: translateY(-1000%) scaleX(0.2);
  }
  `}

  // Hide on large screens
  ${({ theme }) => theme.breakpoints.up('md')} {
    display: none;
  }
`;

export default Hamburger;
