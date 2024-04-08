/* eslint-disable react/no-unescaped-entities */
import { Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSiteUser } from '../../Store/userSlice'
import { useTranslation } from 'react-i18next'

const GetInTouch = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const siteUser = useSelector((state) => state.user)

  useEffect(() => {
    if (siteUser && siteUser.getInTouchData && siteUser.getInTouchData.status) {
      console.log('getInTouchData', siteUser.getInTouchData)
      setVerified(true)
      setError(false)
    }
    if (
      siteUser &&
      siteUser.getInTouchData &&
      !siteUser.getInTouchData.status
    ) {
      setVerified(false)
      setError(true)
    }
  }, [siteUser])

  return (
    <>
      <div className="flex flex-col lg:flex-row xl:flex-row bg-slate-100 py-5">
        {/* Right Section */}
        <div className="w-full lg:w-1/2 lg:px-5 ">
          <div className="px-5 ">
            <div className="text-color text-2xl lg:text-5xl xl:text-5xl font-bold mb-3">
              {t('get')} <span className="text-black"> {t('in')} </span>{' '}
              {t('touch')}
            </div>
            <p className="text-left mt-4 lg:mt-0">
              Move beyond traditional exams; embrace a culture of continuous
              growth with Testainty as your partner. We foster a mindset that
              values progress over perfection.
            </p>
            <p className="text-left mt-4 lg:mt-0">
              Contact us today to begin your journey towards a more dynamic and
              personalized evaluation.
            </p>
            {/* <p className='text-left mt-4 lg:mt-0'>
                            As an innovative evaluation platform, Testainty offers a comprehensive suite of features that seamlessly blend accuracy with user-centric design. Whether you're an educator seeking advanced assessment tools, a learner on a journey of self-discovery, or an organization aiming to streamline evaluations, Testainty is your partner in excellence.
                        </p> */}
          </div>
        </div>
        {/* Left Section */}
        <div className="w-full lg:w-1/2 lg:px-5  flex justify-center items-center ">
          {verified ? (
            <>
              {/* <VerifyUser /> */}
              <div className="text-center mt-10 px-10">
                <h1 className="text-2xl font-bold mb-4 text-success">
                  Please verify your email. A link has been sent to your email
                  address.
                </h1>
                <p>We'll get back to you shortly.</p>
              </div>
            </>
          ) : (
            <div className="w-[80%] mb-4">
              <Formik
                initialValues={{ name: '', email: '', description: '' }}
                validate={(values) => {
                  const errors = {}
                  if (!values.name) {
                    errors.name = 'required'
                  }
                  if (!values.email) {
                    errors.email = 'required'
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = 'invalid Email Address'
                  }
                  if (!values.description) {
                    errors.description = 'required'
                  }
                  return errors
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  dispatch(createSiteUser(values))
                  // setVerified(false)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <div className="bg-g p-2 rounded">
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white h-full shadow text-black rounded"
                    >
                      <div className="p-5 lg:flex lg:flex-col lg:justify-center xl:flex xl:flex-col xl:justify-center ">
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Enter full name"
                            data-testid="name-input"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`mt-1 block w-full p-3 border h-11 ${
                              errors.name && touched.name
                                ? 'border-red-500'
                                : 'border-gray-300'
                            } rounded-md`}
                          />
                          {errors.name && touched.name && (
                            <div className="text-red-500 mt-2 text-sm">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            data-testid="email-input"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`mt-1 block w-full p-3 border h-11 ${
                              errors.email && touched.email
                                ? 'border-red-500'
                                : 'border-gray-300'
                            } rounded-md`}
                          />
                          {errors.email && touched.email && (
                            <div className="text-red-500 mt-2 text-sm">
                              {errors.email}
                            </div>
                          )}
                          {error && (
                            <div className="text-red-500 mt-2 text-sm">
                              This email is already in use. Please choose
                              another email address.
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Message
                          </label>
                          <textarea
                            id="description"
                            data-testid="description"
                            placeholder="Enter message"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`mt-1 block w-full p-3 border  ${
                              errors.description && touched.description
                                ? 'border-red-500'
                                : 'border-gray-300'
                            } rounded-md`}
                            rows="4"
                          />
                          {errors.description && touched.description && (
                            <div className="text-red-500 mt-2 text-sm">
                              {errors.description}
                            </div>
                          )}
                        </div>

                        <div className="px-0">
                          <button
                            type="submit"
                            className={`w-full text-white font-medium rounded-md h-11 btn-color ${
                              isSubmitting
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                            disabled={isSubmitting}
                            data-testid="submit"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default GetInTouch