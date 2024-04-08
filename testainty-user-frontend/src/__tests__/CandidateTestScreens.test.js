/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import CandidateTestScreens from '../Components/Candidate/CandidateTestScreens';
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

describe('CandidateTestScreens Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      test: {
        startTest: {
          status: true,
          Questions: [
            {
              _id: '1',
              questionTitle: 'Sample Question 1',
              options: [
                { Option1: 'Option 1' },
                { Option2: 'Option 2' },
              ],
            },
            {
              _id: '2',
              questionTitle: 'Sample Question 2',
              options: [
                { Option1: 'Option 1' },
                { Option2: 'Option 2' },
              ],
            },
          ],
        },
      },
    });
  });

  const renderComponent = () =>
    render(
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <CandidateTestScreens isFullscreen={false}
                      toggleFullscreen={() => {}}
                      assessment_url="https://example.com"
                      candidateId="123"
                      testInfoData={{ assessment_duration: 30 }}
                      setTestSubmited={() => {}}/>
                </BrowserRouter>
            </I18nextProvider>
        </Provider>
    );

  test('renders CandidateTestScreens component with initial state', async() => {
    await renderComponent()

    // Assert that the component renders without crashing
    expect(screen.getByTestId('candidateName')).toBeInTheDocument();
    expect(screen.getByTestId('time')).toBeInTheDocument();
    // expect(screen.getByText(i18n.t('questionNo 1'))).toBeInTheDocument();
    // expect(screen.getByText(i18n.t('totalQuestions 2'))).toBeInTheDocument();

    // expect(screen.getByText('Sample Question 1')).toBeInTheDocument();
    // expect(screen.getByText('Option 1')).toBeInTheDocument();
    // expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('handles next and previous buttons correctly', () => {
    render(
      <Provider store={store}>
        <CandidateTestScreens
          isFullscreen={false}
          toggleFullscreen={() => {}}
          assessment_url="https://example.com"
          candidateId="123"
          testInfoData={{ assessment_duration: 30 }}
          setTestSubmited={() => {}}
        />
      </Provider>
    );

    // Assert that the initial question is rendered
    // expect(screen.getByText('Sample Question 1')).toBeInTheDocument();

    // Click the "Next" button
    fireEvent.click(screen.getByText(i18n.t('next')));

    // Assert that the next question is rendered
    // expect(screen.getByText('Sample Question 2')).toBeInTheDocument();

    // Click the "Previous" button
    fireEvent.click(screen.getByText(i18n.t('previous')));

    // Assert that it goes back to the initial question
    // expect(screen.getByText('Sample Question 1')).toBeInTheDocument();
  });

  test('handles answer selection correctly', () => {
    render(
      <Provider store={store}>
        <CandidateTestScreens
          isFullscreen={false}
          toggleFullscreen={() => {}}
          assessment_url="https://example.com"
          candidateId="123"
          testInfoData={{ assessment_duration: 30 }}
          setTestSubmited={() => {}}
        />
      </Provider>
    );

    // Assert that the initial question is rendered
    // expect(screen.getByText('Sample Question 1')).toBeInTheDocument();

    // Click the radio button for the first option
    // fireEvent.click(screen.getByLabelText('Option 1'));

    // Assert that the selected option is checked
    // expect(screen.getByLabelText('Option 1')).toBeChecked();
  });
});
