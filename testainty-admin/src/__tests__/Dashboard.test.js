import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from '../Components/Dashboard/index'
import { act } from 'react-dom/test-utils';

const mockStore = configureStore();

const store = mockStore({
    user: {
        loading: false,
        customerListData: {
            'status': true,
            'message': 'Record Fetched!',
            'pages': 1,
            'customers': [
                {
                    '_id': '6512a767b862b3e2420c4569',
                    'customerName': 'Google',
                    'email': 'google8@mailinator.com',
                    'plan': 'basic',
                    'planStart': '2023-09-26',
                    'createdAt': '2023-09-26T09:41:59.006Z',
                    'customer_logo': '1700117078082-google.png',
                    'planEnd': '2023-10-26',
                    'status': 1,
                    'updatedAt': '2023-11-16T06:44:38.337Z'
                },
                {
                    '_id': '6512a21871bd7ca8554d457a',
                    'customerName': 'Systango',
                    'email': 'systango@gmail.com',
                    'plan': 'free',
                    'planStart': '2023-09-26',
                    'createdAt': '2023-09-26T09:19:20.355Z',
                    'planEnd': '2023-10-26',
                    'status': 1,
                    'updatedAt': '2023-11-14T10:16:17.842Z'
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
                <Dashboard />
            </BrowserRouter>
        </Provider>
    );

describe('Dashboard Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Customer List')).toBeInTheDocument();
            expect(screen.getByText('Create customer')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Plan')).toBeInTheDocument();
            expect(screen.getByText('Start Date')).toBeInTheDocument();
            expect(screen.getByText('Expire Date')).toBeInTheDocument();
            expect(screen.getByText('Status')).toBeInTheDocument();
            expect(screen.getByText('Action')).toBeInTheDocument();
            expect(screen.getByTestId('search-input')).toBeInTheDocument();
            expect(screen.getByTestId('create-btn')).toBeInTheDocument();
        });
    });

    it('trigger create button', async () => {
        await renderComponent();
        act(() => {
            fireEvent.click(screen.getByTestId('create-btn'))
        })
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard/createCustomerForm' )
        })
    }),

    // eslint-disable-next-line jest/expect-expect
    it('handle search', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'mockSearch' } })
        })
    })
    
});