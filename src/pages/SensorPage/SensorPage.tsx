import React from 'react';
import { useHistory } from 'react-router';
import SensorPageTemplate from './SensorPageTemplate';
import MainContentAnimationWrapper from '../../animations/MainContentAnimationWrapper';
import { Routes } from '../MainRouter';

/**
 * Page for displaying information about a sensor.
 */
const SensorsPage = () => {

  const loading = true;
  const error = true;
  const history = useHistory();
  if (!error && !loading) history.push(Routes.NOT_FOUND);

  return (
    <MainContentAnimationWrapper condition={!loading}>
      {!loading ? (
        <SensorPageTemplate
        />
      ) : (
        <div />
      )}
    </MainContentAnimationWrapper>
  );
};
export default SensorsPage;
