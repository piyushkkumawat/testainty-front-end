/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CandidateSignup from '../Components/Candidate/CandidateSignup';
import i18n from 'i18next';
import { I18nextProvider,initReactI18next } from 'react-i18next';
import configureStore from 'redux-mock-store';

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
                    <CandidateSignup />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

describe('Forgot Password Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText(i18n.t('registerTest'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('fullName'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('email'))).toBeInTheDocument();
            expect(screen.getByTestId('candidate-name')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
        });
    });

    it('handles empty form submission', async () => {
        await renderComponent();
        act(() => {
            fireEvent.click(screen.getByTestId('signup'));
        });
        // Assert that appropriate error messages are displayed for required fields
        await waitFor(() => {
            expect(screen.getByText(i18n.t('required'))).toBeInTheDocument();
        });
    });

    it('handles invalid email format', async () => {
        await renderComponent();
        const emailInput = screen.getByTestId('email-input')
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByTestId('signup'));

        // Assert that error message is displayed for invalid email format
        await waitFor(() => {
            expect(screen.getByText(i18n.t('invalidEmailAddress'))).toBeInTheDocument();
        });
    });

    it('submits the form and triggers candidate signup action', async () => {
        await renderComponent();
        act(() => {
            fireEvent.change(screen.getByTestId('candidate-name'), { target: { value: 'Demo demo' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'demo123@gmail.com' } });
        });
        act(() => {
            fireEvent.click(screen.getByTestId('signup'));
        });

        // Wait for the asynchronous actions to complete
        await waitFor(() => {
            // Add your assertions or additional testing code here
        });
    });
});
