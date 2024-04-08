import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { commonService } from '../../Services/common.services';
import { apiConstants } from '../../Constants/api.constant';
import { updateCustomer } from '../../Store/userSlice';
import Loader from '../Loader';

const UpdateCustomerForm = () => {
    
  const [initialValues, setInitialValues] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const plan = [
    { id: 1, planName: 'free' },
    { id: 2, planName: 'basic' },
    { id: 3, planName: 'preminum' }
  ]

  const status = [
    { id: 0, status: 'Inactive' },
    { id: 1, status: 'Active' },
    { id: 2, status: 'Pending' }
  ]

  useEffect(() => {
    const obj = {
      customerId: id
    }
    const getData = async () => {
      const response = await commonService.withToken(apiConstants.GET_CUSTOMER_BY_ID, obj)
      if (response.data && response.data.data) {
        // setCustomerData(response.data.data)
        const tempobj = {
          customerId: id,
          customerName: response.data.data.customerName || '',
          email: response.data.data.email || '',
          plan: response.data.data.plan || '',
          planStart: response.data.data.planStart || '',
          planEnd: response.data.data.planEnd || '',
          status: response.data.data.status || ''
        };
        setInitialValues(tempobj);
      }
      return response
    }
    getData()

  }, [id])

  if(!Object.keys(initialValues).length){
    return (
      <>
      <Loader />
      </>
    )
  }

  return (
  
        <div className="flex items-center justify-center py-4 px-3 h-auto main-bg">
          <div className="w-1/2 max-xl:w-full">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                dispatch(updateCustomer(values))
                navigate('/dashboard')
              }}
              onReset={{ customerId: id, customerName: '', email: '', plan: '', planStart: '', planEnd: '', status:0 }}
            >
              {(
                {
                  values,
                  handleChange,
                  handleSubmit
                }
              ) => (
                <form className="bg-white p-4 px-5 shadow-lg rounded-md " onSubmit={handleSubmit}>
                  <h2 className="text-xs sm:text-sm xl:text-lg font-bold text-left text-dark font font-serif mb-1">Update Customer Data <hr className="text-color" /></h2>
                  <div className="mb-2">
                    <label htmlFor="customerName" className="block text-xs sm:text-sm font-semibold text-gray-700">Name</label>
                    <input
                      type="text"
                      id="customerName"
                      data-testid="name-input"
                      value={values.customerName}
                      onChange={handleChange}
                      className="mt-1 block text-xs sm:text-sm w-full p-3 border border-gray-300 h-10 rounded-md placeholder:text-xs sm:placeholder:text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      data-testid="email-input"
                      value={values.email}
                      onChange={handleChange}
                      className="mt-1 block text-xs sm:text-sm w-full p-3 border border-gray-300 h-10 rounded-md placeholder:text-xs sm:placeholder:text-sm"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="plan" className="block text-xs sm:text-sm font-semibold text-gray-700">Plan</label>
                    <select name="plan" data-testid="plan-input" value={values.plan} onChange={handleChange} className="mt-1 block w-full px-2 border border-gray-300 h-11 rounded-md focus:ring-primary focus:border-primary text-xs sm:text-sm">
                      <option>Select Your Plan</option>
                      {
                        plan.map(data => {
                          return (
                            <option key={data.id} name={data.id} value={data.plan} selected={values.plan === data.planName} >{data.planName}</option>
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
                      data-testid="startDate-input"
                      value={values.planStart}
                      onChange={handleChange}
                      name="planStart"
                      className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md text-xs sm:text-sm"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="block text-xs sm:text-sm font-semibold text-gray-700">End Date</label>
                    <input
                      type="date"
                      id="planEnd"
                      data-testid="endDate-input"
                      name="planEnd"
                      value={values.planEnd}
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 h-10 rounded-md text-xs sm:text-sm"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="block text-xs sm:text-sm font-semibold text-gray-700">Status</label>
                    <select name="status" data-testid="status-input" value={values.id} onChange={handleChange} className="mt-1 block w-full px-2 border border-gray-300 h-11 rounded-md focus:ring-primary focus:border-primary text-xs sm:text-sm">
                      {
                        status.map(data => {
                          return (
                            <option key={data.id} name={data.id} value={data.id} selected={values.status === data.id} >{data.status}</option>
                          )
                        })
                      }
                    </select>
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
  )
};

export default UpdateCustomerForm;
