/*eslint-disable no-undef*/
import { useEffect } from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import {
  addQuestion,
  getQuestionsBank,
  getLanguages,
} from '../../Store/userSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import debounce from 'lodash.debounce'
import { MdOutlineEditCalendar } from 'react-icons/md'
import OptionEditorModal from '../Modal/OptionEditorModal'
import DescriptionEditorModal from '../Modal/DescriptionEditorModal'
import { Editor } from '@tinymce/tinymce-react'

const AddQuestions = () => {
  const dispatch = useDispatch()
  const languageState = useSelector((state) => state.user)
  const qType = JSON.parse(localStorage.getItem('qtype'))

  console.log('qType', qType)
  const { id } = useParams()
  const navigate = useNavigate()
  const [testCases, setTestCases] = useState([
    { input: '', output: '', desc: '', weightage: 0 },
  ])
  const totalWeight = testCases?.reduce((acc, curr) => {
    const weight = parseFloat(curr.weightage)
    return isNaN(weight) ? acc : acc + weight
  }, 0)
  const remainingWeight = 100 - totalWeight

  const remainingWeightMessage =
    remainingWeight >= 0 ? '' : 'Total weightage exceeded 100!'

  const [questionType, setQuestionType] = useState(qType)
  const [questionDescription, setQuestionDescription] = useState('')
  const [languageId, setLanguageId] = useState('')
  const [languages, setLanguages] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isDesc, setIsDesc] = useState(false)
  const [isCodeEditorMode, setIsCodeEditorMode] = useState(false)
  const [optimizedSolution, setOptimizedSolution] = useState('')
  const [optionIndex, setOptionIndex] = useState(null)
  const [textOptions, setTextOptions] = useState([
    { A: '' },
    { B: '' },
    { C: '' },
    { D: '' },
  ])
  const [initialValue, setInitialValue] = useState({
    questionTitle: '',
    options: textOptions,
    correctAnswer: '',
  })

  const handleInputsChange = (index, event) => {
    const updatedTextOptions = [...textOptions]
    console.log(updatedTextOptions)
    updatedTextOptions[index][String.fromCharCode(65 + index)] =
      event.target.value
    // addTextOption(event.target.value); // Call addTextOption on change
    setTextOptions(updatedTextOptions)
  }

  useEffect(() => {
    if (qType === 'Theory') {
      const objectiveObj = {
        questionTitle: '',
        options: textOptions,
        correctAnswer: '',
      }
      setInitialValue(objectiveObj)
    }
    if (qType === 'Practical') {
      const practicalObj = {
        questionTitle: '',
        qType: qType,
        questionDecription: '',
        languageId: '',
        testCaseFunction: '',
        initialCode: '',
        optimizedSolution: '',
      }
      setInitialValue(practicalObj)
    }
  }, [qType, textOptions])

  useEffect(() => {
    const debouncedGetData = debounce(() => {
      dispatch(getLanguages())
    }, 0) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [dispatch])

  useEffect(() => {
    if (languageState && languageState.languages) {
      setLanguages(languageState?.languages?.languages)
    }
  }, [languageState])

  const handleSelectType = (e) => {
    setQuestionType(e.target.value)
  }

  const handleLanguageType = (e) => {
    setLanguageId(e.target.value)
  }

  const handleAddTestCase = () => {
    setTestCases([...testCases, { name: '', weightage: 0 }])
  }

  const handleInputChange = (index, event) => {
    const newTestCases = [...testCases]
    newTestCases[index][event.target.name] = event.target.value
    setTestCases(newTestCases)
  }

  const handleWeightageChange = (index, weightage) => {
    const newTestCases = [...testCases]
    newTestCases[index].weightage = weightage
    setTestCases(newTestCases)
  }

  const handleDeleteTestCase = (index) => {
    const updatedTestCases = [...testCases]
    updatedTestCases.splice(index, 1)
    setTestCases(updatedTestCases)
  }

  const handleEditClick = () => {
    setIsShow(true)
    setIsDesc(true)
    if (questionDescription.length) {
      setIsCodeEditorMode(true)
    }
  }

  console.log(totalWeight, 'total')

  return (
    <>
      <div className="w-full flex justify-center items-center py-3 h-auto main-bg px-[28px]">
        <Formik
          initialValues={initialValue}
          validate={(values) => {
            const errors = {}
            if (!values.questionTitle) {
              errors.questionTitle = 'Required'
            }

            if (qType === 'Practical') {
              if (!languageId) {
                errors.languageId = 'Required'
              }

              if (remainingWeight < 0) {
                errors.remainingWeightMessage = 'Total weightage exceeded 100!'
              }
              if (totalWeight !== 100) {
                errors.totalWeight = 'Total weightage should be 100!'
              }
              if(totalWeight === 100){
                errors.totalWeight = ''
              }
            }

            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              values.qBank = id
              values.questionDescription = questionDescription

              if (qType === 'Theory') {
                values.qType = 'Objective'
                values.options = textOptions
                delete values.testCases
              }
              if (qType === 'Practical') {
                values.qType = qType
                values.languageId = languageId
                values.testCases = testCases
                // values.optimizedSolution = optimizedSolution

                // values.testCaseFunction = testCaseFunction
                delete values.correctAnswer
                delete values.options
              }

              console.log('value', values)
            } catch (error) {
              console.log('err', error)
            }

            await dispatch(addQuestion(values))
            setSubmitting(false)
            const obj = {
              offset: 1,
              limit: 5,
            }
            await dispatch(getQuestionsBank(obj))
            navigate('/questionBank')
            localStorage.removeItem('qtype')
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
              className={`lg:w-3/5 xl:w-3/5 2xl:w-3/5 bg-white text-black w-full sm:w-full px-5 rounded
               py-3 shadow-lg `}
            >
              <h4 className="text-xs sm:text-sm xl:text-lg font-bold text-left text-dark font">
                Add Question
              </h4>
              <hr />
              <div className={`${qType === 'Practical' ? '' : ''}`}>
                <div className="mb-4">
                  <label
                    htmlFor="correctAnswer"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Question Type
                  </label>
                  <input
                    id="questionType"
                    data-testid="question-input"
                    value={qType === 'Theory' ? 'Objective' : 'Practical'}
                    disabled={true}
                    className="mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 border-gray-300 rounded-md"
                    rows="4"
                  />
                  {/* <select
                    name="correctAnswer"
                    data-testid="select-input"
                    value={values.name}
                    onChange={handleSelectType}
                    className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-blue-400-300 focus:outline-blue-300 text-xs sm:text-sm"
                  >
                    <option
                      name="Objective"
                      value="Objective"
                      className="text-xs sm:text-sm "
                    >
                      Objective
                    </option>
                    <option
                      name="Practical"
                      value="Practical"
                      className="text-xs sm:text-sm "
                    >
                      Practical
                    </option>
                  </select> */}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="questionTitle"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Question Title
                  </label>
                  <input
                    id="questionTitle"
                    data-testid="question-input"
                    placeholder="Enter Question"
                    value={values.questionTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 ${
                      errors.questionTitle && touched.questionTitle
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md`}
                    rows="4"
                  />
                  {errors.questionTitle && touched.questionTitle && (
                    <div className="text-red-500 mt-2 text-sm">
                      {errors.questionTitle}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="questionDecription"
                  className="block text-xs sm:text-sm font-semibold text-gray-700"
                >
                  Question Description
                </label>

                <div className="">
                  <input
                    type="text"
                    id="questionDescription"
                    data-testid="desc-input"
                    placeholder={
                      isCodeEditorMode
                        ? 'Open Text Editor'
                        : 'Enter description'
                    }
                    value={isCodeEditorMode ? '' : questionDescription}
                    onChange={(e) => {
                      setQuestionDescription(e.target.value)
                    }}
                    disabled={isCodeEditorMode}
                    onBlur={handleBlur}
                    className={`mt-1 w-full p-3 border h-11 placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm placeholder-gray-700  ${
                      errors.options && touched.options
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } rounded-md`}
                  />
                  <div className="relative">
                    <MdOutlineEditCalendar
                      className="absolute bottom-4 right-3 z-10"
                      onClick={handleEditClick}
                    />
                  </div>
                </div>

                {errors.questionDecription && touched.questionDecription && (
                  <div className="text-red-500 mt-2 text-sm">
                    {errors.questionDecription}
                  </div>
                )}
              </div>

              {qType === 'Theory' ? (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="options"
                      className="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Options
                    </label>
                    {textOptions?.map((option, index) => (
                      // console.log('option[index]?.status' , option )
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          data-testid="option-input"
                          id={`option${index + 1}`}
                          placeholder={(() => {
                            return option?.status
                              ? 'Open text editor'
                              : `Option ${String.fromCharCode(65 + index)}`
                          })()}
                          disabled={option?.status}
                          value={
                            option?.status
                              ? ''
                              : option[String.fromCharCode(65 + index)]
                          }
                          onChange={(e) => handleInputsChange(index, e)}
                          onBlur={handleBlur}
                          className={`mt-1 block w-full p-3 border h-11 placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm placeholder-gray-700 ${
                            errors.options && touched.options
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } rounded-md disabled`}
                        />
                        <div className="relative">
                          <MdOutlineEditCalendar
                            className="absolute right-3 z-10"
                            onClick={() => {
                              setIsOpen(true)
                              setOptionIndex(index)
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="correctAnswer"
                      className="block text-gray-700 text-xs sm:text-sm font-semibold"
                    >
                      Currect Answer
                    </label>
                    <select
                      name="correctAnswer"
                      data-testid="correctAnswer-input"
                      value={values.name}
                      onChange={handleChange}
                      className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-blue-400 focus:outline-blue-300 text-xs sm:text-sm"
                    >
                      <option value="" className="text-xs sm:text-sm ">
                        Select Currect Answer
                      </option>
                      <option name="A" value="A">
                        A
                      </option>
                      <option name="B" value="B">
                        B
                      </option>
                      <option name="C" value="C">
                        C
                      </option>
                      <option name="D" value="D">
                        D
                      </option>
                    </select>
                  </div>{' '}
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="correctAnswer"
                      className="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Language
                    </label>
                    <select
                      name="languageId"
                      data-testid="select-input"
                      value={values.name}
                      onChange={handleLanguageType}
                      className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-blue-400 focus:outline-blue-300 text-xs sm:text-sm"
                    >
                      <option value="">Select language</option>
                      {languages.map((data) => {
                        return (
                          <option
                            key={data.languageId}
                            className="mt-5"
                            value={data.languageId}
                          >
                            {data.name}
                          </option>
                        )
                      })}
                    </select>
                    {errors.languageId && (
                      <div className="text-red-500 mt-2 text-sm">
                        {errors.languageId}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 ">
                    <label
                      htmlFor="questionTitle"
                      className="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Test Case Function
                    </label>

                    <textarea
                      id="testCaseFunction"
                      data-testid="question-input"
                      placeholder="Enter Test Case function"
                      value={values.testCaseFunction}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 ${
                        errors.questionTitle && touched.questionTitle
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md`}
                      rows="4"
                    />
                    {/* {errors.questionTitle && touched.questionTitle && (
                                <div className="text-red-500 mt-2 text-sm">{errors.questionTitle}</div>
                            )} */}
                  </div>
                  <div className="mb-4 ">
                    <label
                      htmlFor="initialCode"
                      className="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Initial Code
                    </label>
                    <textarea
                      id="initialCode"
                      data-testid="question-input"
                      placeholder="Enter Initial Code"
                      value={values.initialCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 ${
                        errors.questionTitle && touched.questionTitle
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md`}
                      rows="4"
                    />
                    {/* {errors.questionTitle && touched.questionTitle && (
                                <div className="text-red-500 mt-2 text-sm">{errors.questionTitle}</div>
                            )} */}
                  </div>

                  <div className="mb-4 ">
                    <label
                      htmlFor="optimizedSolution"
                      className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1"
                    >
                      Optimized Solution
                    </label>
                    <textarea
                      id="optimizedSolution"
                      data-testid="optimizedSolution"
                      placeholder="Enter Optimized Solution "
                      value={values.optimizedSolution}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 ${
                        errors.optimizedSolution && touched.optimizedSolution
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md`}
                      rows="4"
                    />


                    {/* <Editor
                      id="optimizedSolution"
                      name="optimizedSolution"
                      apiKey={process.env.REACT_APP_TINY_API_KEY}
                      value={optimizedSolution}
                      menubar={false}
                      init={{
                        selector: 'textarea',
                        menu: {},
                        height: '250px',
                        plugins: '',
                        toolbar:
                          'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
                      }}
                      onEditorChange={(content) => {
                        setOptimizedSolution(content)
                      }}
                    /> */}

                    {/* {errors.questionTitle && touched.questionTitle && (
                                <div className="text-red-500 mt-2 text-sm">{errors.questionTitle}</div>
                            )} */}
                  </div>
                  <div className="flex justify-between mt-2 mb-2">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                      Test Cases
                    </label>
                    <label className="block text-xs sm:text-sm font-semibold text-green-600">
                      {remainingWeight >= 0
                        ? `Weightage remaining  ${remainingWeight} out of 100.`
                        : ''}
                    </label>
                  </div>
                  <hr />
                  {testCases.map((testCase, index) => (
                    <div key={index} className="mb-4">
                      <div className="mt-2 mb-2">
                        <label
                          htmlFor={`TestCase${index}`}
                          className="block text-xs sm:text-sm font-semibold text-gray-500"
                        >
                          Test Case {index + 1}
                        </label>
                      </div>
                      <div className="flex">
                        <div className="w-1/2 pr-2">
                          <label
                            htmlFor={`input_${index}`}
                            className="block text-xs sm:text-sm font-semibold text-gray-700"
                          >
                            Input
                          </label>
                          <input
                            type="text"
                            id={`input_${index}`}
                            name="input"
                            value={testCase.input}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full border rounded py-1 px-2"
                          />
                        </div>
                        <div className="w-1/2 pl-2">
                          <label
                            htmlFor={`output_${index}`}
                            className="block text-xs sm:text-sm font-semibold text-gray-700"
                          >
                            Output
                          </label>
                          <input
                            type="text"
                            id={`output_${index}`}
                            name="output"
                            value={testCase.output}
                            onChange={(e) => handleInputChange(index, e)}
                            className="w-full border rounded py-1 px-2"
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <label
                          htmlFor={`weightage_${index}`}
                          className="block text-xs sm:text-sm font-semibold text-gray-700"
                        >
                          Weightage
                        </label>
                        <input
                          type="number"
                          id={`weightage_${index}`}
                          name="weightage"
                          value={testCase.weightage}
                          onChange={(e) =>
                            handleWeightageChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full border rounded py-1 px-2"
                        />
                        <div className="text-red-500 mt-2 text-sm">
                          {remainingWeightMessage}
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor={`desc_${index}`}
                          className="block text-xs sm:text-sm font-semibold text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          id={`desc_${index}`}
                          name="desc"
                          data-testid="question-input"
                          placeholder="Enter description"
                          value={testCase.desc}
                          onChange={(e) => handleInputChange(index, e)}
                          className={`mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 
rounded-md`}
                          rows="2"
                        />
                      </div>
                      <div className="flex">
                        {testCases.length > 1 && (
                          <div
                            className="mt-2"
                            onClick={() => handleDeleteTestCase(index)}
                            title={'Add more - Test Case'}
                          >
                            <RiDeleteBin6Line className="text-red-600 text-lg cursor-pointer" />
                          </div>
                        )}

                        {index === testCases.length - 1 && (
                          <div
                            className="mt-2 ml-auto"
                            onClick={handleAddTestCase}
                            title={'Add more - Test Case'}
                          >
                            <BiAddToQueue />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {errors.totalWeight && (
                    <div className="text-red-500 mt-2 text-sm">
                      {errors.totalWeight}
                    </div>
                  )}
                </>
              )}

              {/* <button
                                    type="submit"
                                    data-testid="submit"
                                    className={`w-full btn-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button> */}

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
      <OptionEditorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        optionIndex={optionIndex}
        setTextOptions={setTextOptions}
        textOptions={textOptions}
      />
      <DescriptionEditorModal
        setIsCodeEditorMode={setIsCodeEditorMode}
        isShow={isShow}
        setIsShow={setIsShow}
        questionDescription={questionDescription}
        setQuestionDescription={setQuestionDescription}
      />
    </>
  )
}

export default AddQuestions
/*eslint-enable no-undef*/
