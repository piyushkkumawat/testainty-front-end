/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Signup from '../Components/Signup';

const mockStore = configureStore();

const store = mockStore({
    common: {
        loading: false,
        error: null,
        data: {
            'message': 'Record Fetched!',
            'status': true,
            data: [
                {
                    '_id': '6512a0e40570d63717af00a9',
                    'roleName': 'Owner',
                    'roleType': 1,
                    'createdAt': '2023-09-26T09:14:12.688Z',
                    'updatedAt': '2023-09-26T09:14:12.688Z',
                },
                {
                    '_id': '6512a0ef0570d63717af00ab',
                    'roleName': 'SuperAdmin',
                    'roleType': 2,
                    'createdAt': '2023-09-26T09:14:23.538Z',
                    'updatedAt': '2023-09-26T09:14:23.538Z'
                },
                {
                    '_id': '6512a0f60570d63717af00ad',
                    'roleName': 'Admin',
                    'roleType': 3,
                    'createdAt': '2023-09-26T09:14:30.782Z',
                    'updatedAt': '2023-09-26T09:14:30.782Z',
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
                <Signup />
            </BrowserRouter>
        </Provider>
    );

describe('Signup Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Create an Account')).toBeInTheDocument();
            expect(screen.getByText('Company Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Password')).toBeInTheDocument();
            expect(screen.getByText('confirm password')).toBeInTheDocument();
            expect(screen.getByText('Gender')).toBeInTheDocument();
            expect(screen.getByText('Male')).toBeInTheDocument();
            expect(screen.getByText('Female')).toBeInTheDocument();
            expect(screen.getByText('Role')).toBeInTheDocument();
            expect(screen.getByText('Select a role')).toBeInTheDocument();
            expect(screen.getByText('Sign Up')).toBeInTheDocument();
            expect(screen.getByTestId('sign-Up')).toBeInTheDocument();
            expect(screen.getByTestId('name-input')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
            expect(screen.getByTestId('confirmpassword-input')).toBeInTheDocument();
            expect(screen.getByTestId('radio1-input')).toBeInTheDocument();
            expect(screen.getByTestId('radio2-input')).toBeInTheDocument();
            expect(screen.getByTestId('select-input')).toBeInTheDocument();
        });
    });

    it('submits the form and triggers signup button', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
            fireEvent.change(screen.getByTestId('confirmpassword-input'), { target: { value: 'password123' } });
            fireEvent.change(screen.getByTestId('radio1-input'), { target: { value: 'male' } });
            fireEvent.change(screen.getByTestId('radio2-input'), { target: { value: 'female' } });
            fireEvent.change(screen.getByTestId('select-input'), { target: { value: 'Admin' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('sign-Up'));
        });

        // await waitFor(() => {
        //     expect(mockNavigate).toHaveBeenCalledWith('/login');
        // });

    });

});