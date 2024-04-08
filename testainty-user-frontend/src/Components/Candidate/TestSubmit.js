import { t } from 'i18next';

const TestSubmit = () => {
    return (
            <div className='flex justify-content-around align-items-center md:h-screen md:w-full bgc-color'>
                <div className=' shadow-lg rounded-md bg-white py-5 md:flex'>
                    <div className='flex flex-col items-center px-5'>
                        <img src='../../../assets/images/mailSend.png' alt='right-img' width='200' />
                        <h3>{t('thankYou')}</h3>
                        <p>{t('testSubmited')}</p>
                    </div>
                </div>
            </div>
    )
}
export default TestSubmit;