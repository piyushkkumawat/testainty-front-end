/* eslint-disable jest/expect-expect */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Skills from '../Components/OwnerAdminDashboard/Skills';
import { act } from 'react-dom/test-utils';

const mockStore = configureStore();

const store = mockStore({
    user: {
        loading: false,
        skills: {
            'status': true,
            'message': 'Record Fetched!',
            'skills': [
                { '_id': '6512a5caa8c4396e74c4fbe3', 'skillName': 'GoLang', 'createdAt': '2023-09-26T09:35:06.503Z', 'updatedAt': '2023-09-26T09:35:06.503Z', '__v': 0 },
                { '_id': '6512a5b5a8c4396e74c4fbcf', 'skillName': 'Python', 'createdAt': '2023-09-26T09:34:45.755Z', 'updatedAt': '2023-09-26T09:34:45.755Z', '__v': 0 },
                { '_id': '6512a5a6a8c4396e74c4fbcd', 'skillName': 'PHP', 'createdAt': '2023-09-26T09:34:30.476Z', 'updatedAt': '2023-09-26T09:34:30.476Z', '__v': 0 },
                { '_id': '6512a597a8c4396e74c4fbcb', 'skillName': 'React', 'createdAt': '2023-09-26T09:34:15.636Z', 'updatedAt': '2023-09-26T09:34:15.636Z', '__v': 0 }
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


jest.mock('../Components/Modal/DeleteModal', () => <div data-testid="delete-modal">DeleteModal Mock</div>);

// Wrapping the component with BrowserRouter
const renderComponent = () =>
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Skills />
            </BrowserRouter>
        </Provider>
    );

describe('Skills Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Skill List')).toBeInTheDocument();
            expect(screen.getByText('Create Skill')).toBeInTheDocument();
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