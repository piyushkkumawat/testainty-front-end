import { render, screen, waitFor } from '@testing-library/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import CreateAssessment from '../Components/Test/CreateAssessment';

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



jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

const renderComponent = (store) =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter >
                    <CreateAssessment />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );


describe('CreateAssessment component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            createAssessment: {
                value: 0,
            },
        });

        // Mock useSelector to provide the expected state value
        jest.spyOn(require('react-redux'), 'useSelector').mockImplementation((callback) =>
            callback(store.getState())
        );
    });

    it('renders with the correct title', async() => {
        await renderComponent(store);
        
        await waitFor(() => {
            expect(screen.getByText('createAssessment')).toBeInTheDocument();
        })
    });

    it('does not render the Stepper if value is 4', async() => {
        store = mockStore({
            createAssessment: {
                value: 4,
            },
        });

        await renderComponent(store);

        await waitFor(() => {
            expect(screen.queryByTestId('stepper')).toBeNull();
        })
    });
});