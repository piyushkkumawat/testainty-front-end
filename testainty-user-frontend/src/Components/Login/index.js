import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/userSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs/index.js';
import { useTranslation } from 'react-i18next';
import ReCaptcha from '../ReCaptcha/index.js';
import { images } from '../../Constants/image.constant.js';
import ErrorBoundary from '../ErrorBoundary/index.js';

// Define the Login component.
const Login = () => {
      // Initialize necessary hooks and variables.
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const recaptchaRef = useRef(null);
    const [showPwd, setShowPwd] = useState(false)
    const [orgId, setOrgId] = useState(localStorage.getItem('orgId') || '')
    const [recaptchaToken, setRecaptchaToken] = useState('')
    // Function to toggle password visibility.
    const handleClick = () => {
        setShowPwd(!showPwd);
    }

    // Initialize the i18n translation hook.
    const { t } = useTranslation();

    // State variables for screen width and mobile view visibility.
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isShow, setIsShow] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleChangeCaptha = (value) => {
        setRecaptchaToken(value)
    }

     // Effect to update screen width on resize.
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Effect to determine if mobile view is active based on screen width.
    useEffect(() => {
        if (screenWidth < 1024) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }

    }, [screenWidth])

    const handleChangePage = () => {
        navigate('/')
    }

    // Render the login form using Formik.
    return (
        <ErrorBoundary>
        <div className=''>
            <div className={`relative ${isShow ? 'bg-container' : ''}`}></div>
            <div className='absolute left-32 top-14 w-48 hidden lg:block xl:block'><img src={images.LOGO} onClick={handleChangePage} alt='' /></div>
            <div className=' lg:absolute lg:z-10 lg:top-0 lg:right-0 lg:w-2/5'>
                <Formik
                    initialValues={{orgId: orgId, email: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = t('required');
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = t('invalidEmailAddress');
                        }

                        if (!values.orgId) {
                            errors.orgId = t('required');
                        }
                        return errors;
                    }}
                    onSubmit={async (values) => {
                        // Check if you already have a valid token
                        setSubmitting(true)
                        const existingToken = values.recaptchaToken;
                    
                        if (existingToken) {
                            // Use the existing token without calling executeAsync
                            values.recaptchaToken = existingToken;
                           const response = await dispatch(login(values));
                           if(response && response.payload && response.payload.status){
                            navigate('/dashboard')
                           }
                            setSubmitting(false)
                            return;
                        }
                    
                        // If no existing token, generate a new one
                        try {
                            const token = await recaptchaRef.current.executeAsync();
                    
                            if (!token) {
                                recaptchaRef.current.reset();
                               setSubmitting(false)
                                return;
                            }
                    
                            values.recaptchaToken = token;
                            const response = await dispatch(login(values));
                            if(response && response.payload && response.payload.status){
                                navigate('/dashboard')
                               }
                            setSubmitting(false)

                        } catch (error) {
                            console.error('Error generating reCAPTCHA token:', error);
                            setSubmitting(false)

                        }
                    }}
                    
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit} className='h-screen bg-white shadow-lg text-black rounded'>

                            <div className='w-full p-3 block lg:hidden xl:hidden'>
                                <img src={images.LOGO} className='w-44' alt='' />
                            </div>
                            <div className='py-3 px-5'>
                                <ReCaptcha recaptchaRef={recaptchaRef} handleChangeCaptha={handleChangeCaptha}/>
                                <h2 className='text-xl lg:text-3xl font-bold text-gradient font lg:mt-14 xl:mt-14'>{t('welcome')}</h2>
                                <hr className='text-color' />
                                <div className="mb-4 px-0 lg:mx-5 lg:mt-5 xl:mt-5">
                                    <label htmlFor="orgId" className="block text-sm font-medium text-gray-700">
                                        {t('Organisation Id')}
                                    </label>
                                    <input
                                        type="text"
                                        id="orgId"
                                        data-testid="orgId-input"
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
                                <div className="mb-4 px-0 lg:mx-5 lg:mt-5 xl:mt-5">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        data-testid="email-input"
                                        placeholder={t('enterEmail')}
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
                                <div className="mb-4 px-0 lg:mx-5 lg:mt-5 xl:mt-5" style={{ position: 'relative' }}>
                                    {showPwd ? (<BsEyeFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '40px'
                                    }}
                                        onClick={handleClick}
                                    />) : (<BsEyeSlashFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '40px'
                                    }}
                                        onClick={handleClick}
                                    />)}
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        {t('password')}
                                    </label>
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        id="password"
                                        data-testid="password-input"
                                        placeholder={t('enterPassword')}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full p-3 border h-11 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                                    />
                                    {errors.password && touched.password && (
                                        <div className="text-red-500 mt-2 text-sm">{errors.password}</div>
                                    )}
                                </div>
                                <div className="mb-4 flex items-center justify-between px-0 lg:mx-5 lg:mt-5 xl:mt-5">
                                    <div className="text-right">
                                        <Link to="/forgot-password" className="text-color">
                                            {t('forgotPWD')}
                                        </Link>
                                    </div>
                                </div>

                                <div className='px-0 lg:mx-5 lg:mt-5 xl:mt-5'>
                                    <button
                                        type="submit"
                                        data-testid="sign-in"
                                        className={`w-full btn-color text-white font-medium rounded-md h-11  ${submitting ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        disabled={submitting}
                                    >
                                        {submitting ? t('submitting') : t('login')}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>

        </div>
        </ErrorBoundary>
    );
};

export default Login;
