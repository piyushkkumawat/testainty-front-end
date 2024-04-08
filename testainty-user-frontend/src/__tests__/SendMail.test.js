import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import SendMail from '../Components/Modal/SendMail';
import { inviteCandidates } from '../Store/assessmentSlice';

const mockStore = configureStore();

i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

const store = mockStore({
  assessment: {
    loading: false,
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../Store/assessmentSlice', () => ({
  ...jest.requireActual('../Store/assessmentSlice'),
  inviteCandidates: jest.fn(),
}));

const renderComponent = (isOpen, setIsOpen, data) =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SendMail isOpen={true} setIsOpen={setIsOpen} data={data} />
      </I18nextProvider>
    </Provider>
  );

describe('SendMail Component', () => {
  it('renders without errors', async () => {
    const isOpen = true;
    const setIsOpen = jest.fn();
    const data = { _id: '1', assessment_url: 'test-url' };

    await renderComponent(isOpen, setIsOpen, data);

    await waitFor(() => {
      expect(screen.getByText('inviteCandidates')).toBeInTheDocument();
      expect(screen.getByTestId('name-input')).toBeInTheDocument();
      expect(screen.getByLabelText('candidateEmail')).toBeInTheDocument();
    });
  });

  it('handles form submission and dispatches inviteCandidates action', async () => {
    const isOpen = true;
    const setIsOpen = jest.fn();
    const data = { _id: '1', assessment_url: 'test-url' };

    await renderComponent(isOpen, setIsOpen, data);

    // Fill out the form
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(i18n.t('candidateEmail')), { target: { value: 'john@example.com' } });

    fireEvent.click(screen.getByText('submit'));

    await waitFor(() => {
      expect(inviteCandidates).toHaveBeenCalledWith({
        candidateName: 'John Doe',
        candidateEmail: 'john@example.com',
        assessment_url: 'test-url',
        assessment_id: '1',
      });
    });
  });

  // Add more test cases for user interactions, validation, etc.
});
