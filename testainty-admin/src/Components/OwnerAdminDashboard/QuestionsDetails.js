import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getQuestionsByQuestionBankId } from '../../Store/userSlice'
import { useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DeleteModal from '../Modal/DeleteModal'
import DataNotFound from '../404/DataNotFound'
import debounce from 'lodash.debounce'
import { parse } from 'node-html-parser'
import { FiEdit } from 'react-icons/fi'
import InputModal from '../Modal/InputModal'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import ScrollToTop from '../ScrollToTop/ScrollToTop'

const QuestionsDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [questionData, setQuestionData] = useState([])
  const [questionId, setQuestionId] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const [isShowEdit, setIsShowEdit] = useState(false)
  const [isError, setIsError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [filedName, setFiledName] = useState('')
  const [showTopBtn, setShowTopBtn] = useState(false)
  const questions = useSelector((state) => state.user)

  useEffect(() => {
    const debouncedGetData = debounce(() => {
      if (id) {
        const obj = {
          questionBankId: id,
        }
        dispatch(getQuestionsByQuestionBankId(obj))
      }
    }, 300) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [id, dispatch])

  useEffect(() => {
    setIsLoading(true)
    if (
      questions &&
      questions.getQuestionsdata &&
      questions.getQuestionsdata.status
    ) {
      //  const paredHtml = parse(questions.getQuestionsdata.data)
      //  console.log('paredHtml', paredHtml
      setQuestionData(questions.getQuestionsdata.data)
      setIsError(false)
      setIsLoading(false)
    }
    if (
      questions &&
      questions.getQuestionsdata &&
      !questions.getQuestionsdata.status
    ) {
      setIsError(true)
      setIsLoading(false)
    }
  }, [questions])

  const deleteModal = useMemo(
    () => (
      <DeleteModal
        isOpen={isShow}
        setIsOpen={setIsShow}
        data={{ questionId: questionId }}
      />
    ),
    [isShow, setIsShow, questionId]
  )

  const inputModal = useMemo(
    () => (
      <InputModal
        isShowEdit={isShowEdit}
        setIsShowEdit={setIsShowEdit}
        value={value}
        setValue={setValue}
        questionId={questionId}
        filedName={filedName}
        id={id}
        setQuestionData={setQuestionData}
      />
    ),
    [isShowEdit, setIsShowEdit, value, questionId, filedName, id]
  )

  const handleAddQuestions = () => {
    navigate('/questionBank/addQuestions/' + id)
  }

  const handleQuestionDelete = (questionId) => {
    setQuestionId(questionId)
    setIsShow(!isShow)
  }

  const handleEdit = (id, value, filedName) => {
    setValue(value)
    setFiledName(filedName)
    setQuestionId(id)
    setIsShowEdit(!isShow)
  }

  const handleBackClick = () => {
    navigate('/questionBank', { state: state })
  }

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY
      console.log('value', value)
      if (value > 400) {
        console.log('true')
        setShowTopBtn(true)
      } else {
        console.log('false')
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`p_five main-bg
    ${questionData?.length ? 'h-auto' : 'h-screen'} `}
    >
      <div className="flex justify-between items-center">
        {isLoading ? (
          <div
            className="spinner-border text-primary absolute top-50 z-1"
            style={{ left: '50%' }}
          ></div>
        ) : (
          <></>
        )}

        <div>
          <IoArrowBackCircleOutline
            className="mb-2 text-3xl cursor-pointer"
            onClick={handleBackClick}
            title='Back'
          />
        </div>

        <div className="flex justify-center sm:px-12">
          {/* <FaPlusCircle className="text-primary text-2xl lg:text-3xl cursor-pointer"  /> */}
          <img
            src="/assets/images/crt.png"
            className="w-20 cursor-pointer"
            onClick={handleAddQuestions}
            alt=""
            title='+ Add Questions'
          />
          {/* <span className="absolute top-10 scale-0 rounded border-1 border-gray-400  p-1 text-xs text-black group-hover:scale-100">
            + Add Questions
          </span> */}
        </div>
      </div>
      {isError ? (
        <DataNotFound />
      ) : (
        questionData?.map((question, index) => (
          <div key={question._id} className="py-4">
            <div
              className={`px-4 py-2 rounded shadow ${
                question.qType === 'Practical' ? 'bg-white' : 'bg-white'
              } `}
            >
              <div className="flex items-end justify-end">
                {/* <button className=" py-1 rounded-md text-black " onClick={() => handleEdit(question)}><FiEdit ></FiEdit></button> */}
                <button className="text-red-600">
                  <RiDeleteBin6Line
                    onClick={() => handleQuestionDelete(question._id)}
                  />
                </button>
              </div>
              <div className="text-xs sm:text-sm mb-2">
                {question?.qType === 'Objective' ? (
                  <div>
                    <div className="flex items-center">
                      <div>
                        <span className="font-semibold text-sm">
                          {index + 1}. {question.questionTitle}{' '}
                        </span>
                      </div>
                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question.questionTitle,
                              'questionTitle'
                            )
                          }
                        />
                      </div>
                    </div>

                    {question?.questionDescription ? (
                      <div className="mt-3 border border-gray-300 shadow-sm px-3 py-2 bg-white ">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-bold text-sm">Description</p>
                          </div>
                          <div>
                            <FiEdit
                              className="ml-4 cursor-pointer text-sm"
                              onClick={() =>
                                handleEdit(
                                  question._id,
                                  question.questionDescription,
                                  'questionDescription'
                                )
                              }
                            />
                          </div>
                        </div>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: parse(
                              question?.questionDescription
                            ).toString(),
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {question?.qType === 'Objective' && (
                <div className="my-3  border border-gray-300 shadow-sm px-3 py-2 bg-white ">
                  {' '}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="mb-2 text-xs sm:text-sm font-bold">
                        Options:
                      </p>
                    </div>
                    <div>
                      <FiEdit
                        className="ml-4 cursor-pointer text-sm"
                        onClick={() =>
                          handleEdit(question._id, question?.options, 'options')
                        }
                      />
                    </div>
                  </div>
                  <ul className="p-0 m-0">
                    {question?.options?.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <li className="flex  text-xs sm:text-sm ">
                          {/* <span className="mr-2"> */}
                          {String.fromCharCode(65 + index)}:
                          {/* {option[String.fromCharCode(65 + index)]}  */}
                          <div className="ml-3">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: parse(
                                  option[String.fromCharCode(65 + index)]
                                ).toString(),
                              }}
                            />
                          </div>
                          {/* </span> */}
                        </li>
                        {option[`desc${index + 1}`] ? (
                          <div className="mt-3 w-75">
                            <p>Description {index + 1}</p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: parse(
                                  option[`desc${index + 1}`]
                                ).toString(),
                              }}
                            />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    ))}
                    <div className="py-2 text-xs sm:text-sm flex items-center">
                      <div>
                        <span className="text-red-600">Correct Answer: </span>
                        {question.correctAnswer}
                      </div>

                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question?.correctAnswer,
                              'correctAnswer'
                            )
                          }
                        />
                      </div>
                    </div>
                  </ul>
                </div>
              )}

              {question?.qType === 'Practical' && (
                <>
                  {/* <div className="flex text-sm">
                                        <p className="font-bold">Question level: </p>
                                        <p className="ml-3">{question.level}</p>
                                    </div>
                                    <div className="flex text-sm">
                                        <p className="font-bold">Question Time: </p>
                                        <p className="ml-3">
                                            {question.quesTime}
                                        </p>
                                    </div>
                                    <div className="flex text-sm">
                                        <p className="font-bold">Score</p>
                                        <p className="ml-3">{question.score}</p>
                                    </div> */}
                  <div className="mt-3 text-lg border border-gray-300 shadow-sm px-3 py-2 bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        {' '}
                        <span className="py-3 cursor-pointer font-bold text-sm">
                          Question Title
                        </span>
                      </div>
                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question.questionTitle,
                              'questionTitle'
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{question.questionTitle}</p>
                    </div>
                  </div>

                  <details className="bg-white shadow-sm open:bg-amber-200 duration-300 mt-2">
                    <summary className="bg-inherit px-3 py-3 cursor-pointer font-bold text-sm">
                      Description
                    </summary>

                    <div className="mt-1 border border-gray-300 shadow-sm px-3 py-2 bg-white ">
                      {/* <p className="font-bold text-lg">Description</p> */}
                      <div className="flex justify-end text-lg">
                        <div>
                          <FiEdit
                            className="ml-4 cursor-pointer text-sm"
                            onClick={() =>
                              handleEdit(
                                question._id,
                                question.questionDescription,
                                'questionDescription'
                              )
                            }
                          />
                        </div>
                      </div>
                      <div
                        className="text-sm font"
                        dangerouslySetInnerHTML={{
                          __html: parse(
                            question?.questionDescription
                          ).toString(),
                        }}
                      />
                    </div>
                  </details>

                  <details className="bg-white shadow-sm open:bg-amber-200 duration-300 mt-2">
                    <summary className="bg-inherit px-3 py-3 cursor-pointer font-bold text-sm">
                      Initial Code
                    </summary>

                    <div className="flex justify-between bg-white px-3 py-3 border border-gray-300 text-sm">
                      {/* <div
                        className="text-sm font"
                        dangerouslySetInnerHTML={{
                          __html: question?.initialCode.replace(/\n/g, '<br>'),
                        }}
                      /> */}
                      <SyntaxHighlighter
                        language={question?.languageId?.name?.toLowerCase()}
                        className="border-0"
                      >
                        {question?.initialCode}
                      </SyntaxHighlighter>

                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question.initialCode,
                              'initialCode'
                            )
                          }
                        />
                      </div>
                    </div>
                  </details>

                  <details className="bg-white shadow-sm open:bg-amber-200 duration-300 mt-2">
                    <summary className="bg-inherit px-3 py-3 cursor-pointer font-bold text-sm">
                      Test Case Function
                    </summary>
                    <div className="flex justify-between bg-white px-3 py-3 border border-gray-300 text-sm">
                      {/* <div
                        className="text-sm font"
                        dangerouslySetInnerHTML={{
                          __html: question?.testCaseFunction.replace(
                            /\n/g,
                            '<br>'
                          ),
                        }}
                      /> */}
                      <SyntaxHighlighter
                        language={question?.languageId?.name?.toLowerCase()}
                        className="border-0"
                      >
                        {question?.testCaseFunction}
                      </SyntaxHighlighter>

                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question.testCaseFunction,
                              'testCaseFunction'
                            )
                          }
                        />
                      </div>
                    </div>
                  </details>

                  <details className="bg-white shadow-sm open:bg-amber-200 duration-300 mt-2">
                    <summary className="bg-inherit px-3 py-3 cursor-pointer font-bold text-sm">
                      Optimized Solution
                    </summary>
                    <div className="flex justify-between bg-white px-3 py-3 border border-gray-300 text-sm">
                      {question?.optimizedSolution && (
                        // <div
                        //   className="text-sm font"
                        //   dangerouslySetInnerHTML={{
                        //     __html: question?.optimizedSolution.replace(
                        //       /\n/g,
                        //       '<br>'
                        //     ),
                        //   }}
                        // />
                        <SyntaxHighlighter
                          language={question?.languageId?.name?.toLowerCase()}
                          className="border-0"
                        >
                          {question?.optimizedSolution}
                        </SyntaxHighlighter>
                      )}
                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question.optimizedSolution,
                              'optimizedSolution'
                            )
                          }
                        />
                      </div>
                    </div>
                  </details>

                  <details className="bg-white shadow-sm open:bg-amber-200 duration-300 mt-2">
                    <summary className="bg-inherit px-3 py-3 cursor-pointer font-bold text-sm">
                      Test Cases
                    </summary>
                    <div className="flex justify-between bg-white px-3 py-3 border border-gray-300 text-sm font">
                      <div>
                        {question?.testCases.map((value, index) => {
                          return (
                            <div key={index} className="border-b-2 py-2">
                              <div className="font-semibold mt-2">
                                Input :{' '}
                                <span className="font-normal">
                                  {' '}
                                  {value.input}
                                </span>
                              </div>
                              <div className="font-semibold mt-2">
                                Expected output :{' '}
                                <span className="font-normal">
                                  {' '}
                                  {value.output}
                                </span>
                              </div>
                              <div className="font-semibold mt-2">
                                Weightage :{' '}
                                <span className="font-normal">
                                  {' '}
                                  {`${value.weightage}%`}
                                </span>
                              </div>
                              <div className="font-semibold mt-2">
                                Description :{' '}
                                <span className="font-normal">
                                  {' '}
                                  {value.desc}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <div>
                        <FiEdit
                          className="ml-4 cursor-pointer text-sm"
                          onClick={() =>
                            handleEdit(
                              question._id,
                              question.testCases,
                              'testCases'
                            )
                          }
                        />
                      </div>
                    </div>
                  </details>
                </>
              )}
            </div>
          </div>
        ))
      )}
      {deleteModal}
      {inputModal}
      {showTopBtn && <ScrollToTop />}
    </div>
  )
}

export default QuestionsDetails
