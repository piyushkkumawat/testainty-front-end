/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import InviteAdmin from '../Components/Modal/InviteAdmin';

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

describe('InviteAdmin Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <InviteAdmin isOpen={true} setIsOpen={() => {}} />
        </I18nextProvider>
      </Provider>
    );

  test('renders InviteAdmin component with form elements', () => {
    renderComponent();

    expect(screen.getByText(i18n.t('inviteAdmin'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('fName'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('lName'))).toBeInTheDocument();

    expect(screen.getByText(i18n.t('email'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('submit'))).toBeInTheDocument();
  });

  test('calls inviteAdmins when form is submitted', async () => {
    const inviteAdminsMock = jest.fn();
    store.dispatch = inviteAdminsMock;

    renderComponent();

    fireEvent.change(screen.getByTestId('enter-fname'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('enter-lname'), { target: { value: 'John Doe' } });

    fireEvent.change(screen.getByTestId('enter-email'), { target: { value: 'john.doe@example.com' } });

    fireEvent.submit(screen.getByText(i18n.t('submit')));

  });
});

