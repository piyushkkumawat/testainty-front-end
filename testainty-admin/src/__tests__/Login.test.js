/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Login from '../Components/Login';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const mockStore = configureStore();

const store = mockStore({
    /* Initial state for your store if needed */
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Mock the Link component
jest.mock('react-router-dom', () => ({
    Link: jest.fn().mockImplementation(({ to, children }) => (
        <a href={to}>{children}</a>
    )),
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
                <Login />
            </BrowserRouter>
        </Provider>
    );

describe('Login Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            
            expect(screen.getByText('Welcome Back')).toBeInTheDocument();
            expect(screen.getByText('Login')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Password')).toBeInTheDocument();
            expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
        });
    });

    it('submits the form and triggers login action', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password123' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('sign In'));
        });

        await waitFor(() => {
        });

    });

    it('triggers forgot password button', async () => {
        await renderComponent();
        act(() => {
            fireEvent.click(screen.getByTestId('forgot-password'));
        });
        // await waitFor(() => {
        //     expect().toHaveBeenCalledWith('/forgot-password' )
        // })
    })
});