import React from 'react'
import { Routes as Switch, Route, useLocation } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import SensorPage from './SensorPage/SensorPage'

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
const MainRouter = (): JSX.Element => {
  // location holds state of what route is active
  const location = useLocation()

  return (
    <Switch location={location} key={location.key}>
      <Route path={Routes.HOME} element={<HomePage/>} key={location.key} />
      <Route
        path={Routes.SENSOR}
        element={<SensorPage/>}
        key={location.key}
      />
      <Route element={<NotFoundPage/>} key={location.key} />
    </Switch>
  )
}

export default MainRouter
