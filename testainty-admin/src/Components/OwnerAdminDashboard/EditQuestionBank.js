import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestionsBank, getSkills } from '../../Store/userSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { commonService } from '../../Services/common.services'
import { apiConstants } from '../../Constants/api.constant'
// import { commonService } from '../../Services/common.services';
// import { apiConstants } from '../../Constants/api.constant';

const EditQuestionBank = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [skill, setSkill] = useState([])
  const [initialValues, setInitialValues] = useState({})
  const questionBankType = [
    { id: 1, typeName: 'Theory' },
    { id: 2, typeName: 'Practical' },
  ]

  const levels = 
 [
  {
    id: 1, level: 'Beginner'
  },
  {
    id: 2, level: 'Intermediate'
  },
  {
    id: 3, level: 'Advanced'
  },
 ]

  const listOfSkills = useSelector((state) => state.user.skills)

  useEffect(() => {
    dispatch(getSkills())
  }, [dispatch])

  useEffect(() => {
    // setLoading(true);
    if (listOfSkills && listOfSkills.skills) {
      setSkill(listOfSkills?.skills)
      // setLoading(false);
    }
  }, [listOfSkills])

  useEffect(() => {
    let obj = {
      questionBankId: id,
    }
    const getData = async () => {
      const response = await commonService.withToken(apiConstants.UPDATE_QUESTION_BANK_BY_ID, obj)
      console.log('response', response)
      if (response?.data && response?.data?.data) {
        // setCustomerData(response.data.data)
        const tempobj = {
          description: response?.data?.data?.description || '',
          qBanklevel: response?.data?.data?.qBanklevel || '',
          type: response?.data?.data?.type || '',
          skillId: response?.data?.data?.skill || '',
        }
        setInitialValues(tempobj)
      }
      return response
    }
    getData()

  }, [id])

  console.log('initialValues', initialValues)
  return (
    Object.keys(initialValues).length &&
    <div className="w-full py-4 flex justify-around items-center">
      <div>
        <Formik
          initialValues={initialValues}
          validate={() => {
            const errors = {}
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log('value', values)
            dispatch(addQuestionsBank(values))
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
          }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow text-black w-full px-5 py-3"
            >
              <h4 className="text-color text-sm lg:text-xl xl:text-xl">
                Edit Question Bank
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
                  placeholder="Enter Question Bank Description"
                  value={values.description}
                  onChange={handleChange}
                  data-testid="description-input"
                  // onBlur={handleBlur}
                  className='mt-1 block text-xs sm:text-sm w-full p-3 border border-gray-300 h-10 rounded-md placeholder:text-xs sm:placeholder:text-sm'
              
                />
                {/* {errors.description && touched.description && (
                  <div className="text-red-500 mt-2 text-sm">
                    {errors.description}
                  </div>
                )} */}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="qBanklevel"
                  className="text-gray-700 text-xs sm:text-sm font-medium"
                >
                  Level
                </label>
                <select
                  name="qBanklevel"
                  value={values.qBanklevel}
                  data-testid="qBanklevel-input"
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 text-xs sm:text-sm "
                >
                  <option value="" selected>Select level</option>

                  {
                    levels?.map(value => {
                      return (
                        <option key={value.id} name={value.id} value={value.level} selected={values.qBanklevel === value.level}>{value.level}</option>
                      )
                    })
                  }
                 
                </select>
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
                  value={values.skillName}
                  data-testid="Skills-input"
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 text-xs sm:text-sm"
                >
                  <option value="">Select Skills</option>
                  {skill.map((data) => {
                    return (
                      <option
                        key={data._id}
                        name={data.skillName}
                        value={data._id}
                        selected={values.skillId === data._id}
                      >
                        {data.skillName}
                      </option>
                    )
                  })}
                </select>
              </div>
              {/*  <button
                                    type="submit"
                                    data-testid="submit"
                                    className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button> */}

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
                        selected={values.type === data.typeName}
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
                  className="btn-color text-white font-medium rounded-md h-10 px-5 max-lg:px-1"
                  type="submit"
                  data-testid="submit"
                >
                  Submit
                </button>
                <Link to="/questionBank">
                  <button
                    className="w-full bg-slate-100 text-black font-medium rounded-md h-10 px-5 max-lg:px-1"
                    type="reset"
                    data-testid="reset"
                  >
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

export default EditQuestionBank
