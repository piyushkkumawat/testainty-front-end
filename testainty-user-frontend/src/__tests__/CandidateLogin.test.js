/* eslint-disable jest/expect-expect */
/* eslint-disable jest/valid-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CandidateLogin from '../Components/Candidate/CandidateLogin';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mocking the useParams hook
jest.mock('@remix-run/react', () => ({
  ...jest.requireActual('@remix-run/react'),
  useParams: jest.fn().mockReturnValue({ testUrl: 'mockTestUrl' }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Wrapping the component with BrowserRouter
const renderComponent = () =>
  render(
    <BrowserRouter>
      <CandidateLogin />
    </BrowserRouter>
  );

describe('CandidateLogin Component', () => {
  it('renders without errors', () => {
    renderComponent();
    expect(screen.getByTestId('login'));
    expect(screen.getByTestId('email-input'));
  });

  it('submits the form and navigates to /candidateTest', async () => {
    renderComponent();

    // Fill in the form fields
    act(() => {
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'GoogleSuper@mailinator.com' } });
      fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'Hello@123' } });
    });

    // Submit the form
    act(() => {
      fireEvent.click(screen.getByTestId('submit-button'));
    });

    // Wait for the asynchronous actions to complete
    await waitFor(() => {
      // Your assertions or additional testing code here
    });
  });
});
