import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import Preview from '../Components/Test/Preview';

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
    createAssessment: {
        value: 0,
        basicDetails: {
            'assessmentName': 'Demo',
            'assessment_duration': 15,
            'desc': 'Demo test'
        },
        selectedQBank: [
            { 'questionBanksId': '6541e8b7572b0d7a4cb44472', 'qBankName': 'React Beginner' },
            { 'questionBanksId': '6540f5d35e71595fa8924fc7', 'qBankName': 'NodeJs Beginner' }
        ],

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
                    <Preview />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

describe('Preview Component', () => {
    // let store;

    // beforeEach(() => {
    //   store = createStore(reducer, applyMiddleware(thunk));

    //   // Mock the useSelector hook to provide the expected state
    //   jest.spyOn(require('react-redux'), 'useSelector').mockImplementation((callback) =>
    //     callback(store.getState())
    //   );
    // });

    it('renders the component with initial data', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText(i18n.t('namec'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('durationc'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('disallow'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('logTab'))).toBeInTheDocument();
            expect(screen.getByText(i18n.t('makeFullscreen'))).toBeInTheDocument();
            expect(screen.getByTestId('previous')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
        })

    });

    it('handles previous button', async () => {
        await renderComponent();

        fireEvent.click(screen.getByTestId('previous'));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/setting');
        });

    });

    it('handles form submission', async () => {
        await renderComponent();

        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        })

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });

    });


});