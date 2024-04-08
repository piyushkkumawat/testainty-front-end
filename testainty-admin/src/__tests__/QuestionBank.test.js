import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import QuestionBank from '../Components/OwnerAdminDashboard/QuestionBank';

const mockStore = configureStore();

const store = mockStore({
    user: {
        loading: false,
        questionsBankData: {
            'status': true,
            'message': 'Record Fetched!',
            'pages': 1,
            'qBanks': [
                {
                    '_id': '6541e8b7572b0d7a4cb44472',
                    'qBankName': 'React Beginner',
                    'qBanklevel': 'Beginner',
                    'questionsIds': [],
                    'skill': '6512a597a8c4396e74c4fbcb',
                    'timealloted': 0,
                    'totalQuestions': 0,
                    'totalScore': 0,
                    'updatedAt': '2023-11-01T05:57:11.639Z',
                    'createdAt': '2023-11-01T05:57:11.639Z'
                },
                {
                    '_id': '6540f5d35e71595fa8924fc7',
                    'qBankName': 'NodeJs Beginner',
                    'skill': '6512a580a8c4396e74c4fbc5',
                    'qBanklevel': 'Beginner',
                    'questionsIds': [
                        '6541f9d1da4b62a91a23b0bf',
                        '6541fa57da4b62a91a23b100',
                        '6540f6615e71595fa8925025',
                        '6540f8215e71595fa892506e',
                        '6540f62d5e71595fa8925005',
                        '6540f6a95e71595fa8925040',
                        '6540f8c95e71595fa89250bb',
                        '6540f91d5e71595fa89250e9',
                        '6541fa07da4b62a91a23b0d2',
                        '6540f8655e71595fa8925089',
                        '6541fa2dda4b62a91a23b0e5',
                        '6541f9a0da4b62a91a23b096',
                        '6540f6e15e71595fa8925053',
                        '6540f8a25e71595fa89250a8',
                        '6540f8ec5e71595fa89250ce'
                    ],
                    'timealloted': 15,
                    'totalQuestions': 15,
                    'totalScore': 75,
                    'updatedAt': '2023-11-01T07:12:24.113Z',
                    'createdAt': '2023-10-31T12:40:51.993Z'
                },
            ]
        }
    }
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

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

// Wrapping the component with BrowserRouter
const renderComponent = () =>
    render(
        <Provider store={store}>
            <BrowserRouter>
                <QuestionBank />
            </BrowserRouter>
        </Provider>
    );

describe('Question Bank Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Question Bank List')).toBeInTheDocument();
            expect(screen.getByText('+ Question Bank')).toBeInTheDocument();
        });
    });
});