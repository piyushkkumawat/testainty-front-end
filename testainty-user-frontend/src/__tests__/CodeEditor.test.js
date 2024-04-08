import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import CodeEditor from '../Components/CodeEditor/CodeEditor.js';

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
    // assessment: {
    //     loading: false,
    //     getAllAssessments: {
    //         "status": true,
    //         "message": "Record Fetched!",
    //         "assessments": [
    //             {
    //                 "_id": "652e1fd89c844ca9654de2d9",
    //                 "assessmentName": "Test Assessment",
    //                 "desc": "asda",
    //                 "assessment_duration": "60",
    //                 "questionBanksId": [
    //                     "652636403cb848a7c1c82c0e"
    //                 ],
    //                 "assessment_url": "test-SDgOAWRQLT",
    //                 "created_by": "64e5a41ec202277d1453e619",
    //                 "customerId": "64d5d93f3a37b44dea7895b7",
    //                 "assessment_status": 0,
    //                 "createdAt": "2023-10-17T05:47:04.468Z",
    //                 "updatedAt": "2023-10-19T11:23:31.750Z",
    //                 "__v": 0,
    //                 "assessment_invite_url": "http://localhost:3001/signup/652e1fd89c844ca9654de2d9/64d5d93f3a37b44dea7895b7/invite",
    //                 "assessment_invite_url_email": "http://localhost:3000/V2/652e1fd89c844ca9654de2d9/invite"
    //             }
    //         ],
    //         pages: 1,
    //     },
    // },
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


// Mocking the Loader component
jest.mock('../Components/Common/Loader', () => <div data-testid="loader">Loader Mock</div>);

// Mocking the SendMail and DeleteAssessment components
jest.mock('../Components/Modal/SendMail', () => <div data-testid="send-mail">SendMail Mock</div>);
jest.mock('../Components/Modal/DeleteAssessment', () => <div data-testid="delete-assessment">DeleteAssessment Mock</div>);

const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <CodeEditor handleNext={() => { }} currentQuestion={0} handlePrevious={() => { }} questions={5} />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

describe('CodeEditor Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Run Code')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
        });
    });

});
