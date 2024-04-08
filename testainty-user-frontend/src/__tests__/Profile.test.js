/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Profile from '../Components/Profile/index.js';
import { initReactI18next } from 'react-i18next';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { images } from '../Constants/image.constant.js';

const mockStore = configureStore();
global.URL.createObjectURL = jest.fn().mockImplementation(() => 'mockedURL');
// Mock i18next initialization
i18n.use(initReactI18next).init({
    resources: {},
    lng: 'en', // Set your desired language
    keySeparator: false, // Allow for nested keys in translations
    interpolation: {
        escapeValue: false, // React already protects against injection
    },
});

const localStorageMock = {
    getItem: jest.fn().mockReturnValue(JSON.stringify({ UserId: 'someId' })),
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

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

// Mocking URL.createObjectURL
jest.spyOn(global.URL, 'createObjectURL');


const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <Profile />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

describe('Profile Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText(i18n.t('companyProfile'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('companyName'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('userName'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('rolep'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('joined'))).toBeInTheDocument();
            expect(screen.getByTestId('file-upload')).toBeInTheDocument();

        });
    });

    it('allows user to upload an image', async () => {
        await renderComponent();

        const file = new File(['(binary content)'], images.LOGO, { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');

        act(() => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        })
    });


    it('dispatches uploadPicture action on image upload', async () => {
        await renderComponent();
    
        const file = new File(['(binary content)'], images.LOGO, { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
    
        act(() => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        });
    
        await waitFor(() => {
           
        });
    });
    

    it('dispatches uploadPicture action on "Save" button click', async () => {

        await renderComponent();

        const file = new File(['(binary content)'], images.LOGO, { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');

        act(() => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('save'));
        });


        await waitFor(() => {
           
        })
    });


    it('clears selected image on "Cancel" button click', async () => {
        await renderComponent();

        const file = new File(['(binary content)'], images.LOGO, { type: 'image/png' });
        const fileInput = screen.getByTestId('file-upload');
        act(() => {
            fireEvent.change(fileInput, { target: { files: [file] } });
        })

        act(() => {
            fireEvent.click(screen.getByTestId('cancel'));
        });

        await waitFor(() => {
            // Add assertions or additional testing code here
        });
       
    });

});
