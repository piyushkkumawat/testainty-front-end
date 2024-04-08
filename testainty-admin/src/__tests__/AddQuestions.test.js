import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddQuestions from '../Components/OwnerAdminDashboard/AddQuestions';


const mockStore = configureStore();

const store = mockStore({});

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
                <AddQuestions />
            </BrowserRouter>
        </Provider>
    );

describe('Add Questions Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Add Question')).toBeInTheDocument();
            expect(screen.getByText('Question Type')).toBeInTheDocument();
            expect(screen.getByText('Question')).toBeInTheDocument();
            expect(screen.getByText('Options')).toBeInTheDocument();
            expect(screen.getByText('Currect Answer')).toBeInTheDocument();
            expect(screen.getByText('Select Currect Answer')).toBeInTheDocument();
            expect(screen.getByTestId('select-input')).toBeInTheDocument();
            expect(screen.getByTestId('question-input')).toBeInTheDocument();
            // expect(screen.getByTestId('option-input')).toBeInTheDocument();
            // expect(screen.getByTestId('correctAnswer-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
        });
    });

    // eslint-disable-next-line jest/expect-expect
    it('handle user action and submit the form', async () => {
        await renderComponent();
        act(() => {
            fireEvent.change(screen.getByTestId('select-input'), { target: { value: 'mockdata' } });
            fireEvent.change(screen.getByTestId('question-input'), { target: { value: 'mockdata' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        });

          await waitFor(() => {
            // expect(mockNavigate).toHaveBeenCalledWith('/questionBank');
        });
    });
});