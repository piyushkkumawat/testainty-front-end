/* eslint-disable jest/expect-expect */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import AssessmentDetails from '../Components/AssessmentDetails';

const mockStore = configureStore();

i18n.use(initReactI18next).init({
    resources: {},
    lng: 'en', // Set your desired language
    keySeparator: false, // Allow for nested keys in translations
    interpolation: {
      escapeValue: false, // React already protects against injection
    },
  });
  
const store = mockStore({
  assessment: {
    loading: false,
    getCandidates: {
      status: true,
      message: 'Record Fetched!',
      'assesment': {
        '_id': '652e1fd89c844ca9654de2d9',
        'assessmentName': 'asd',
        'desc': 'asda',
        'assessment_duration': '60',
        'questionBanksId': [
            {
                '_id': '652636403cb848a7c1c82c0e',
                'qBankName': 'Node js Advanced',
                'skill': '64e87919cb37cdc790398adc',
                'qBanklevel': 'Advanced',
                'questionsIds': [
                    '652636653cb848a7c1c82c36',
                    '652636743cb848a7c1c82c47',
                    '652636823cb848a7c1c82c5a'
                ],
                'timealloted': 15,
                'totalQuestions': 3,
                'totalScore': 45,
                'createdAt': '2023-10-11T05:44:32.322Z',
                'updatedAt': '2023-10-11T05:45:38.790Z',
                '__v': 3
            }
        ],
        'assessment_url': 'test-SDgOAWRQLT',
        'created_by': '64e5a41ec202277d1453e619',
        'customerId': '64d5d93f3a37b44dea7895b7',
        'assessment_status': 0,
        'createdAt': '2023-10-17T05:47:04.468Z',
        'updatedAt': '2023-10-19T11:23:31.750Z',
        '__v': 0,
        'assessment_invite_url': 'http://localhost:3001/signup/652e1fd89c844ca9654de2d9/64d5d93f3a37b44dea7895b7/invite',
        'assessment_invite_url_email': 'http://localhost:3000/V2/652e1fd89c844ca9654de2d9/invite'
    },
      candidates: [
        {
          _id: '652e1fd89c844ca9654de2d9',
          candidateName: 'Test Candidate',
          candidateEmail: 'test@example.com',
          status: 'Invited',
        },
      ],
    },
  },
});

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
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
          <AssessmentDetails />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  );

describe('AssessmentDetails Component', () => {
  it('renders without errors', async () => {
    await renderComponent();
    await waitFor(() => {
      expect(screen.getByText(i18n.t('testInformation'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('assessmentURL'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('disallow'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('makeFullscreen'))).toBeInTheDocument();
      expect(screen.getByText(i18n.t('logTab'))).toBeInTheDocument();
      expect(screen.getByTestId(i18n.t('search-input'))).toBeInTheDocument();

      // Add more assertions for elements you expect to be rendered
    });
  });

  it('triggers assessment status change', async () => {
    await renderComponent();

    // act(() => {
    //   fireEvent.click(screen.getByTestId('copy-clipboard'));
    // });

    // Wait for the asynchronous actions to complete
    await waitFor(() => {
      // Add your assertions or additional testing code here
    });
  });
});
