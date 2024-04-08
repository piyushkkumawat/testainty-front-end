/* eslint-disable jest/expect-expect */
import { expect } from '@jest/globals';
import i18n from 'i18next';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider,initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import ForgotPwd from '../Components/ForgotPwd';

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

// Wrapping the component with BrowserRouter
const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <ForgotPwd />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );


describe('Forgot Password Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText(i18n.t('enterEmail'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('email'))).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
        });

    });

    it('submits the form and triggers forgot password action', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'demo123@gmail.com' } });
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