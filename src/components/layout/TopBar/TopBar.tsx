import React, { createRef, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useLocation } from 'react-router';
import { Routes } from '../../../pages/MainRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setTopBarOpen } from '../../../store/layout/layout.actions';
import { RootState } from '../../../store';
import { useClickOutside } from '../../../hooks/useClickOutside';

/**
 * The top of the page with searchbar and sidebar button.
 * Will also display filtering options when the searchbar is selected.
 */
const TopBar = () => {
  // Store
  const topBarOpen: boolean = useSelector(
    (rootState: RootState) => rootState.layout.topBarOpen
  );

  const dispatch = useDispatch();

  const ref = createRef<HTMLDivElement>();

  const closeTopBar = () => topBarOpen && dispatch(setTopBarOpen(false));

  // Close top bar on click outside
  useClickOutside(ref, closeTopBar);

  const location = useLocation();

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <MainWrapper ref={ref}>
      <BarFlexWrapper>
        <FormTopLayer action="/search" onSubmit={handleSubmit}>
          <TopBarInnerWrapper>
          </TopBarInnerWrapper>

          <AnimatePresence>
            {topBarOpen && (
              <ExpandedContentWrapper
                variants={expandedContentVariants}
                initial="hide"
                animate="show"
                exit="hide"
                transition={{ duration: 0.1 }}
              >
              </ExpandedContentWrapper>
            )}
          </AnimatePresence>
        </FormTopLayer>
      </BarFlexWrapper>
    </MainWrapper>
  );
};

const expandedContentVariants: Variants = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};

const BarFlexWrapper = styled('div')``;

const FormTopLayer = styled('form')`
  position: relative;
  z-index: 10;
`;

const ExpandedContentWrapper = styled(motion.div)`
  position: absolute;

  height: fit-content;
  width: 100%;

  padding: 1rem 0;
  & > * {
    margin: 0;
  }
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const TopBarInnerWrapper = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.main};
`;

const MainWrapper = styled('div')`
  position: sticky;
  top: 0;
  z-index: 90;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export default TopBar;
