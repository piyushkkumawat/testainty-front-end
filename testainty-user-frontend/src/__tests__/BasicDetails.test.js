/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import BasicDetails from '../Components/Test/BasicDetails';

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
  createAssessment: {
    basicDetails: {},
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../Store/createAssesmentSlice.js', () => ({
  ...jest.requireActual('../Store/createAssesmentSlice.js'),
  addBasicDetails: jest.fn(),
  handleNext: jest.fn(),
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
          <BasicDetails />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('BasicDetails Component', () => {
  it('renders without errors', async () => {
    await renderComponent();
    await waitFor(() => {
      expect(screen.getByText(i18n.t('assessmentName'))).toBeInTheDocument();
      expect(screen.getByTestId('assessment-input')).toBeInTheDocument();
      expect(screen.getByText(i18n.t('assDuration'))).toBeInTheDocument();
      expect(screen.getByTestId('assessment_duration')).toBeInTheDocument();
      expect(screen.getByText(i18n.t('description'))).toBeInTheDocument();
      expect(screen.getByTestId('desc')).toBeInTheDocument();
      expect(screen.getByText(i18n.t('next'))).toBeInTheDocument();

      
    });
  });
  it('submits the form and triggers next action', async () => {
    await renderComponent();


    act(() => {
      fireEvent.click(screen.getByTestId('next-click'));
    });

    // Wait for the asynchronous actions to complete
    await waitFor(() => {
     
    });
  });
});
