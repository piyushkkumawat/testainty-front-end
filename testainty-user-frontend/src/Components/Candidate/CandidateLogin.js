
import { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginCandidate } from '../../Store/testSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import { t } from 'i18next';

const CandidateLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const url = useParams()
    const [showPwd, setShowPwd] = useState(false)
    const handleClick = () => {
        setShowPwd(!showPwd);
    }

    return (
        <div className='flex justify-content-around align-items-center md:h-screen md:w-full bgc-color '>
            <div className=' shadow-lg bg-white py-5 rounded-md md:flex'>
                <div className='lg:w-50 md:w-full '>
                    <img src="../../assets/images/candidateLogin.png" alt='logo' className="img-lg" />
                </div>
                <div className='px-4'>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = t('required');
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = t('invalidEmailAddress');
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            let assessment_url = url.testUrl;
                            values.assessment_url = assessment_url;
                            dispatch(loginCandidate(values));
                            setSubmitting(false);
                            navigate('/candidateTest')
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
                            <form onSubmit={handleSubmit} className=' bg-white text-black p-2 w-80 '>
                                <h2 className='text-color' data-testid="login">{t('login')}</h2>
                                <hr className='text-color' />
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                       {t('email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        data-testid="email-input"
                                        placeholder={t('enterEmailp')}
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
                                <div className="mb-4" style={{ position: 'relative' }}>
                                    {showPwd ? (<BsEyeFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '10px'
                                    }}
                                        onClick={handleClick}
                                    />) : (<BsEyeSlashFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '10px'
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
                                <button
                                    type="submit"
                                    className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={isSubmitting}
                                    data-testid="submit-button"
                                >
                                    {isSubmitting ? 'Submitting...' : t('signIn')}
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>

        </div>
    );
};

export default CandidateLogin;
