import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('renders successfully', () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
