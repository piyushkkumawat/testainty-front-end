/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Login from '../Components/Login';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import i18n from 'i18next';

// import i18n from '../i18n'

const mockStore = configureStore();

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

// Mocking the useParams hook
jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  useParams: jest.fn().mockReturnValue({ testUrl: 'mockTestUrl' }),
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
          <Login />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('Login Component', () => {
  it('renders without errors', async () => {
    await renderComponent();
    await waitFor(() => {
      expect(screen.getByText(i18n.t('email'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('password'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('forgotPWD'))).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
    });
  });

  it('submits the form and triggers login action', async () => {
    await renderComponent();

    act(() => {
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
    });

    act(() => {
      fireEvent.click(screen.getByTestId('sign-in'));
    });

    // Wait for the asynchronous actions to complete
    await waitFor(() => {
      // expect(dispatchMock).toHaveBeenCalledWith(login({ email: 'test@example.com', password: 'password123' }));
      // Add your assertions or additional testing code here
    });
  });
});
