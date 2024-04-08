/* eslint-disable jest/expect-expect */
import { expect } from '@jest/globals';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import ResetPwd from '../Components/ResetPwd';

const mockStore = configureStore();

// Mock i18next initialization
i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en', // Set your desired language
  keySeparator: false, // Allow for nested keys in translations
  interpolation: {
    escapeValue: false, // React already protects against injection
  },
});

const store = mockStore({
  /* Initial state for your store if needed */
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Wrapping the component with BrowserRouter
const renderComponent = () =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <ResetPwd />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('Reset Password Component', () => {
  it('renders without errors', async () => {
    await renderComponent();
    await waitFor(() => {
      expect(screen.getByText(i18n.t('resetPassword'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('newPassword'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('confirmPassword'))).toBeInTheDocument();
      expect(screen.getByTestId('newPassword-input')).toBeInTheDocument();
      expect(screen.getByTestId('confirmPassword-input')).toBeInTheDocument();
    });
  });

  it('submits the form and triggers reset password action', async () => {
    await renderComponent();

    act(() => {
      fireEvent.change(screen.getByTestId('newPassword-input'), { target: { value: 'Hello@123' } });
      fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'Hello@123' } });
    });

    act(() => {
      fireEvent.click(screen.getByTestId('submit'));
    });

    // Wait for the asynchronous actions to complete
    await waitFor(() => {
      // Add your assertions or additional testing code here
    });
  });
});
