import { SET_MENU_OPEN, SET_TOP_BAR_OPEN } from './layout.actionTypes';

export const setMenuOpen = (menuOpen: boolean) => ({
  type: SET_MENU_OPEN,
  payload: {
    menuOpen,
  },
});

export const setTopBarOpen = (topBarOpen: boolean) => ({
  type: SET_TOP_BAR_OPEN,
  payload: {
    topBarOpen: topBarOpen,
  },
});
