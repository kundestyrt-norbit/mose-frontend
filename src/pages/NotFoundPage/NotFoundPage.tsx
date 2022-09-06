import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { SectionsWrapper } from '../../components/elements/Section';
import { Routes } from '../MainRouter';

/**
 * Page for when we enter a route that does not lead to any other page.
 */
const NotFoundPage = () => {
  const location = useLocation();
  const history = useHistory();

  if (location.pathname !== Routes.NOT_FOUND) history.replace(Routes.NOT_FOUND);

  return (
    <SectionsWrapper>Side ikke funnet. Prøv å søk på noe.</SectionsWrapper>
  );
};

export default NotFoundPage;
