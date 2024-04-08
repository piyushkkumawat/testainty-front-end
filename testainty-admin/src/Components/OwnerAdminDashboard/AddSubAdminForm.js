import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { createSubAdmin } from '../../Store/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const AddSubAdminForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    // <div className="container mx-auto mt-4">
    <div className="flex items-center justify-center h-screen w-full py-4 px-[28px] ">
      {/* <div className="w-1/2 max-lg:w-full"> */}
      <div className="w-full xl:w-1/2 ">
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', mobile: '' }}
          validate={(values) => {
            const errors = {}

            // Validate name
            if (!values.firstName) {
              errors.firstName = 'Required'
            }

            if (!values.lastName) {
              errors.lastName = 'Required'
            }

            // Validate email
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            // Mobile number validation
            if (!values.mobile) {
              errors.mobile = 'Required'
            } else if (values.mobile.length < 10) {
              errors.mobile = 'Mobile number must be 10 digit'
            }
            return errors
          }}
          onSubmit={async (values) => {
            const response = await dispatch(createSubAdmin(values))
            if (response && response.payload && response.payload.status) {
              navigate('/subAdmins')
            }
          }}
          onReset={{ firstName: '', lastName: '', email: '', mobile: '' }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form
              className="bg-white p-4 shadow-lg rounded-md"
              onSubmit={handleSubmit}
            >
              <h4 className="text-sm sm:text-sm xl:text-lg font-bold text-left text-dark font">
                Create Author
              </h4>
              <hr className="hr" />
              <div className="mb-2">
                <label
                  htmlFor="firstName"
                  className="block font-medium text-xs sm:text-sm text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.firstName && touched.firstName && (
                  <div className="error-message text-red-600">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="lastName"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.lastName && touched.lastName && (
                  <div className="error-message text-red-600">
                    {errors.lastName}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.email && touched.email && (
                  <div className="error-message text-red-600">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="mobile"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  id="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.mobile && touched.mobile && (
                  <div className="error-message text-red-600">
                    {errors.mobile}
                  </div>
                )}
              </div>

              <div className="mt-4 flex item-start justify-center space-x-7 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
                <button
                  type="submit"
                  className="btn-color text-white font-medium rounded-md h-10 px-5 max-lg:px-1"
                >
                  Submit
                </button>
                <Link to="/subAdmins">
                  <button className="w-full bg-slate-100 text-black font-medium rounded-md h-10 px-5 max-lg:px-1">
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
    //     </div>
    // </div>
  )
}

export default AddSubAdminForm
