/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import UploadLogo from '../Components/Modal/UploadLogo';
import { images } from '../Constants/image.constant';

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
  user: {
    getProfile: {
      customerId: {
        customer_logo: images.LOGO,
      },
    },
  },
});

jest.mock('url', () => ({
    createObjectURL: jest.fn(),
  }));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../Store/userSlice', () => ({
  ...jest.requireActual('../Store/userSlice'),
  imageUpload: jest.fn(),
  getProfile: jest.fn(),
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
          <UploadLogo isOpen={true} setIsOpen={() => {}} />
        </BrowserRouter>
      </I18nextProvider>
     </Provider>
  );

describe('UploadLogo Component', () => {
  it('renders without errors', async () => {
    const isOpen = true;
    const setIsOpen = jest.fn();
    await renderComponent(isOpen, setIsOpen);
    await waitFor(() => {
      expect(screen.getByText(i18n.t('uploadLogo'))).toBeInTheDocument();
    });
  });

  URL.createObjectURL = jest.fn().mockReturnValue('mocked_image_url');
  it('handles click change', async () => {
    const isOpen = true;
    const setIsOpen = jest.fn();
    await renderComponent(isOpen, setIsOpen);
    fireEvent.click(screen.getByTestId('toggle-click'));

  });
  it('handles image upload', async () => {
    const isOpen = true;
    const setIsOpen = jest.fn();
    await renderComponent(isOpen, setIsOpen);

    // Mocking the image file
    const file = new File(['(binary content)'], images.LOGO, { type: 'image/png' });


    // Trigger the image upload
    act(() => {
      fireEvent.change(screen.getByTestId('file-input'), { target: { files: [file] } });
    });

    // Wait for the debounce time (assuming 500ms, adjust if needed)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    fireEvent.click(screen.getByTestId('cancel-btn'));
  
  });
});
