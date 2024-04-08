import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFound from '../../src/Components/404/NotFound'


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
            <NotFound />
        </BrowserRouter>
    </Provider>
);

describe('404 Not Found Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Go Back Login')).toBeInTheDocument();
            expect(screen.getByText('404')).toBeInTheDocument();
            expect(screen.getByText('Page not found')).toBeInTheDocument();
            expect(screen.getByText('Sorry, the page you are looking for does not exist.')).toBeInTheDocument();
        });
    });
});