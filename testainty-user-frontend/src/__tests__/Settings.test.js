/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Settings from '../Components/Test/Settings';

const mockStore = configureStore();
const store = mockStore({
    createAssessment: {
      // Mock your store state here if needed
    },
  });

// Mocking the i18next initialization
i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

// Mocking the react-redux module
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const renderComponent = () =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Settings />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('Settings Component', () => {
  it('renders without errors', async () => {
    await renderComponent();

    await waitFor(() => {
      expect(screen.getByText(i18n.t('antiCheat'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('disallow'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('makeFullscreen'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('logTab'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('videoRecording'))).toBeInTheDocument();

    });
  });


  it('handles "Next" button click', async () => {
    await renderComponent();

    // Act
    act(() => {
      fireEvent.click(screen.getByText(i18n.t('next')));
    });

    // Assert
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('handles "Previous" button click', async () => {
    await renderComponent();

    // Click the "Previous" button
    act(() => {
      fireEvent.click(screen.getByTestId('previous-btn'));
    });

  });
});
