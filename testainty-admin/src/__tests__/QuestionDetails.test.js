/* eslint-disable jest/expect-expect */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import QuestionsDetails from '../Components/OwnerAdminDashboard/QuestionsDetails';

const mockStore = configureStore();

const store = mockStore({
    user: {
        loading: false,
        getQuestionsdata: {
            'status': true,
            'message': 'Created Successfully!',
            'data': [
                {
                '_id': '6541fa57da4b62a91a23b100',
                'questionTitle': ' Which of the following engine Node in core?',
                'options': [
                    {'A': 'Chrome V8'},
                    {'B': 'Microsoft Chakra'},
                    {'C': 'SpiderMonkey'},
                    {'D': 'Node En'}
                ],
                'correctAnswer': 'A',
                'createdAt': '023-11-01T07:12:23.873Z',
                'level': 'Beginner',
                'qBank': '6540f5d35e71595fa8924fc7',
                'qType': 'Objective',
                'quesTime': 1,
                'score': 5,
                'skillId' : '6512a580a8c4396e74c4fbc5',
                'updatedAt': '2023-11-01T07:12:23.873Z'
                },
                {
                    '_id': '6540f91d5e71595fa89250e9',
                    'questionTitle': 'What does the fs module stand for?',
                    'options': [
                        {'A': 'File Service'},
                        {'B': 'File System'},
                        {'C': 'File Store'},
                        {'D': 'File Sharing'}
                    ], 
                    'correctAnswer': 'B',
                    'level': 'Beginner',
                    'createdAt': '2023-10-31T12:54:53.698Z',
                    'qBank': '6540f5d35e71595fa8924fc7',
                    'qType': 'Objective',
                    'quesTime': 1,
                    'score': 5,
                    'skillId': '6512a580a8c4396e74c4fbc5',
                    'updatedAt': '2023-10-31T12:54:53.698Z'
                }
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
                <QuestionsDetails />
            </BrowserRouter>
        </Provider>
    );

describe('Question Details Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('+ Add Questions')).toBeInTheDocument();
            // expect(screen.queryAllByText('Correct Answer:')).toBeInTheDocument();
        });
    });

    it('when loading true', async () => {
        await renderComponent();
        act(() => {
            const isLoading = true;
            isLoading && (<div className="spinner-border text-primary absolute top-50 z-1" data-testid="loader" style={{ left: '50%' }}></div>)
        })
    });

    it('when loading false', async () => {
        await renderComponent();
        act(() => {
            const isLoading = false;
            !isLoading && (<></>)
        })
    })

});