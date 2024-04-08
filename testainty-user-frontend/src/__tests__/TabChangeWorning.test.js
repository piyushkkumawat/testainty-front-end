/* eslint-disable jest/expect-expect */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import TabChangeWorning from '../Components/Modal/TabChangeWorning';
import { act } from 'react-dom/test-utils';


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
            <TabChangeWorning setShowTabChangeWarning={() => { }} showTabChangeWarning={true} />
        </I18nextProvider>
    );


describe('Tab Change Worning Component', () => {
    it('renders Tab Change Worning component', async () => {
        await renderComponent();
        await waitFor(() => {


            expect(screen.getByText(i18n.t('warning'))).toBeInTheDocument()
            expect(screen.getByText(i18n.t('warningMsg'))).toBeInTheDocument()
            expect(screen.getByText(i18n.t('closeModal'))).toBeInTheDocument()
            expect(screen.getByTestId('toggle-click')).toBeInTheDocument();
        })
    });

    it('handles close component', async () => {
        await renderComponent()
        act(() => {
            // Click to toggle the profile image
            fireEvent.click(screen.getByTestId('toggle-click'));
        })

    });
})