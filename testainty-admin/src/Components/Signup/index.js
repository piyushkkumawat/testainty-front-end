import { useEffect, useState } from 'react';
import { FormGroup, Label, Input} from 'reactstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../Store/commonSlice';
import { useNavigate } from 'react-router-dom';
import { registration } from '../../Store/signupSlice';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])
  const getRoleData = useSelector((state) => state.roles)
  const [showPwd, setShowPwd] = useState(false)
  const handleClick = () => {
    setShowPwd(!showPwd);
  }

  useEffect(() => {
    dispatch(getRole())
  }, [dispatch])

  useEffect(() => {
    if (getRoleData && getRoleData.data) {
      setRoles(getRoleData.data.data)
    }
  }, [getRoleData])


  return (
    <div className='md:h-screen flex justify-content-around align-items-center'>
      <div className='shadow-lg bg-white p-5 border-l-8 border-primary rounded h-90 w-9/12  d-flex justify-content-around align-items-center max-md:flex-col'>
        <div>
          <img src="./assets/images/logo.png" alt='logo' width="400" />
        </div>
        <div className='w-full md:w-2/5'>
          <Formik
            initialValues={{ companyName: '', email: '', mobile: '', password: '', confirmpassword: '', gender: '', role: '' }}
            validate={values => {
              const errors = {};

              // Validate name
              if (!values.companyName) {
                errors.companyName = 'Required';
              }

              // Validate email
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }

              // Validate password
              if (!values.password) {
                errors.password = 'Required';
              } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters long';
              }

              // Mobile number validation
              if (!values.mobile) {
                errors.mobile = 'Required'
              } else if (values.mobile.length < 10) {
                errors.mobile = 'Mobile number must be 10 digit'
              }

              // Validate confirmpassword
              if (!values.confirmpassword) {
                errors.confirmpassword = 'Required';
              } else if (values.password !== values.confirmpassword) {
                errors.confirmpassword = 'Passwords do not match';
              }

              // Validate gender
              if (!values.gender) {
                errors.gender = 'Required';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const valuesData = { ...values }
              delete valuesData.confirmpassword
              setSubmitting(false)

              dispatch(registration(valuesData))
              navigate('/')
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
              
              <form onSubmit={handleSubmit} className=' text-black ' >
                <h4 className='text-color text-sm lg:text-xl xl:text-xl'>Create an Account</h4>
                <hr className='text-primary' />
                <div className="mb-3">
                  <label htmlFor="companyName" className="text-xs sm:text-sm font-medium text-gray-700">
                      Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    data-testid="name-input"
                    placeholder="Enter Company Name"
                    value={values.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 w-full p-3 border placeholder:text-xs h-5 ${errors.companyName && touched.companyName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {errors.companyName && touched.companyName && (
                    <div className="text-red-500 mt-2 text-xs">{errors.companyName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
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
                    className={`mt-1 w-full p-3 border placeholder:text-xs h-5 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 mt-2 text-xs">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3" style={{ position: 'relative' }}>
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
                  <label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
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
                    className={`mt-1 w-full p-3 border placeholder:text-xs h-5 ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 mt-2 text-xs">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="text-xs sm:text-sm font-medium text-gray-700">
                      confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmpassword"
                    data-testid="confirmpassword-input"
                    placeholder="Enter confirm password"
                    value={values.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 w-full p-3 border placeholder:text-xs h-5 ${errors.confirmpassword && touched.confirmpassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {errors.confirmpassword && touched.confirmpassword && (
                    <div className="text-red-500 mt-2 text-xs">{errors.confirmpassword}</div>
                  )}
                </div>

                <FormGroup>
                  <Label htmlFor="gender" className=' text-xs sm:text-sm font-semibold'>Gender</Label>
                  <div>
                    <Label className=' text-xs sm:text-sm' style={{ marginRight: '10px' }}>
                      <Input
                        type="radio"
                        data-testid="radio1-input"
                        name="gender"
                        value="male"
                        checked={values.gender === 'male'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`text-xs ${errors.gender && touched.gender ? 'error' : ''}`}
                      />
                      {' '}
                        Male
                    </Label>
                    <Label className='text-xs'>
                      <Input
                        type="radio"
                        data-testid="radio2-input"
                        name="gender"
                        value="female"
                        checked={values.gender === 'female'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`text-xs ${errors.gender && touched.gender ? 'error' : ''}`}
                      />
                      {' '}
                        Female
                    </Label>
                  </div>
                  {errors.gender && touched.gender && (
                    <div className="error-message">{errors.gender}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label className=' text-xs sm:text-sm'>Role</Label>
                  <Input type="select" data-testid="select-input" name="role" id="role" onChange={handleChange} className='text-xs sm:text-sm placeholder:text-xs'>
                    <option value="select" className='text-xs sm:text-sm placeholder:text-xs'>Select a role</option>
                    {
                      roles?.map(data => {
                        return (
                          <option key={data._id} value={data._id}>{data.roleName}</option>
                        )
                      })
                    }

                  </Input>
                </FormGroup>

                <button
                  type="submit"
                  data-testid="sign-Up"
                  className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>

              </form>
            )}
          </Formik>
        </div>
      </div>

    </div>









  )
}

export default Signup