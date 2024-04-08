import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import { BsEyeSlashFill, BsEyeFill } from 'react-icons/bs';
import ReCaptcha from '../reCaptcha';


const Login = () => {
  const userData = useSelector((state) => state.user)
  const navigate = useNavigate()
  const recaptchaRef = useRef(null);
  const dispatch = useDispatch();
  const [showPwd, setShowPwd] = useState(false)
  // const [recaptchaToken, setRecaptchaToken] = useState('')
  const [submitting, setSubmitting] = useState(false)


  const handleClick = () => {
    setShowPwd(!showPwd);
  }

  // const handleChangeCaptha = (value) => {
  //   setRecaptchaToken(value)
  // }

  useEffect(() => {
    localStorage.removeItem('userData')
  }, [])

  useEffect(() => {
    if (userData && userData.loggedInUser) {
      if (userData.loggedInUser.role.roleType === 4) {
        navigate('/skills')
      } else {
        navigate('/dashboard')
      }

    }
  }, [navigate, userData])

  return (
    <div className='md:h-screen flex justify-center items-center w-full p-2'>
      <div className='w-full shadow-lg bg-white px-3 py-5 border-l-8 border-primary rounded flex justify-around items-center max-md:flex-col lg:w-8/12'>
        <div>
          <Link to='/'><img src="/assets/images/Main-logo.svg" alt='logo' width="400" /></Link>
        </div>
        <div>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              setSubmitting(true);
              const existingToken = values.recaptchaToken;
              if (existingToken) {
                // Use the existing token without calling executeAsync
                values.recaptchaToken = existingToken;
                dispatch(login(values));
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
                dispatch(login(values));
                setSubmitting(false)

              } catch (error) {
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
              <form onSubmit={handleSubmit} className=' bg-white text-black p-2 w-80'>
                <ReCaptcha recaptchaRef={recaptchaRef} />
                <h2 className='text-[#009dff]'>Welcome Back</h2>
                <hr className='text-green-500' />
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    data-testid="email-input"
                    placeholder="Enter email"
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
                    Password
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
                <div className="mb-4 flex items-center justify-between">
                  {/* <div>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm font-medium text-gray-700">
                      Remember Me
                    </label>
                  </div> */}

                  <div className="text-right">
                    <Link to="/forgot-password" data-testid="forgot-password" className="text-[#009dff]">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  data-testid="sign In"
                  className={`w-full btn-color text-white font-medium rounded-md h-11 mt-2 ${submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Login'}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>

    </div>

  );
};

export default Login;