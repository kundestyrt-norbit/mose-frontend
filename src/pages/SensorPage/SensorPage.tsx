import React from 'react'
import { useNavigate } from 'react-router'
import SensorPageTemplate from './SensorPageTemplate'
import MainContentAnimationWrapper from '../../animations/MainContentAnimationWrapper'
import { Routes } from '../MainRouter'

/**
 * Page for displaying information about a sensor.
 */
const SensorsPage = (): JSX.Element => {
  const loading = true
  const error = true
  const navigate = useNavigate()
  if (!error && !loading) navigate(Routes.NOT_FOUND)

  return (
    <MainContentAnimationWrapper condition={!loading}>
      {!loading
        ? (
        <SensorPageTemplate
        />
          )
        : (
        <div />
          )}
    </MainContentAnimationWrapper>
  )
}
export default SensorsPage
