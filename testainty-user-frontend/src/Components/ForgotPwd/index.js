import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../Store/userSlice.js';
import { useTranslation } from 'react-i18next';
import ReCaptcha from '../ReCaptcha/index.js';
import { images } from '../../Constants/image.constant.js';
import { Link } from 'react-router-dom';


const ForgotPwd = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const recaptchaRef = useRef(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isShow, setIsShow] = useState(false)


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (screenWidth < 1024) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }

    }, [screenWidth])
    return (
        <div>
            <div className={`relative ${isShow ? 'forgotPwd' : ''}`}></div>
            <div className='absolute left-32 top-14 w-48 hidden lg:block xl:block'><Link to='/'><img src={images.LOGO} alt='Logo' /></Link></div>
            <div className='lg:absolute lg:z-10 lg:top-0 lg:right-0 lg:w-2/5 '>
                <Formik
                    initialValues={{ orgId:'', email: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = t('required');
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = t('invalidEmailAddress');
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const token = await recaptchaRef.current.executeAsync()
                        if (!token) {
                            recaptchaRef.current.reset();
                            return
                        } else {
                            dispatch(forgotPassword(values));
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit} className='bg-white shadow-lg text-black h-screen rounded'>
                            <div className='w-full p-3 block lg:hidden xl:hidden'>
                               <Link to='/'><img src={images.LOGO} alt='Logo' className='w-48'/></Link> 
                            </div>

                            <div className='p-5 lg:flex lg:flex-col lg:justify-center xl:flex xl:flex-col xl:justify-center '>
                                <ReCaptcha recaptchaRef={recaptchaRef} />
                                <h3 className='text-xl lg:text-3xl font-bold text-gradient font lg:mt-28 xl:mt-28'>{t('enterEmail')}</h3>
                                <hr className='hr text-color' />
                                <div className="mb-4 px-0 lg:mx-5 lg:mt-5 xl:mt-5">
                                    <label htmlFor="orgId" className="block text-sm font-medium text-gray-700">
                                        {t('Organisation Id')}
                                    </label>
                                    <input
                                        type="text"
                                        id="orgId"
                                        data-testid="email-input"
                                        placeholder={t('orgId')}
                                        value={values.orgId}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full p-3 border h-11 ${errors.orgId && touched.orgId ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                                    />
                                    {errors.orgId && touched.orgId && (
                                        <div className="text-red-500 mt-2 text-sm">{errors.orgId}</div>
                                    )}
                                </div>
                                <div className="mb-4 px-0 lg:mx-5 ">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder={t('enterEmailp')}
                                        data-testid="email-input"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full p-3 border h-11 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                                    />
                                    {errors.email && touched.email && (
                                        <div className="text-red-500 mt-2 text-sm">{errors.email}</div>
                                    )}
                                </div>

                                <div className='px-0 lg:mx-5 '>
                                    <button
                                        type="submit"
                                        className={`w-full text-white font-medium rounded-md h-11 btn-color ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        disabled={isSubmitting}
                                        data-testid="submit"
                                    >
                                        {isSubmitting ? 'Submitting...' : t('submit')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>


        </div>


        // <div className='flex justify-around items-center md:h-screen md:w-full '>
        //     <div className=' shadow-lg bg-white flex items-center px-3 py-5 md:flex'>
        //         <div className='lg:w-50 md:w-full '>
        //             <img src="./assets/images/loginImage.jpg" alt='img' className='img-sm' />
        //         </div>
        //         <div className='px-4'>
        //             <Formik
        //                 initialValues={{ email: '' }}
        //                 validate={(values) => {
        //                     const errors = {};
        //                     if (!values.email) {
        //                         errors.email = t('required');
        //                     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //                         errors.email = t('invalidEmailAddress');
        //                     }
        //                     return errors;
        //                 }}
        //                 onSubmit={(values, { setSubmitting }) => {
        //                     dispatch(forgotPassword(values));
        //                     setSubmitting(false);
        //                 }}
        //             >
        //                 {({
        //                     values,
        //                     errors,
        //                     touched,
        //                     handleChange,
        //                     handleBlur,
        //                     handleSubmit,
        //                     isSubmitting
        //                 }) => (
        //                     <form onSubmit={handleSubmit} className='bg-white text-black p-2 w-80'>
        //                         <h3 className='owner-logo'>{t('enterEmail')}</h3>
        //                         <hr className='hr' />
        //                         <div className="mb-4">
        //                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        //                                 {t('email')}
        //                             </label>
        //                             <input
        //                                 type="email"
        //                                 id="email"
        //                                 placeholder={t("enterEmailp")}
        //                                 data-testid="email-input"
        //                                 value={values.email}
        //                                 onChange={handleChange}
        //                                 onBlur={handleBlur}
        //                                 className={`mt-1 block w-full p-3 border h-11 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
        //                                     } rounded-md`}
        //                             />
        //                             {errors.email && touched.email && (
        //                                 <div className="text-red-500 mt-2 text-sm">{errors.email}</div>
        //                             )}
        //                         </div>

        //                         <button
        //                             type="submit"
        //                             className={`w-full text-white font-medium rounded-md h-11 btn-color ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        //                                 }`}
        //                             disabled={isSubmitting}
        //                             data-testid="submit"
        //                         >
        //                             {isSubmitting ? 'Submitting...' : t('submit')}
        //                         </button>
        //                     </form>
        //                 )}
        //             </Formik>
        //         </div>
        //     </div>

        // </div>
    );

};

export default ForgotPwd;