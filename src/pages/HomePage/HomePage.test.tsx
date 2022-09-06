import { TestProvider } from '../../utils/test-utils';
import HomePage from './HomePage';
import renderer from 'react-test-renderer';

describe('HomePage', () => {
  test('rendered successfully', () => {
    const tree = renderer
      .create(
        <TestProvider url="/">
          <HomePage />
        </TestProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
