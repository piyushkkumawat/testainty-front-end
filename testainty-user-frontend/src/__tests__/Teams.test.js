/* eslint-disable react/display-name */
/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import Teams from '../Components/Teams';

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
    getItem: jest.fn().mockReturnValue(JSON.stringify({ UserId: 'someId' })),
};

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});


const store = mockStore({
    /* Initial state */
    teams: {
        loading: false,
        getAllTeams: {
            'message': 'Record Fetched!',
            'pages': 1,
            'status': true,
            'users': [
                {
                    '_id': '654399237191eeb48d2ef4a6',
                    'firstName': 'Testing',
                    'lastName': 'demo',
                    'email': 's.prajapati712000@gmail.com',
                    'mobile': '9999999991',
                    'password': '$2a$10$OvftMwSyKgVvvrrY.OST1.z0g7791pL9Qym5do3Z5CjFbUx/9jClO',
                    'role': '6512a0e40570d63717af00a9',
                    'status': 1,
                    'updatedAt': '2023-11-08T06:33:04.240Z',
                    'rolearr': {
                        '_id': '6512a0e40570d63717af00a9',
                        'roleName': 'Owner',
                        'roleType': 1,
                        'createdAt': '2023-09-26T09:14:12.688Z',
                        'updatedAt': '2023-09-26T09:14:12.688Z',
                    }
                },
                {
                    '_id': '6528ee48b2e33d4b292d6e26',
                    'firstName': 'Navdeep Admin',
                    'email': 'vijaymaestrosinfotech@gmail.com',
                    'customerId': '6512a767b862b3e2420c4569',
                    'role': '6512a0f60570d63717af00ad',
                    'status': 1,
                    'updatedAt': '2023-11-03T09:52:12.454Z',
                    'rolearr': {
                        '_id': '6512a0f60570d63717af00ad',
                        'roleName': 'Admin',
                        'roleType': 3,
                        'createdAt': '2023-09-26T09:14:30.782Z',
                        'updatedAt': '2023-09-26T09:14:30.782Z',
                    }
                }
            ],


        },
    },
});


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

jest.mock('../Components/Modal/DeleteAssessment', () => () => <div data-testid='delete-assessment'>DeleteAssessment Mock</div>);

const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <Teams />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );


describe('Teams Component', () => {
    it('renders Teams component without error', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByTestId('search-input')).toBeInTheDocument();
            expect(screen.getByTestId('inviteAdmin')).toBeInTheDocument();
        })
    });

    it('handles user interaction', async () => {
        await renderComponent()
        act(() => {
            fireEvent.click(screen.getByTestId('inviteAdmin'));
        })
        act(() => {
            fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'testing' } });
        })
    });

    it('When loading true', async () => {
        const modifiedStore = mockStore({
            teams: {
                loading: true,
                getAllTeams: {}
            }
        });
        await renderComponent();
        render(
            <Provider store={modifiedStore}>
                <I18nextProvider i18n={i18n}>
                    <BrowserRouter>
                        <Teams />
                    </BrowserRouter>
                </I18nextProvider>
            </Provider>
        );
    });
})
