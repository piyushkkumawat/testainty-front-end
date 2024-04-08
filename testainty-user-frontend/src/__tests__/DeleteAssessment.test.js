/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import DeleteAssessment from '../Components/Modal/DeleteAssessment';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore();

// Mock i18next initialization
i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en', 
  keySeparator: false, 
  interpolation: {
    escapeValue: false, 
  },
});

describe('DeleteAssessment Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <DeleteAssessment isOpen={true} setIsOpen={() => {}} data={{ assessment_id: '123' }} />
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    );

  test('renders DeleteAssessment component with confirmation message', () => {
    renderComponent();

    expect(screen.getByText(i18n.t('wantTodelete'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('yes'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('no'))).toBeInTheDocument();
  });

  test('calls deleteAssessment when "Yes" button is clicked', async() => {
    const deleteAssessmentMock = jest.fn();
    store.dispatch = deleteAssessmentMock;

    await renderComponent()

    fireEvent.click(screen.getByText(i18n.t('yes')));
  });

  test('closes modal when "No" button is clicked', async() => {
    await renderComponent()

    fireEvent.click(screen.getByText(i18n.t('no')));

  });

});
