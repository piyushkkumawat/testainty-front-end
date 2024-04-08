import { Formik } from 'formik';
import { useRef, useState } from 'react';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import { resetPassword } from '../../Store/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReCaptcha from '../reCaptcha';

const ResetPassword = () => {
  var { token } = useParams();
  const [showPwd, setShowPwd] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const recaptchaRef = useRef(null)
  const handleClick = () => {
    setShowPwd(!showPwd);
  }

  const handleChangeCaptha = (value) => {
      setRecaptchaToken(value)
  }

  return (
    <div className='md:h-screen flex justify-center items-center w-full p-2'>
      <div className='w-full border-l-8 border-primary rounded shadow-lg bg-white px-3 flex justify-around items-center max-md:flex-col lg:w-8/12'>
        <div>
          <Link to='/'><img src="/assets/images/Main-logo.svg" alt='logo' width="400" /></Link>
        </div>
        <div>
          <Formik
            initialValues={{ password: '', confirmPassword: '', token: token }}
            validate={(values) => {
              const errors = {};
              if (!values.password) {
                errors.password = 'Required';
              }
              else if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
              }
              else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password should be match';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const recaptchaToken = await recaptchaRef.current?.executeAsync();
              console.log(recaptchaToken)
              if (!recaptchaToken) {
                setSubmitting(false);

                recaptchaRef.current?.reset();
                return
              } else {
                const response = await dispatch(resetPassword({ pass: values.password, token: token, recaptchaToken: recaptchaToken }));
                if(response && response.payload && response.payload.status){
                  navigate('/')
                  
                 }
                setSubmitting(false);
                // navigate("/");
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
              <form onSubmit={handleSubmit} className='w-full lg:w-80 xl:w-80 bg-white text-black px-2 py-5'>
                <ReCaptcha recaptchaRef={recaptchaRef} handleChangeCaptha={handleChangeCaptha} />
                <h2 className='text-color'>Reset Your Password</h2>
                <hr className='hr' />
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
                                        New Password
                  </label>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    id="password"
                    data-testid="password-input"
                    placeholder="Password"
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
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    data-testid="confirmPassword-input"
                    placeholder="Enter Confirm Password"
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
                <button
                  type="submit"
                  data-testid="submit"
                  className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>

    </div>
  )
}

export default ResetPassword;