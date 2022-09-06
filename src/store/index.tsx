import { combineReducers } from 'redux';
import { LayoutState, layoutReducer } from './layout/layout.reducer';

export interface RootState {
  layout: LayoutState;
}

/**
 * A combined reducer for handling the state of the application.
 */
export default combineReducers({
  layout: layoutReducer,
});
