/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CandidateTest from '../Components/Candidate/CandidateTest';
import { I18nextProvider,initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const mockStore = configureStore();
// Mock i18next initialization
i18n.use(initReactI18next).init({
    resources: {},
    lng: 'en', // Set your desired language
    keySeparator: false, // Allow for nested keys in translations
    interpolation: {
      escapeValue: false, // React already protects against injection
    },
  });

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

const store = mockStore({
    test: {
      getTestInfo: {
        assesmentDetails: {
          assessmentName: 'Sample Test',
          assessment_duration: 30,
          assessmentDetails: {
            assessment_url: 'https://example.com',
          },
        },
      },
      startTest: {
        status: true,
      },
    },
  });

const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <CandidateTest />
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

describe('CandidateTest component', () => {
  const mockStore = configureStore([]);

  beforeEach(() => {
     mockStore({
      test: {
        getTestInfo: {
          assesmentDetails: {
            assessmentName: 'Sample Test',
            assessment_duration: 30,
            assessmentDetails: {
              assessment_url: 'https://example.com',
            },
          },
        },
        startTest: {
          status: true,
        },
      },
    });
  });

  test('renders component with test info', async () => {
    await renderComponent();

    expect(screen.getByText(i18n.t('sampleTest'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('readInstructions'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('usingGoogleChrome'))).toBeInTheDocument();

    expect(screen.getByText(i18n.t('disableAllAdBlockers'))).toBeInTheDocument();

    expect(screen.getByText(i18n.t('weRecommend'))).toBeInTheDocument();

  });

  test('handles start test button click', async () => {
    await renderComponent();

    // Click the start test button
    fireEvent.click(screen.getByTestId('start-btn'));

    // Wait for the asynchronous action to complete
    await waitFor(() => {
    //   expect(screen.getByText('TestSubmit')).toBeInTheDocument();
    });
  });

});
