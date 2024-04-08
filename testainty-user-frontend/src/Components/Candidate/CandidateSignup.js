import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { signupCandidate } from '../../Store/testSlice';
import { t } from 'i18next';
import { images } from '../../Constants/image.constant';

const CandidateSignup = () => {
  const candidateData = useSelector((state) => state.test)
  const url = useParams()
  const dispatch = useDispatch();
  const [isEmailSend, setIsEmailSend] = useState(false)
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

  useEffect(() => {
    if (candidateData && candidateData?.signupCandidate && candidateData?.signupCandidate?.status) {
      setIsEmailSend(candidateData?.signupCandidate?.status)
    }
  }, [candidateData, candidateData?.signupCandidate])

  return (
    <div>
      {isEmailSend ?
        <div className='flex justify-content-around align-items-center md:h-screen md:w-full bgc-color'>
          <div className=' shadow-lg rounded-md bg-white py-5 md:flex'>
            <div className='flex flex-col items-center px-5'>
              <img src='../../../assets/images/mailSend.png' alt='right-img' width='200' />
              <h3>{t('registrationCompleted')}</h3>
              <p>{t('mailCheck')}</p>
            </div>
          </div>
        </div>
        :
        <div >
          <div className={`relative ${isShow ? 'candidate-container' : ''}`}></div>
          <div className='absolute left-32 top-14 w-48 hidden lg:block xl:block'><Link to="/"><img src={images.LOGO} alt='logo' /></Link></div>
          <div className='lg:absolute lg:z-10 lg:top-0 lg:right-0 lg:w-2/5'>
            <Formik
              initialValues={{ candidateName: '', candidateEmail: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.candidateEmail) {
                  errors.candidateEmail = t('required');
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.candidateEmail)) {
                  errors.candidateEmail = t('invalidEmailAddress');
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                let assessmentURL = url.assessment_url
                // let customerId = url.customerId
                values.assessment_url = assessmentURL;
                // values.customerId = customerId;
                dispatch(signupCandidate(values));
                setSubmitting(false);
                // navigate(`/${testUrl}/${customerId}/login`)
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
                <form onSubmit={handleSubmit} className='bg-white shadow-lg p-5 text-black h-screen rounded'>
                  <div className='w-full py-3 block lg:hidden xl:hidden'>
                    <Link to='/'><img src={images.LOGO} className='w-44' alt='Logo' /></Link>
                  </div>
                  <h2 className='text-black text-xl lg:text-3xl font-bold font'>{t('registerTest')}</h2>
                  <hr className='text-color' />
                  <div className="mb-4 px-0 lg:mx-5">
                    <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      id="candidateName"
                      data-testid="candidate-name"
                      placeholder={t('enterFullName')}
                      value={values.candidateName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full p-3 border h-11 ${errors.candidateName && touched.candidateName ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                    />
                    {errors.candidateName && touched.candidateName && (
                      <div className="text-red-500 mt-2 text-sm">{errors.candidateName}</div>
                    )}
                  </div>
                  <div className="mb-4 px-0 lg:mx-5">
                    <label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700">
                      {t('email')}
                    </label>
                    <input
                      type="email"
                      id="candidateEmail"
                      data-testid="email-input"
                      placeholder={('Enter Email')}
                      value={values.candidateEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full p-3 border h-11 ${errors.candidateEmail && touched.candidateEmail ? 'border-red-500' : 'border-gray-300'
                        } rounded-md`}
                    />
                    {errors.candidateEmail && touched.candidateEmail && (
                      <div className="text-red-500 mt-2 text-sm">{errors.candidateEmail}</div>
                    )}
                  </div>
                  <div className='px-0 lg:mx-5'>
                    <button
                      type="submit"
                      className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      disabled={isSubmitting}
                      data-testid="signup"
                    >
                      {isSubmitting ? 'Submitting...' : t('register')}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      }
    </div>
  );
};

export default CandidateSignup;
