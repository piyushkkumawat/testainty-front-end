/* eslint-disable jest/expect-expect */
import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdminDashboardLayout from '../Components/Layouts/AdminDashboardLayout';


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
            <AdminDashboardLayout />
        </BrowserRouter>
    </Provider>
);

describe('Admin Dashboard Layout Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
    });
});