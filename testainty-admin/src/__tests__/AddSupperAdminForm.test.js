import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AddSuperAdminForm from '../Components/OwnerAdminDashboard/AddSuperAdminForm';

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
                <AddSuperAdminForm />
            </BrowserRouter>
        </Provider>
    );

describe('Add Supper Admin Form Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Create Super Admin')).toBeInTheDocument();
            expect(screen.getByText('First Name')).toBeInTheDocument();
            expect(screen.getByText('Last Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Mobile')).toBeInTheDocument();
            expect(screen.getByText('Joining Date')).toBeInTheDocument();
            expect(screen.getByText('Submit')).toBeInTheDocument();
            expect(screen.getByTestId('fname-input')).toBeInTheDocument();
            expect(screen.getByTestId('lname-input')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('mobile-input')).toBeInTheDocument();
            expect(screen.getByTestId('date-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
        });
    });

    // eslint-disable-next-line jest/expect-expect
    it('handle user action and submit the form', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('fname-input'), { target: { value: 'mockFName' } });
            fireEvent.change(screen.getByTestId('lname-input'), { target: { value: 'mockLName' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'mock@gmail.com' } });
            fireEvent.change(screen.getByTestId('mobile-input'), { target: { value: '123567899' } });
            fireEvent.change(screen.getByTestId('date-input'), { target: { value: 'mockDate' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        });

    });


});