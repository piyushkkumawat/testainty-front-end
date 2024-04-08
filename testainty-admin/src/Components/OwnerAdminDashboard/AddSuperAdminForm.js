import { Formik } from 'formik';
import { useDispatch} from 'react-redux';
import { createSuperAdmin } from '../../Store/userSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddSuperAdminForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  return (
  // <div className="container mx-auto mt-4">
    <div className="flex items-center justify-center w-full py-4 px-3">
      {/* <div className="w-1/2 max-lg:w-full"> */}
      <div className="w-1/2 max-lg:w-full">
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', mobile: '', roleType: '2', activated_on: '' }}
          validate={values => {
            const errors = {};

            // Validate name
            if (!values.firstName) {
              errors.firstName = 'Required';
            }

            if (!values.lastName) {
              errors.lastName = 'Required';
            }

            // Validate email
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }


            // Mobile number validation
            if (!values.mobile) {
              errors.mobile = 'Required'
            } else if (values.mobile.length < 10) {
              errors.mobile = 'Mobile number must be 10 digit'
            }

            if (!values.activated_on) {
              errors.activated_on = 'Required';
            }


            return errors;
          }}
          onSubmit={async(values) => {
            values.customerId = id
            delete values.customerName
            delete values.cpassword
           const response = await dispatch(createSuperAdmin(values))
           console.log(response)
           if(response && response.payload && response.payload.status){
            navigate('/dashboard')
           }
            // if(image){
            //     const formData = new FormData()
            //     formData.append('profile_picture',image)
            //     dispatch(imageUpload(formData))
            // }
          }}
          onReset={{ firstName: '', lastName: '', email: '', password: '', cpassword: '', mobile: '', roleType: '2', activated_on: '' }}
        >
          {(
            {
              values,
              errors,
              touched,
              handleChange,
              handleSubmit
            }
          ) => (
            <form className="bg-white px-5 py-3 shadow-lg rounded-md" onSubmit={handleSubmit}>
              <h2 className="text-xs sm:text-sm xl:text-lg font-bold text-left text-dark font font-serif mb-1">Create Super Admin<hr className="text-lime-500" /></h2>

              <div className="mb-2">
                <label htmlFor="firstName" className="block font-semibold text-xs sm:text-sm text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  data-testid="fname-input"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.firstName && touched.firstName && (
                  <div className="error-message text-red-600">{errors.firstName}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  data-testid="lname-input"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.lastName && touched.lastName && (
                  <div className="error-message text-red-600">{errors.lastName}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  data-testid="email-input"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.email && touched.email && (
                  <div className="error-message text-red-600">{errors.email}</div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="mobile" className="block text-xs sm:text-sm font-medium text-gray-700">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  data-testid="mobile-input"
                  value={values.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                />
                {errors.mobile && touched.mobile && (
                  <div className="error-message text-red-600">{errors.mobile}</div>
                )}
              </div>

              <div className="mb-2">
                <label htmlFor="activated_on" className="block text-xs sm:text-sm font-medium text-gray-700">Joining Date</label>
                <input
                  type="date"
                  id="activated_on"
                  data-testid="date-input"
                  value={values.activated_on}
                  onChange={handleChange}
                  placeholder="Enter Joining date"
                  className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 text-xs sm:text-sm"
                />
                {errors.activated_on && touched.activated_on && (
                  <div className="error-message text-red-600">{errors.activated_on}</div>
                )}
              </div>
              {/* <div className="mb-3">
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                                        <select name="mobile" value={values.name} onChange={handleChange} required className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 ">
                                            <option value="" disabled selected>Select Your Plan</option>
                                            {
                                                plan.map(data => {
                                                    return (
                                                        <option key={data.name} name={data.id} value={data.name}>{data.planName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div> */}

              {/* <div>
                                        <label htmlFor="activated_on" className="block text-sm font-medium text-gray-700 mt-1">Upload Image</label>
                                        <div className="border-1 p-1 rounded w-100  border-gray-300 mt-1">
                                            <input type="file" className="relative w-100 cursor-pointer" accept=".jpg,.png,.gif" onChange={(e) => setImage(e.target.files[0])} />
                                        </div>
                                    </div> */}


              <div className="mt-4 flex item-start justify-center space-x-7 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
                <button type="submit" data-testid="submit" className="btn-color text-white font-medium rounded-md h-10 px-5 max-lg:px-1">Submit</button>
                <Link to="/dashboard"><button className="w-full bg-slate-100 text-black font-medium rounded-md h-10 px-5 max-lg:px-1">Cancel</button></Link>
              </div>
            </form>
          )}

        </Formik>
      </div>
    </div>
  //     </div>
  // </div>
  )
};

export default AddSuperAdminForm;
