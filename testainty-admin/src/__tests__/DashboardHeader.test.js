import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DashboardHeader from '../Components/Common/DashboardHeader';


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
            <DashboardHeader />
        </BrowserRouter>
    </Provider>
);

describe('Dashboard Header Component', () => {
    // eslint-disable-next-line jest/expect-expect
    it('renders without errors', async () => {
        await renderComponent();
    });
});