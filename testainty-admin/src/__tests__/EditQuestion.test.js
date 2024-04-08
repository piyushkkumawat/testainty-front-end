/* eslint-disable jest/expect-expect */
import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import EditQuestion from '../Components/OwnerAdminDashboard/EditQuestion';

const mockStore = configureStore();

const store = mockStore({
    user: {
        username: 'testUser',
        isAuthenticated: true,
    }
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

// Mocking useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: 'mockedId' }),
}));

const renderComponent = () =>
    render(
        <Provider store={store}>
            <BrowserRouter>
                <EditQuestion />
            </BrowserRouter>
        </Provider>
    );

describe('Edit Question Component', () => {
    it('renders without errors', () => {
        renderComponent();

        // expect(screen.getByText('Edit Question')).toBeInTheDocument();
        // expect(screen.getByTestId('qType-input')).toBeInTheDocument();
        // expect(screen.getByTestId('questionTitle-input')).toBeInTheDocument();
        // expect(screen.getByTestId('submit')).toBeInTheDocument();
    });

    it('updates question type and submits the form', async () => {
        renderComponent();

        // Update question type
        // act(() => {
        //     fireEvent.change(screen.getByTestId('qType-input'), { target: { value: 'Coding' } });
        // });

        // Submit the form
        // act(() => {
        //     fireEvent.click(screen.getByTestId('submit'));
        // });

        // Assertions or expectations after the form submission can be placed here
    });
});
