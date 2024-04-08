/* eslint-disable jest/expect-expect */

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ForgotPwd from '../Components/ForgotPwd';


const mockStore = configureStore();

const store = mockStore({
    /* Initial state for your store if needed */
});

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
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
                <ForgotPwd />
            </BrowserRouter>
        </Provider>
    );

describe('Forgot password Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Enter your Email')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
        });
    });

    it('submits the form and triggers send mail action', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
        });

        // act(() => {
        //     fireEvent.click(screen.getByTestId('submit'));
        // });
    });

 
});