import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import SensorPage from './SensorPage/SensorPage';

export enum Routes {
  HOME = '/',
  SENSOR = '/sensor',
  NOT_FOUND = '/404',
}

export enum RouteFolders {
  BASE = '/',
  SENSOR = '/sensor',
}

/**
 * Includes all pages we can visit in the application.
 */
const MainRouter = () => {
  // location holds state of what route is active
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route exact path={Routes.HOME} component={HomePage} key={location.key} />
      <Route
        path={Routes.SENSOR}
        component={SensorPage}
        key={location.key}
      />
      <Route component={NotFoundPage} key={location.key} />
    </Switch>
  );
};

export default MainRouter;
