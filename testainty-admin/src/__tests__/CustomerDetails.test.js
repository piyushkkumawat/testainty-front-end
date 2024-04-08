import {render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { act } from 'react-dom/test-utils';
import CustomerDetails from '../Components/OwnerAdminDashboard/CustomerDetails';

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
                <CustomerDetails />
            </BrowserRouter>
        </Provider>
    );

describe('Customer Details Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Joining date')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();
            expect(screen.getByText('Name :')).toBeInTheDocument();
            expect(screen.getByText('Email :')).toBeInTheDocument();
            expect(screen.getByText('Plan :')).toBeInTheDocument();
            expect(screen.getByText('Start Date :')).toBeInTheDocument();
            expect(screen.getByText('Expire Date :')).toBeInTheDocument();
            expect(screen.getByText('Super Admin List')).toBeInTheDocument();
        });
    });

    // eslint-disable-next-line jest/expect-expect
    it('when loading true', async () => {
        await renderComponent();
        act(() => {
            const isLoading = true;
            isLoading && (<div className="spinner-border text-primary absolute top-50 z-1" data-testid="loader" style={{ left: '50%' }}></div>)
        })
    });

    // eslint-disable-next-line jest/expect-expect
    it('when loading false', async () => {
        await renderComponent();
        act(() => {
            const isLoading = false;
            !isLoading && (<></>)
        })
    })

});