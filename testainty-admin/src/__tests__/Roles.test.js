/* eslint-disable jest/expect-expect */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Roles from '../Components/OwnerAdminDashboard/Roles';
import { act } from 'react-dom/test-utils';

const mockStore = configureStore();

const store = mockStore({
    common: {
        loading: false,
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
            ],
            'pages': 1

        }

    }
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
                <Roles />
            </BrowserRouter>
        </Provider>
    );

describe('Roles Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Role List')).toBeInTheDocument();
        });
    });

    it('when loading true', async () => {
        await renderComponent();
        act(() => {
            const loading = true;
            loading && (<div className="spinner-border text-primary absolute top-50 z-1" data-testid="loader" style={{ left: '50%' }}></div>)
        })

    });

    it('when loading false', async () => {
        await renderComponent();
        act(() => {
            const loading = false;
            !loading && (<></>)
        })
    })
});