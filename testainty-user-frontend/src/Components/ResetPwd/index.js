import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs/index.js';
import { resetPassword } from '../../Store/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReCaptcha from '../ReCaptcha/index.js';
import { images } from '../../Constants/image.constant.js';

const ResetPwd = () => {
    var { token, orgId } = useParams();
    const recaptchaRef = useRef(null);
    const [showPwd, setShowPwd] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleClick = () => {
        setShowPwd(!showPwd);
    }
    const { t } = useTranslation();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        localStorage.setItem('orgId', orgId)
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

    const handleChangeCaptha = (value) => {
        setRecaptchaToken(value)
    }


    return (

        <div>
            <div className={`relative ${isShow ? 'resetPwd' : ''} `}></div>
            <div className='absolute left-32 top-14 w-48 hidden lg:block xl:block'><Link to='/'><img src={images.LOGO} alt='Logo'/></Link></div>
            <div className='lg:absolute lg:z-10 lg:top-0 lg:right-0 lg:w-2/5 '>
                <Formik
                    initialValues={{ password: '', confirmPassword: '', token: token }}
                    validate={(values) => {
                        const errors = {};
                        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                        if (!values.password) {
                            errors.password = t('required');
                        } else if (!passwordRegex.test(values.password)) {
                            errors.password = t('Password_validation');
                        }
                        else if (!values.confirmPassword) {
                            errors.confirmPassword = t('required');
                        }
                        else if (values.password !== values.confirmPassword) {
                            errors.confirmPassword = t('passwordMatch');
                        }
                        return errors;
                    }}
                    onSubmit={ async (values, { setSubmitting }) => {
                        const recaptchaToken = await recaptchaRef.current.executeAsync()
                        if(!recaptchaToken){
                            setSubmitting(false);

                            recaptchaRef.current.reset();
                            return
                        }else{
                           const response = await dispatch(resetPassword({ pass: values.password, token: token, recaptchaToken: recaptchaToken }));
                           if(response && response.payload && response.payload.status){
                            navigate('/login')
                           } 
                           setSubmitting(false);
                            // navigate("/login");
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
                        <form onSubmit={handleSubmit} className='bg-white shadow-lg  text-black h-screen rounded flex flex-col justify-center'>
                            <div className='w-full p-3 block lg:hidden xl:hidden'>
                                <Link to='/'><img src={images.LOGO} className='w-40' alt='Logo' /></Link>
                            </div>
                            <div className='p-5'>
                            <ReCaptcha recaptchaRef={recaptchaRef} handleChangeCaptha={handleChangeCaptha}/>
                            <h3 className='text-xl lg:text-3xl font-bold text-gradient font'>{t('resetPassword')}</h3>
                            <hr className='hr text-color' />
                                <div className="mb-4 px-0 lg:mx-5" style={{ position: 'relative' }}>
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
                                        {t('newPassword')}
                                    </label>
                                    <input
                                        type={showPwd ? 'text' : 'password'}
                                        id="password"
                                        data-testid="newPassword-input"
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
                                <div className="mb-4 px-0 lg:mx-5">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        {t('confirmPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        data-testid="confirmPassword-input"
                                        placeholder={t('enterConfirmPassword')}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full p-3 border h-11 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="text-red-500 mt-2 text-sm">{errors.confirmPassword}</div>
                                    )}
                                </div>
                                <div className='px-0 lg:mx-5'>
                                    <button
                                        type="submit"
                                        className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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



        // <div className='flex justify-around align-items-center md:h-screen md:w-full '>
        //     <div className='shadow-lg bg-white flex items-center py-5 md:flex '>
        //         <div className='lg:w-50 md:w-full '>
        //             <img src="../../assets/images/loginImage.jpg" alt='image' className='img-lg' />
        //         </div>
        //         <div className='px-4'>
        //             <Formik
        //                 initialValues={{ password: '', confirmPassword: '', token: token }}
        //                 validate={(values) => {
        //                     const errors = {};
        //                     if (!values.password) {
        //                         errors.password = t('required');
        //                     }
        //                     else if (!values.confirmPassword) {
        //                         errors.confirmPassword = t('required');
        //                     }
        //                     else if (values.password !== values.confirmPassword) {
        //                         errors.confirmPassword = t('passwordMatch');
        //                     }
        //                     return errors;
        //                 }}
        //                 onSubmit={(values, { setSubmitting }) => {
        //                     dispatch(resetPassword({ pass: values.password, token: token }));
        //                     setSubmitting(false);
        //                     navigate("/login");
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
        //                         <h3 className='owner-logo'>{t('resetPassword')}</h3>
        //                         <hr className='hr' />
        //                         <div className="mb-4" style={{ position: "relative" }}>
        //                             {showPwd ? (<BsEyeFill className='pwd-icon' style={{
        //                                 position: "absolute",
        //                                 zIndex: 1,
        //                                 right: '0',
        //                                 marginTop: '40px',
        //                                 marginRight: '10px'
        //                             }}
        //                                 onClick={handleClick}
        //                             />) : (<BsEyeSlashFill className='pwd-icon' style={{
        //                                 position: "absolute",
        //                                 zIndex: 1,
        //                                 right: '0',
        //                                 marginTop: '40px',
        //                                 marginRight: '10px'
        //                             }}
        //                                 onClick={handleClick}
        //                             />)}
        //                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        //                                 {t('newPassword')}
        //                             </label>
        //                             <input
        //                                 type={showPwd ? "text" : "password"}
        //                                 id="password"
        //                                 data-testid="newPassword-input"
        //                                 placeholder={t("enterPassword")}
        //                                 value={values.password}
        //                                 onChange={handleChange}
        //                                 onBlur={handleBlur}
        //                                 className={`mt-1 block w-full p-3 border h-11 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
        //                                     } rounded-md`}
        //                             />
        //                             {errors.password && touched.password && (
        //                                 <div className="text-red-500 mt-2 text-sm">{errors.password}</div>
        //                             )}
        //                         </div>
        //                         <div className="mb-4">
        //                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        //                                 {t('confirmPassword')}
        //                             </label>
        //                             <input
        //                                 type="password"
        //                                 id="confirmPassword"
        //                                 data-testid="confirmPassword-input"
        //                                 placeholder={t('enterConfirmPassword')}
        //                                 value={values.confirmPassword}
        //                                 onChange={handleChange}
        //                                 onBlur={handleBlur}
        //                                 className={`mt-1 block w-full p-3 border h-11 ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
        //                                     } rounded-md`}
        //                             />
        //                             {errors.confirmPassword && touched.confirmPassword && (
        //                                 <div className="text-red-500 mt-2 text-sm">{errors.confirmPassword}</div>
        //                             )}
        //                         </div>
        //                         <button
        //                             type="submit"
        //                             className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    )
}

export default ResetPwd;