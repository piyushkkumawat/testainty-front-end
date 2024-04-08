import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Loader from '../Components/Common/Loader';


i18n.use(initReactI18next).init({
    resources: {},
    lng: 'en', // Set your desired language
    keySeparator: false, // Allow for nested keys in translations
    interpolation: {
        escapeValue: false, // React already protects against injection
    },
});


const renderComponent = () =>
    render(
        <I18nextProvider i18n={i18n}>
            <Loader />
        </I18nextProvider>
    );


describe('Loader Component', () => {
    it('renders Loader component', async () => {
        await renderComponent();
        await waitFor(() => {
            expect(screen.getByText(i18n.t('loading'))).toBeInTheDocument()
        })

    })
})