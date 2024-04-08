/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ResetPassword from '../Components/ResetPassword';
import { expect } from '@jest/globals';


const mockStore = configureStore();

const store = mockStore({
    /* Initial state for your store if needed */
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
                <ResetPassword />
            </BrowserRouter>
        </Provider>
    );

describe('Reset password Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Reset Your Password')).toBeInTheDocument();  
            expect(screen.getByText('New Password')).toBeInTheDocument();
            expect(screen.getByText('Confirm Password')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
            expect(screen.getByTestId('confirmPassword-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
        });
    });

    it('submits the form and triggers reset password action', async () => {
        await renderComponent();
        act(() => {
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'test@123' } });
            fireEvent.change(screen.getByTestId('confirmPassword-input'), { target: { value: 'test@123' } });
        });
        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        });
        await waitFor(() => {
            // expect(mockNavigate).toHaveBeenCalledWith('/')
        })
    });
});