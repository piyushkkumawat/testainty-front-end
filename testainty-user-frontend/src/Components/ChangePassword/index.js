import { Formik } from 'formik';
import { useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs/index.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changePassword } from '../../Store/userSlice';

const ChangePassword = () => {
    const [showPwd, setShowPwd] = useState(false)
    const [showOldPwd, setShowOldPwd] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleClick = () => {
        setShowPwd(!showPwd);
    }

    const handleClickOldPass = () => {
        setShowOldPwd(!showOldPwd);
    }
    const { t } = useTranslation();

    const handleCancel = () => {
        navigate('/dashboard')
    }


    return (

            <div className='screen-height flex justify-center items-center h-screen'>
                <Formik
                    initialValues={{ password: '', confirmPassword: '', oldPassword: '' }}
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
                        let obj = {
                            oldPassword: values.oldPassword,
                            newPassword: values.confirmPassword
                        }
                        dispatch(changePassword(obj)).then((data) => {
                            if(data && data.payload && data.payload.status){
                              navigate('/dashboard')
                            }
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
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
                        <form onSubmit={handleSubmit} className='bg-white shadow-lg  text-black  rounded flex flex-col items-center justify-center h-auto sm:w-1/2 '>
                            <div className='p-5 w-full'>
                            <h3 className='text-xl lg:text-3xl font-bold text-gradient font'>{t('Change Password')}</h3>
                            <hr className='hr text-color' />
                            <div className="mb-4 px-0" style={{ position: 'relative' }}>
                            {showOldPwd ? (<BsEyeFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '15px'
                                    }}
                                        onClick={handleClickOldPass}
                                    />) : (<BsEyeSlashFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '15px'
                                    }}
                                        onClick={handleClickOldPass}
                                    />)}
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        {t('oldPassword')}
                                    </label>
                                    <input
                                       type={showOldPwd ? 'text' : 'password'}
                                        id="oldPassword"
                                        data-testid="oldPassword-input"
                                        placeholder={t('enterOldPassword')}
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full p-3 border h-11 ${errors.oldPassword && touched.oldPassword ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                                    />
                                    {errors.oldPassword && touched.oldPassword && (
                                        <div className="text-red-500 mt-2 text-sm">{errors.oldPassword}</div>
                                    )}
                                </div>
                                <div className="mb-4 px-0" style={{ position: 'relative' }}>
                                    {showPwd ? (<BsEyeFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '15px'
                                    }}
                                        onClick={handleClick}
                                    />) : (<BsEyeSlashFill className='pwd-icon' style={{
                                        position: 'absolute',
                                        zIndex: 1,
                                        right: '0',
                                        marginTop: '40px',
                                        marginRight: '15px'
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
                                <div className="mb-4 px-0">
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
                                <div className="text-center flex justify-end items-center w-full md:w-auto mt-2">
                                    <button className='w-auto btn-color py-2 rounded px-3 text-white shadow mr-2' data-testid="save">{t('Change Password')}</button>
                                    <button className='w-auto bg-transparent py-2 rounded px-3 border border-blue-500 md:ml-3 shadow' data-testid="cancel" onClick={handleCancel}>{t('cancel')}</button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
    )
}

export default ChangePassword;