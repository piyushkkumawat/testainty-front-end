import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddQuestionBank from '../Components/OwnerAdminDashboard/AddQuestionBank';


const mockStore = configureStore();

const store = mockStore({
    user: {
        loading: false,
        createQuestionBank: {
            'message': 'Record Fetched!',
            'pages': null,
            'skills': [
                { '_id': '6512a5caa8c4396e74c4fbe3', 'skillName': 'GoLang', 'createdAt': '2023-09-26T09:35:06.503Z', 'updatedAt': '2023-09-26T09:35:06.503Z'},
                { '_id': '6512a5b5a8c4396e74c4fbcf', 'skillName': 'Python', 'createdAt': '2023-09-26T09:34:45.755Z', 'updatedAt': '2023-09-26T09:34:45.755Z'},
                { '_id': '6512a5a6a8c4396e74c4fbcd', 'skillName': 'PHP', 'createdAt': '2023-09-26T09:34:30.476Z', 'updatedAt': '2023-09-26T09:34:30.476Z'}
            ],
            'status': true
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
                <AddQuestionBank />
            </BrowserRouter>
        </Provider>
    );

describe('Add Question Bank Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Add Question Bank')).toBeInTheDocument();
            expect(screen.getByText('Question Bank Description')).toBeInTheDocument();
            expect(screen.getByText('Level')).toBeInTheDocument();
            expect(screen.getByText('Select level')).toBeInTheDocument();
            expect(screen.getByText('Skills')).toBeInTheDocument();
            expect(screen.getByText('Select Skills')).toBeInTheDocument();
            expect(screen.getByTestId('description-input')).toBeInTheDocument();
            expect(screen.getByTestId('qBanklevel-input')).toBeInTheDocument();
            expect(screen.getByTestId('Skills-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
        });
    });

    it('handle user action and submit the form', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'mock description' } });
            fireEvent.change(screen.getByTestId('qBanklevel-input'), { target: { value: 'Intermediate' } });
            fireEvent.change(screen.getByTestId('Skills-input'), { target: { value: 'mockSkill' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        });

          await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/questionBank');
        });
    });


});