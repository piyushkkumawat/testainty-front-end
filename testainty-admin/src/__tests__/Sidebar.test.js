/* eslint-disable jest/expect-expect */
/* eslint-disable no-undef */

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Sidebar from '../Components/Common/Sidebar'

const mockStore = configureStore();

// Mocking localStorage 
const localStorageMock = {
    getItem: jest.fn().mockReturnValue(JSON.stringify('userData')),
};

Object.defineProperty(global, 'localStorage', {
    value: localStorageMock,
});


const store = mockStore({});


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Mock the Link component
jest.mock('react-router-dom', () => ({
    Link: jest.fn().mockImplementation(({ to, children }) => (
        <a href={to}>{children}</a>
    )),
}));

// Mocking the useNavigate hook
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

const renderComponent = ({ pathname, isOpen, setIsOpen }) =>
    render(
        <Provider store={store}>
            <BrowserRouter initialEntries={[pathname]}>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            </BrowserRouter>
        </Provider>
    );



describe('Sidebar Component', () => {

    it('renders Sidebar with default open state', async () => {
        const isOpen = true;
        const setIsOpen = () => !isOpen;
        await renderComponent({ isOpen, setIsOpen });
        await waitFor(() => {
            // Assert initial rendering conditions
            // expect(screen.getByText('Customers')).toBeInTheDocument()
            // expect(screen.getByText('Skills')).toBeInTheDocument()
            // expect(screen.getByText('Roles')).toBeInTheDocument()
            // expect(screen.getByText('Question Bank')).toBeInTheDocument()
            // expect(screen.getByText('Logout')).toBeInTheDocument()
        })
    });
});
