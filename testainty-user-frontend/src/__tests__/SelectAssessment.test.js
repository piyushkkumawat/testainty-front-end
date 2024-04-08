/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import SelectAssessment from '../Components/Test/SelectAssessment';

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
    getQuestionBanks: {
      qBanks: [
        { _id: '1', qBankName: 'Test QBank 1' },
        { _id: '2', qBankName: 'Test QBank 2' },
        { _id: '3', qBankName: 'Test QBank 3' },
      ],
      pages: 2,
    },
  },
  createAssessment: {
    selectedQBank: [],
  },
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../Store/assessmentSlice.js', () => ({
  ...jest.requireActual('../Store/assessmentSlice.js'),
  getQuestionBank: jest.fn(),
}));

jest.mock('../Store/createAssesmentSlice', () => ({
  ...jest.requireActual('../Store/createAssesmentSlice'),
  addQBank: jest.fn(),
  handleNext: jest.fn(),
  handlePrev: jest.fn(),
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
          <SelectAssessment />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('SelectAssessment Component', () => {
  it('renders without errors', async () => {
    await renderComponent();
    await waitFor(() => {
      // Add assertions to check if the relevant elements are rendered
      expect(screen.getByText('Test QBank 1')).toBeInTheDocument();
      expect(screen.getByText('Test QBank 2')).toBeInTheDocument();
      expect(screen.getByText('Test QBank 3')).toBeInTheDocument();
      expect(screen.getByTestId('previous-btn')).toBeInTheDocument();
      expect(screen.getByTestId('next-btn')).toBeInTheDocument();
    });
  });

//   it('handles page change', async () => {
//     await renderComponent();

//     // Click the "Next" button
//     act(() => {
//       fireEvent.click(screen.getByTestId('next-btn'));
//     });

//   });

//   it('handles QBank selection and unselection', async () => {
//     await renderComponent();

//     // Click the "+" button to select a QBank
//     act(() => {
//         fireEvent.click(screen.getByText('+'));
//     });
//     expect(screen.getByTestId('selected-qbank')).toBeInTheDocument();
   
  
//   });

  it('handles form submission', async () => {
    await renderComponent();

    // Click the "Next" button
    act(() => {
        fireEvent.click(screen.getByTestId('next-btn'));
    });

  });

  it('handles "Previous" button click', async () => {
    await renderComponent();

    // Click the "Previous" button
    act(() => {
      fireEvent.click(screen.getByTestId('previous-btn'));
    });

  });
});
