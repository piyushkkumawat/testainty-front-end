/* eslint-disable jest/expect-expect */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import SubAdmins from '../Components/OwnerAdminDashboard/SubAdmins';
import { act } from 'react-dom/test-utils';

const mockStore = configureStore();

const store = mockStore({
    user: {
        loading: false,
        subAdminsData: {
            'status': true,
            'message': 'Record Fetched!',
            'pages': 1,
            'subadmins': [
                {
                    '_id': '6565bedc82a0a81d65cde001',
                    'firstName': 'hi',
                    'lastName': 'jo',
                    'email': 'pankajdev14@gmail.com',
                    'password': '$2a$10$M.6XFFSUNXE8YbBRRLfZh.VyOs9u.XMOHuIokNQr2i5/QjGFGnvBi',
                    'mobile': '7389035775',
                    'role': '656426e26015916c7e5043c9',
                    'createdAt': '2023-11-28T10:20:12.880Z',
                    'updatedAt': '2023-11-28T10:20:12.880Z',
                },
                {
                    '_id': '6565bad649fd19f47a1922e1',
                    'firstName': 'Navdeep',
                    'lastName': 'Gupta',
                    'email': 'navdeep@mailinator.com',
                    'password': '$2a$10$FdNRBVSKCaBmUtT4gRTUvuC/9tyXP/khByz8OupSu4FGARvIfuc2m',
                    'role': '656426e26015916c7e5043c9',
                    'updatedAt': '2023-11-28T10:03:02.702Z',
                    'createdAt': '2023-11-28T10:03:02.702Z',
                    'mobile': '7389035775'
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
                <SubAdmins />
            </BrowserRouter>
        </Provider>
    );

describe('Dashboard Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Author List')).toBeInTheDocument();
            expect(screen.getByText('+ Create Author')).toBeInTheDocument();
            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();
            expect(screen.getByText('Action')).toBeInTheDocument();
            expect(screen.getByTestId('search-input')).toBeInTheDocument();
            expect(screen.getByTestId('create-btn')).toBeInTheDocument();
        });
    });

        it('handle search', async () => {
            await renderComponent();
            act(() => {
                fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'mockSearch' } })
            })
        })

});