import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestionsBank, getSkills } from '../../Store/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const AddQuestionBank = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [skill, setSkill] = useState([])
  const questionBankType = [
    { id: 1, typeName: 'Theory' },
    { id: 2, typeName: 'Practical' },
  ]

  const listOfSkills = useSelector((state) => state.user.skills)

  useEffect(() => {
    dispatch(getSkills())
  }, [dispatch])

  useEffect(() => {
    // setLoading(true);
    if (listOfSkills && listOfSkills.skills) {
      // const data = listOfSkills?.skills;
      setSkill(listOfSkills?.skills)
      // setLoading(false);
    }
  }, [listOfSkills])

  return (
    <div className="py-4 w-full d-flex justify-content-around align-items-center max-md:flex-col px-[28px]">
      <div>
        <Formik
          initialValues={{
            description: '',
            qBanklevel: '',
            skillId: '',
            type: '',
          }}
          validate={(values) => {
            const errors = {}
            if (!values.description) {
              errors.description = 'Required'
            }

            if (!values.qBanklevel) {
              errors.qBanklevel = 'Required'
            }

            if (!values.skillId) {
              errors.skillId = 'Required'
            }

            if (!values.type) {
              errors.type = 'Required'
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await dispatch(addQuestionsBank(values))
            setSubmitting(false)
            navigate('/questionBank')
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
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow text-black px-5 rounded py-3 w-full "
            >
              <h4 className="text-sm sm:text-sm xl:text-lg font-bold text-left text-dark font">
                Add Question Bank
              </h4>
              <hr className="hr" />
              <div className="mb-4">
                <label
                  htmlFor="skillName"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Question Bank Description
                </label>
                <textarea
                  id="description"
                  data-testid="description-input"
                  placeholder="Enter Question Bank Description"
                  value={values?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1  w-full p-2 border placeholder:text-xs sm:placeholder:text-sm placeholder:text-gray-700 ${
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
              <div className="mb-4">
                <label
                  htmlFor="qBanklevel"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Level
                </label>
                <select
                  name="qBanklevel"
                  data-testid="qBanklevel-input"
                  value={values.qBanklevel}
                  onChange={handleChange}
                  className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 text-xs sm:text-sm"
                >
                  <option value="">Select level</option>
                  <option name="Beginner" value="Beginner">
                    Beginner
                  </option>
                  <option name="Intermediate" value="Intermediate">
                    Intermediate
                  </option>
                  <option name="Advanced" value="Advanced">
                    Advanced
                  </option>
                </select>
                {errors.qBanklevel && touched.qBanklevel && (
                  <div className="text-red-500 mt-2 text-sm">
                    {errors.qBanklevel}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="skillId"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <select
                  name="skillId"
                  data-testid="Skills-input"
                  value={values.skillName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 text-xs sm:text-sm"
                >
                  <option value="">Select Skills</option>
                  {skill.map((data) => {
                    return (
                      <option
                        key={data._id}
                        name={data.skillName}
                        value={data._id}
                      >
                        {data.skillName}
                      </option>
                    )
                  })}
                </select>

                {errors.skillId && touched.skillId && (
                  <div className="text-red-500 mt-2 text-sm">
                    {errors.skillId}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="typeId"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  name="type"
                  data-testid="type-input"
                  value={values.typeName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 text-xs sm:text-sm"
                >
                  <option value="">Select Type</option>
                  {questionBankType.map((data) => {
                    return (
                      <option
                        key={data.id}
                        name={data.typeName}
                        value={data.typeName}
                      >
                        {data.typeName}
                      </option>
                    )
                  })}
                </select>
                {errors.type && touched.type && (
                  <div className="text-red-500 mt-2 text-sm">{errors.type}</div>
                )}
              </div>
           
              <div className="mt-4 flex item-start justify-center space-x-7 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
              <button
                type="submit"
                data-testid="submit"
                className={`w-full btn-color text-white font-medium rounded-md h-11 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
                <Link to="/questionBank">
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
  )
}

export default AddQuestionBank
