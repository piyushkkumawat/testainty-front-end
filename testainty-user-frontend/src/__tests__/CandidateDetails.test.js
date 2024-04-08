/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable jest/expect-expect */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import CandidateDetails from '../Components/AllCandidates/CandidateDetails';

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
    getCandidateById: {
      candidatedata: {
        candidateName: 'Navdeep',
        candidateEmail: 'navdeep.gupta@certaintyinfotech.com',
        AssessmentName: 'Java + JavaScript(Begineer)',
        AssessmentDuration: '20',
        StartedAt: '2023-11-03T07:12:09.359Z',
        CompletedAt: '2023-11-03T07:12:59.953Z',
        PdfUrl: '/testReport/65449d2ec2004fd3ed625bb7.pdf',
        Percentage: [75],
        Status: 'Completed',
        message: 'Record Fetched!',
        status: true,
        testData: {
          data: [80, 70],
          labels: ['Java', 'JavaScript'],
        },
      },
    },
  },
});

// Mocking react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: 'mockId',
    }),
  }));

// Mocking react-pdf/renderer
jest.mock('@react-pdf/renderer', () => ({
  ...jest.requireActual('@react-pdf/renderer'),
  PDFDownloadLink: jest.fn(({ document, fileName, className, onClick }) => (
    <button onClick={() => onClick({ preventDefault: jest.fn() })} className={className}>
      Download Link
    </button>
  )),
}));

// Mocking react-apexcharts
jest.mock('react-apexcharts', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div data-testid='mock-apex-chart'>Mocked Apex Chart</div>),
}));

const renderComponent = () =>

  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <CandidateDetails />
        </BrowserRouter>
      </I18nextProvider>
     </Provider>
  );

describe('CandidateDetails Component', () => {
   
  it('renders without errors', async () => {
  
    await renderComponent();

    // Wait for the component to render
    await waitFor(() => {
    //   expect(screen.getByText(i18n.t('assessmentc'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('durationc'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('appearedOn'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('statusc'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('disconnected'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('fullScreen'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('switchedTab'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('overallScore'))).toBeInTheDocument();
    //   expect(screen.getByText(i18n.t('antiCheating'))).toBeInTheDocument();
    });
  });

//   it('renders with candidate data', async () => {
//     await renderComponent();

//     // Wait for the component to render candidate details
//     await waitFor(() => {
//       expect(screen.getByText('Navdeep')).toBeInTheDocument();
//       expect(screen.getByText('navdeep.gupta@certaintyinfotech.com')).toBeInTheDocument();
//       expect(screen.getByText('Java + JavaScript(Begineer)')).toBeInTheDocument();
//       expect(screen.getByText('20 min')).toBeInTheDocument();
//       expect(screen.getByText('2023-11-03T07:12:09.359Z')).toBeInTheDocument();
//       expect(screen.getByText('2023-11-03T07:12:59.953Z')).toBeInTheDocument();
//       expect(screen.getByText('Completed')).toBeInTheDocument();
//       expect(screen.getByText('Download Link')).toBeInTheDocument();
//       expect(screen.getByText('Java')).toBeInTheDocument();
//       expect(screen.getByText('JavaScript')).toBeInTheDocument();
//       expect(screen.getByText('70%')).toBeInTheDocument();
//       expect(screen.getByText('Download Link')).toBeInTheDocument();
//     });
//   });

//   it('handles PDF download', async () => {
//     await renderComponent();

//     // Trigger the PDF download
//     await waitFor(() => {
//       screen.getByText('Download Link').click();
//     });

//     // Expect that the download link was clicked
//     // You may need to adapt this part based on the actual behavior of the download link in your application
//     // For example, you may want to check if the download link triggers some specific action
//     // or if it opens a dialog for downloading the PDF
//     expect(screen.getByText('Download Link')).toHaveBeenClicked();
//   });

  it('renders Data Not Found message', async () => {
    // Modify the store to have loading true and no getCandidateById data
   
    const modifiedStore = mockStore({
      candidates: {
        loading: true,
        getCandidateById: {},
      },
    });
    await renderComponent();
    render(
      <Provider store={modifiedStore}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <CandidateDetails />
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    );

    // Wait for the Data Not Found message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Data Not Found!')).toBeInTheDocument();
    });
  });
});
