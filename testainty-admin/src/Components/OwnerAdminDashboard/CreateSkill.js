import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { createSkills } from '../../Store/userSlice';
import { useNavigate } from 'react-router-dom';


const CreateSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
  // <div className=' d-flex justify-content-around align-items-center '>
    <div className='h-screen w-full flex justify-around items-center max-md:flex-col  px-[28px]'>
      <div>
        <Formik
          initialValues={{ skillName: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.skillName) {
              errors.skillName = 'Required';
            } 
            return errors;
          }}
          onSubmit={async(values, { setSubmitting }) => {
            await dispatch(createSkills(values));
            setSubmitting(false);
            navigate('/skills')
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
            <form onSubmit={handleSubmit} className='bg-white shadow text-black px-5 py-3 mt-3 w-100'>
              <h4 className='text-dark font font-bold text-sm lg:text-xl xl:text-xl'>Add Skill</h4>
              <hr className='hr' />
              <div className="mb-4">
                <label htmlFor="skillName" className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Skill
                </label>
                <input
                  type="text"
                  id="skillName"
                  placeholder="Enter skill"
                  data-testid="skillName-input"
                  value={values.skillName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full p-3 border h-11 placeholder:text-xs sm:placeholder:text-sm ${errors.skillName && touched.skillName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {errors.skillName && touched.skillName && (
                  <div className="text-red-500 mt-2 text-sm">{errors.skillName}</div>
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
  );

};

export default CreateSkill;