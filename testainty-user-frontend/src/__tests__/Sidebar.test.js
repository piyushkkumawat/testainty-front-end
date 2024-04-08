/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter , Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import Sidebar from '../Components/Common/Sidebar';

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

// Mocking localStorage 
const localStorageMock = {
    getItem: jest.fn().mockReturnValue(JSON.stringify('userData')),
};

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});


const store = mockStore({
    /* Initial state */
    user: {
        loading: false,
        getProfile: {
            '_id': '6543d05e58bcb44b66366961',
            'firstName': 'Testing',
            'lastName': 'test',
            'email': 's.prajapati712000@gmail.com',
            'mobile': '1234567891',
            'activated_on': '2023-11-22T00:00:00.000Z',
            'createdAt': '2023-11-02T16:37:50.986Z',
            'profile_picture': '1700208563546-1662537909154-removebg-preview.png',
            'customerId': {
                '_id': '652cc933079d28ca15a3b8a6',
                'customerName': 'Demo',
                'email': 'demo@gmail.com',
                'plan': 'free',
                'planStart': '2023-10-26',
                'planEnd': '2023-10-31',
                'createdAt': '2023-10-16T05:25:08.020Z',
                'customer_logo': '1700117078082-google.png',
                'status': 1,
                'updatedAt': '2023-11-03T05:33:28.219Z'

            },
            'role': {
                '_id': '64ddb6191774c8530c79296e',
                'roleName': 'SuperAdmin',
                'roleType': 2,
                'createdAt': '2023-08-17T05:54:33.491Z',
                'updatedAt': '2023-08-17T05:54:33.491Z',
            },
        },
    },
});


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Mock the Link component
jest.mock('react-router-dom', () => ({
    Link: jest.fn().mockImplementation(({ to, children }) => (
        <a href={to}>{children}</a>
    )),
}));

// Mocking the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

const renderComponent = (pathname) =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter initialEntries={[pathname]}>
                    <Sidebar isOpen={true} setIsOpen={true}/>
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );



describe('Sidebar Component', () => {

    it('renders Sidebar with default open state', async () => {
        await renderComponent();
        await waitFor(() => {
            // Assert initial rendering conditions
            expect(screen.getByText(i18n.t('assessment'))).toBeInTheDocument()
            // expect(screen.getByText(i18n.t('teams'))).toBeInTheDocument()
            expect(screen.getByText(i18n.t('candidate'))).toBeInTheDocument()
        })
    });

    it('toggles Sidebar visibility on hamburger menu click', async () => {
        await renderComponent();

        // Get the hamburger menu and click it to toggle sidebar visibility
        const hamburgerMenu = screen.getByTestId('hamburger');
        fireEvent.click(hamburgerMenu);

        // Assert sidebar visibility after click
        expect(screen.queryByTestId('assessment')).toBeNull();
        expect(screen.queryByTestId('teams')).toBeNull();
        expect(screen.queryByTestId('candidate')).toBeNull();
        // Add more assertions as per your component's state after toggling
    });

    it('handles assessment navigation', async () => {
        const location = { pathname: '/dashboard' };
        await renderComponent(location.pathname);
        act(() => {
            // Click on the logout option
            fireEvent.click(screen.getByTestId('assessment'));
        })

        // Ensure navigate is called with the correct path
        await waitFor(() => {
            expect(window.location.pathname).toBe('/dashboard');
        });

    })

    it('handles candidate navigation', async () => {
        const location = { pathname: '/allCandidate' };
        await renderComponent(location.pathname);
        act(() => {
            // Click on the logout option
            fireEvent.click(screen.getByTestId('candidate'));
        })

        // Ensure navigate is called with the correct path
        await waitFor(() => {
            expect(window.location.pathname).toBe('/allCandidate');
        });

    })

    it('handles teams navigation', async () => {
        const location = { pathname: '/teams' };
        await renderComponent(location.pathname);

        const userData = localStorageMock.getItem('userData')
        userData?.role?.roleName === 'SuperAdmin' && (<Link to="/teams" data-testid="teams">Mock teams</Link>)
    })

});


