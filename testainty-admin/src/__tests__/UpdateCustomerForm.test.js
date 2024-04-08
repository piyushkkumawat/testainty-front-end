/* eslint-disable jest/expect-expect */
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import UpdateCustomerForm from '../Components/OwnerAdminDashboard/UpdateCustomerForm';


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

const renderComponent = () =>
render(
    <Provider store={store}>
        <BrowserRouter>
            <UpdateCustomerForm/>
        </BrowserRouter>
    </Provider>
);

describe('Update Customer Form Component', () => {
    
    it('renders without errors', async () => {
        await renderComponent();
        // await waitFor(() => {
        //     expect(screen.getByText('Update Customer Data')).toBeInTheDocument();
        //     expect(screen.getByText('Name')).toBeInTheDocument();
        //     expect(screen.getByText('Email')).toBeInTheDocument();
        //     expect(screen.getByText('Plan')).toBeInTheDocument();
        //     expect(screen.getByText('Select Your Plan')).toBeInTheDocument();
        //     expect(screen.getByText('Start Date')).toBeInTheDocument();
        //     expect(screen.getByText('End Date')).toBeInTheDocument();
        //     expect(screen.getByText('Submit')).toBeInTheDocument();
        //     expect(screen.getByText('Cancel')).toBeInTheDocument();
        //     expect(screen.getByTestId('name-input')).toBeInTheDocument();
        //     expect(screen.getByTestId('email-input')).toBeInTheDocument();
        //     expect(screen.getByTestId('plan-input')).toBeInTheDocument();
        //     expect(screen.getByTestId('startDate-input')).toBeInTheDocument();
        //     expect(screen.getByTestId('endDate-input')).toBeInTheDocument();
        //     expect(screen.getByTestId('reset')).toBeInTheDocument();
        //     expect(screen.getByTestId('submit')).toBeInTheDocument();
        // });
    });

});