import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateCustomerForm from '../Components/OwnerAdminDashboard/CreateCustomerForm';

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
                <CreateCustomerForm />
            </BrowserRouter>
        </Provider>
    );

describe('Add Supper Admin Form Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Create Customer')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Plan')).toBeInTheDocument();
            expect(screen.getByText('Select Your Plan')).toBeInTheDocument();
            expect(screen.getByText('Start Date')).toBeInTheDocument();
            expect(screen.getByText('End Date')).toBeInTheDocument();
            expect(screen.getByText('Submit')).toBeInTheDocument();
            expect(screen.getByText('Cancel')).toBeInTheDocument();
            expect(screen.getByTestId('name-input')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('plan-input')).toBeInTheDocument();
            expect(screen.getByTestId('sdate-input')).toBeInTheDocument();
            expect(screen.getByTestId('edate-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
            expect(screen.getByTestId('reset')).toBeInTheDocument()
        });
    });

    // eslint-disable-next-line jest/expect-expect
    it('handle user action and submit the form', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'mockFName' } });
            fireEvent.change(screen.getByTestId('plan-input'), { target: { value: 'mockDate' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'mock@gmail.com' } });
            fireEvent.change(screen.getByTestId('sdate-input'), { target: { value: 'mockSDate' } });
            fireEvent.change(screen.getByTestId('edate-input'), { target: { value: 'mockEDate' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        });
    });
});