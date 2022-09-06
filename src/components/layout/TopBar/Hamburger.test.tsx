import { render, fireEvent, screen } from '@testing-library/react';
import Hamburger from './Hamburger';
import { setMenuOpen } from '../../../store/layout/layout.actions';
import { createTestStore, TestProvider } from '../../../utils/test-utils';

describe('Hamburger', () => {
  const store = createTestStore();

  test('will change menu open state on click', () => {
    const dispatchMock = jest.spyOn(store, 'dispatch');

    render(
      <TestProvider isPage={false} url={'/'} store={store}>
        <Hamburger />
      </TestProvider>
    );

    fireEvent.click(screen.getByTestId('hamburger-button'));

    expect(dispatchMock).toHaveBeenCalledWith(setMenuOpen(true));
  });
});
