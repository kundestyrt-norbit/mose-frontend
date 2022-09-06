import { SET_MENU_OPEN, SET_TOP_BAR_OPEN } from './layout.actionTypes';
export interface LayoutState {
  menuOpen: boolean;
  topBarOpen: boolean;
}

const initialLayoutState: LayoutState = {
  menuOpen: false,
  topBarOpen: false,
};

/**
 * A reducer for handling the state of the layout.
 */
export const layoutReducer = (
  state: LayoutState = initialLayoutState,
  action: any
): LayoutState => {
  switch (action.type) {
    case SET_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.payload.menuOpen,
      };
    case SET_TOP_BAR_OPEN:
      return {
        ...state,
        topBarOpen: action.payload.topBarOpen,
      };
    default:
      return state;
  }
};
