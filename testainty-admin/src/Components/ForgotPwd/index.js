import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../Store/userSlice';
import { useRef } from 'react';
import ReCaptcha from '../reCaptcha';
import { Link } from 'react-router-dom';


const ForgotPwd = () => {
  const dispatch = useDispatch();
  const recaptchaRef = useRef(null);
  return (
    <div className='md:h-screen flex justify-center items-center w-full p-2'>
      <div className='w-full rounded border-l-8 border-primary shadow-lg bg-white px-3 py-2 flex justify-around items-center max-md:flex-col lg:w-8/12'>
        <div>
          <Link to="/"><img src="/assets/images/Main-logo.svg" alt='logo' width="400" /></Link>
        </div>
        <div>
          <Formik
            initialValues={{ email: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={ async (values, { setSubmitting }) => {
              const token = await recaptchaRef.current.executeAsync();
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
              <form onSubmit={handleSubmit} className='w-full lg:w-80 xl:w-80 bg-white text-black px-2 py-5'>
                <ReCaptcha recaptchaRef={recaptchaRef} />
                <h2 className='text-color'>Enter your Email</h2>
                <hr className='hr' />
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
  );

};

export default ForgotPwd;