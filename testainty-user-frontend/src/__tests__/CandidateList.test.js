import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import CandidateList from '../Components/AllCandidates/CandidateList';
import { searchAllCandidates } from '../Store/candidateSlice';

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
  candidates: {
    loading: false,
    getAllCandidates: {
      status: true,
      message: 'Record Fetched!',
      candidates: [
        {
          _id: '1',
          candidateName: 'John Doe',
          candidateEmail: 'john@example.com',
          status: 'Invited',
        },
      ],
      pages: 1,
    },
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../Store/candidateSlice', () => ({
  ...jest.requireActual('../Store/candidateSlice'),
  searchAllCandidates: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const renderComponent = () =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <CandidateList />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('CandidateList Component', () => {
  it('renders without errors', async () => {
    await renderComponent();
    await waitFor(() => {
      // Check if specific elements are present
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('handles search input change', async () => {
    await renderComponent();

    // Type into the search input
    fireEvent.change(screen.getByPlaceholderText(i18n.t('search')), { target: { value: 'John' } });

    // Wait for the debounce time (500ms) for the search to be triggered
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    // Check if the search function was called with the correct query
    expect(searchAllCandidates).toHaveBeenCalledWith({ offset: 1, limit: 10, query: 'John' });
  });

});
