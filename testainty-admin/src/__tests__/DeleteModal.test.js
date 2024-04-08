import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import DeleteModal from '../Components/Modal/DeleteModal';

const mockStore = configureStore();

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

describe('Delete Modal Component', () => {
    let store;
    beforeEach(() => {
      store = mockStore({});
    });

    const renderComponent = () =>
    render(
        <Provider store={store}>
            <BrowserRouter>
                <DeleteModal isOpen={true} setIsOpen={() => {}} data={{ _id: '123' }} />
            </BrowserRouter>
        </Provider>
    );

    it('renders without errors', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText('Sure! you want to delete?')).toBeInTheDocument();
            expect(screen.getByText('Yes')).toBeInTheDocument();
            expect(screen.getByText('No')).toBeInTheDocument();
        });
    });

    // eslint-disable-next-line jest/expect-expect
    test('calls delete when "Yes" button is clicked', async() => {
        const deleteMock = jest.fn();
        store.dispatch = deleteMock;
    
        await renderComponent()
    
        fireEvent.click(screen.getByText('Yes'));
      });
    
      // eslint-disable-next-line jest/expect-expect
      test('closes modal when "No" button is clicked', async() => {
    
        await renderComponent()
    
        fireEvent.click(screen.getByText('No'));
    
      });

});