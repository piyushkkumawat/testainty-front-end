import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateSkill from '../Components/OwnerAdminDashboard/CreateSkill';

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
                <CreateSkill />
            </BrowserRouter>
        </Provider>
    );

describe('Create Skill Component', () => {
    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Add Skill')).toBeInTheDocument();
            expect(screen.getByText('Skill')).toBeInTheDocument();
            expect(screen.getByText('Submit')).toBeInTheDocument();
            expect(screen.getByTestId('skillName-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit')).toBeInTheDocument();
        });
    });

    it('handle user action and submit the form', async () => {
        await renderComponent();

        act(() => {
            fireEvent.change(screen.getByTestId('skillName-input'), { target: { value: 'mockName' } });
        });

        act(() => {
            fireEvent.click(screen.getByTestId('submit'));
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/skills')
        })

    });


});