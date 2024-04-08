import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createCustomer } from '../../Store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
 
const CreateCustomerForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const plan = [
    { id: 1, planName: 'free' },
    { id: 2, planName: 'basic' },
    { id: 3, planName: 'preminum' }
  ]

  return (
    <div className=" py-4 px-[28px] h-screen">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 max-lg:w-full">
          <div className="w-full">
            <Formik
              initialValues={{ customerName: '', email: '', plan: '', planStart: '', planEnd: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.customerName) {
                    errors.customerName = 'Required';
                }
                if (!values.email) {
                  errors.email = 'Required';
                }
                if (!values.planStart) {
                  errors.planStart = 'Required';
                }
                if (!values.planEnd) {
                  errors.planEnd = 'Required';
                }
                return errors;
              }}
              onSubmit={async (values) => {
                const response = await dispatch(createCustomer(values))
                if(response && response.payload && response.payload.status){
                  navigate('/dashboard')
                }
              }}
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
                <form className="bg-white p-4 px-5 shadow-lg rounded h-auto " onSubmit={handleSubmit}>
                  <h2 className="text-sm sm:text-sm xl:text-lg font-bold text-left text-dark font font-serif mb-1">Create Customer<hr className="text-lime-500"/></h2>
                  <div className="mb-2">
                    <label htmlFor="customerName" className="block text-xs sm:text-sm font-semibold text-gray-700">Name</label>
                    <input
                      type="text"
                      id="customerName"
                      data-testid="name-input"
                      value={values.customerName}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 placeholder:text-xs sm:placeholder:text-sm "
                    />
                    {errors.customerName && touched.customerName && (
                  <div className="text-red-500 mt-2 text-sm">{errors.customerName}</div>
                )}
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700">Email</label>
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
                        <div className="text-red-500 mt-2 text-sm">{errors.email}</div>
                      )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="plan" className="block text-xs sm:text-sm font-semibold text-gray-700">Plan</label>
                    <select name="plan" defaultValue={1} value={values.name} data-testid="plan-input" onChange={handleChange} required className="mt-1 block w-full p-1 border text-xs sm:text-sm border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300  ">
                      <option value="" selected>Select Your Plan</option>
                      {
                        plan.map(data => {
                          return (
                            <option key={data.id} name={data.id} value={data.name}>{data.planName}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="startDate" className="block text-xs sm:text-sm font-semibold text-gray-700">Start Date</label>
                    <input
                      type="date"
                      id="planStart"
                      data-testid="sdate-input"
                      value={values.planStart}
                      onChange={handleChange}
                      name="planStart"
                      className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 text-xs sm:text-sm "
                    />
                    {errors.planStart && touched.planStart && (
                        <div className="text-red-500 mt-2 text-sm">{errors.planStart}</div>
                      )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="block text-xs sm:text-sm font-semibold text-gray-700">End Date</label>
                    <input
                      type="date"
                      data-testid="edate-input"
                      id="planEnd"
                      name="planEnd"
                      value={values.planEnd}
                      onChange={handleChange}
                      className=" mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md focus:border-lime-200 focus:outline-lime-200 placeholder-gray-700 text-xs sm:text-sm"
                    />
                     {errors.planEnd && touched.planEnd && (
                        <div className="text-red-500 mt-2 text-sm">{errors.planEnd}</div>
                      )}
                  </div>
                  <div className="mt-4 flex item-start justify-center space-x-7 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
                    <button className="btn-color text-white font-medium rounded-md h-10 px-5 max-lg:px-1" type="submit" data-testid="submit">Submit</button>
                    <Link to="/dashboard"><button className="w-full bg-slate-100 text-black font-medium rounded-md h-10 px-5 max-lg:px-1" type="reset" data-testid="reset" >Cancel</button></Link>
                  </div>
                </form>
              )}

            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CreateCustomerForm;
