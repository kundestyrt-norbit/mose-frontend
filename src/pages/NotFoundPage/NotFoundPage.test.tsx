import { TestProvider } from '../../utils/test-utils';
import renderer from 'react-test-renderer';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('rendered successfully', () => {
    const tree = renderer
      .create(
        <TestProvider url="/404">
          <NotFoundPage />
        </TestProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
