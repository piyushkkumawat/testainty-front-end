import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import NavBar from '../Components/Common/NavBar';


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

const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <NavBar />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

describe('NavBar Component', () => {
    it('renders profile and logout when show is true', async () => {
        await renderComponent()

        await waitFor(() => {
            expect(screen.queryByTestId('profile')).toBeNull();
            expect(screen.queryByTestId('logout')).toBeNull();

            fireEvent.click(screen.getByTestId('button-that-shows-items'));

            expect(screen.getByTestId('profile')).toBeVisible();
            expect(screen.getByTestId('logout')).toBeVisible();
        });
    });

    it('handles toggle of the profile menu', async () => {
        await renderComponent()
        // Initially, the profile menu shouldn't be visible
        await waitFor(() => {
            expect(screen.queryByTestId('profile')).toBeNull();
            expect(screen.queryByTestId('logout')).toBeNull();

            // Click to toggle the profile menu
            fireEvent.click(screen.getByTestId('profile_image'));

            // Now, the profile menu should be visible
            expect(screen.getByTestId('profile')).toBeVisible();
            expect(screen.getByTestId('logout')).toBeVisible();
        })
    });

    it('handles profile navigation', async () => {
        await renderComponent()
        act(() => {
            // Click to toggle the profile image
            fireEvent.click(screen.getByTestId('profile_image'));
        })

        act(() => {
            // Click on the profile option
            fireEvent.click(screen.getByTestId('profile'));
        })

        // Ensure navigate is called with the correct path
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/profile');
        });
    });

    it('handles logout navigation', async () => {
        await renderComponent();

        act(() => {
            // Click to toggle the profile image
            fireEvent.click(screen.getByTestId('profile_image'));
        })

        act(() => {
            // Click on the logout option
            fireEvent.click(screen.getByTestId('logout'));
        })

        // Ensure navigate is called with the correct path
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
    
});
