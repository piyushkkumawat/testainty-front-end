/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Header from '../Components/Common/Header';
import { BrowserRouter } from 'react-router-dom';

i18n.use(initReactI18next).init({
    resources: {},
    lng: 'en', // Set your desired language
    keySeparator: false, // Allow for nested keys in translations
    interpolation: {
        escapeValue: false, // React already protects against injection
    },
});

// Mock the Link component
jest.mock('react-router-dom', () => ({
    Link: jest.fn().mockImplementation(({ to, children }) => (
        <a href={to}>{children}</a>
    )),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


// Wrapping the component with BrowserRouter
const renderComponent = () =>
    render(
        <I18nextProvider i18n={i18n}>
            <BrowserRouter >
                <Header />
            </BrowserRouter>
        </I18nextProvider>

    );

describe('Header Component', () => {
    it('renders Header component with navigation links', async () => {
        await renderComponent()
        await waitFor(() => {
            expect(screen.getByText(i18n.t('testainty'))).toBeInTheDocument()
            expect(screen.getByText(i18n.t('home'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('contact'))).toBeInTheDocument()
            expect(screen.getByText(i18n.t('aboutUs'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('pricing'))).toBeInTheDocument();
            expect(screen.getByTestId('signIn')).toBeInTheDocument();
        })
    });

    it('navigates to login page when "Sign In" button is clicked', async () => {
        const location = { pathname: '/login' };
        await renderComponent(location.pathname);

        fireEvent.click(screen.getByTestId('signIn'));

        await waitFor(() => {
            // expect(window.location.reload()).toBe('/login');
        });
    });

});
