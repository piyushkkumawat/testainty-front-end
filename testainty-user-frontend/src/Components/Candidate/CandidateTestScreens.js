/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { usePageVisibility } from 'react-page-visibility'
import { t } from 'i18next'
import TabChangeWorning from '../Modal/TabChangeWorning.js'
import CodeEditor from '../CodeEditor/CodeEditor.js'
import { submitTest } from '../../Store/testSlice.js'
import { MdOutlineTimer } from 'react-icons/md'
import { parse } from 'node-html-parser'
import Loader from '../Common/Loader.js'
import screenfull from 'screenfull';


const CandidateTestScreens = ({
  toggleFullscreen,
  candidateId,
  testInfoData,
  setTestSubmited,
  setIsFullscreen
}) => {

  const dispatch = useDispatch()
  const isPageVisible = usePageVisibility()
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userResponses, setUserResponses] = useState([])
  const [countDown, setCountDown] = useState(
    parseInt(testInfoData?.assessment_duration) * 60
  )
  const [isLoading, setIsLoading] = useState(false)
  // const [countDown, setCountDown] = useState(parseInt(12) * 60);

  const [tabChangeCount, setTabChangeCount] = useState(0)
  const [showTabChangeWarning, setShowTabChangeWarning] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)
  // const [topPaneHeight, setTopPaneHeight] = useState(window.innerHeight)
  const [submissionTriggered, setSubmissionTriggered] = useState(false);
  // const [minHeight, setMinHeight] = useState()

  // const [curretHeight, setCurrentHeight] = useState(0)

  const [progressWidth, setProgressWidth] = useState(0)
  const testStart = useSelector((state) => state.test.startTest)
// useEffect(()=>{
//   if(screenfull.isFullscreen){
//     console.log(screenfull.isFullscreen,'screenfull.isFullscreen')
//   }else{
//     console.log(screenfull.isFullscreen,'screenfull.false')

//   }
// },[screenfull.isFullscreen])

  // useEffect(() => {
  //   const handleResize = () => {
  //     let newHeight = window.innerHeight
  //     let newMinHeight

  //     if (window.innerHeight > 900) {
  //       newHeight = 750
  //       newMinHeight = 600
  //     } else if (window.innerHeight > 720) {
  //       newHeight = 650
  //       newMinHeight = 500
  //     } else if (window.innerHeight <= 720) {
  //       newMinHeight = 400
  //       newHeight = 500
  //     }

  //     // setTopPaneHeight(newHeight)
  //     // setMinHeight(newMinHeight)
  //   }

  //   window.addEventListener('resize', handleResize)

  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])


  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1
        } else {
          if (!submissionTriggered) {
            setSubmitClicked(true); // Set submitClicked to true when countdown reaches zero
            setSubmissionTriggered(true); // Set submissionTriggered to true to prevent multiple submissions
            setIsLoading(false)
          }else{
            setIsLoading(false)
          }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [submissionTriggered])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setShowTabChangeWarning(true)
        setTabChangeCount((prevCount) => prevCount + 1)
      } else {
        console.log('Tab is visible')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPageVisible])

  //To detect/handle muliple screen
  useEffect(() => {
    const handleBlur = () => {
      setShowTabChangeWarning(true);
      setTabChangeCount((prevCount) => prevCount + 1);
    }
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // useEffect(() => {
  //   if (screenfull.isEnabled) {
  //     screenfull.on('change', () => {
  //       if (!screenfull.isFullscreen) {
  //         setSubmitClicked(true)
  //         setSubmissionTriggered(true);
  //         setIsLoading(false)
  //       }
  //     });
  //   }
  // }, [toggleFullscreen]);
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setSubmitClicked(true);
        setSubmissionTriggered(true);
        setIsLoading(false);
      }
    };
  
    document.addEventListener('fullscreenchange', handleFullscreenChange);
  
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [toggleFullscreen]);

  const minutes = Math.floor(countDown / 60)
  const seconds = countDown % 60
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  const handleNext = () => {
    const updatedResponses = [...userResponses]
    const tempquestions = [...questions]
    const currentQuestionObj = tempquestions[currentQuestion]

    // Check if the user has already responded to the current question
    const existingResponse = updatedResponses.find(
      (response) => response.questionId === currentQuestionObj?._id
    )
    if (!existingResponse) {
      // If no response exists, add a default response with an empty string
      const objectToUpdate = {
        questionId: currentQuestionObj?._id,
        response: '', // Default response when user hasn't selected an option
        code: questions[currentQuestion]?.initialCode
      }

      updatedResponses.push(objectToUpdate)
      setUserResponses(updatedResponses)
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      const equalNumber = 100 / questions?.length
      setProgressWidth((prev) => prev + equalNumber)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      const equalNumber = 100 / questions?.length
      setProgressWidth((prev) => prev - equalNumber)
    }
  }

  useEffect(() => {
    // This useEffect will be triggered when submitClicked changes
    const submited = async () => {
      if (submitClicked) {
        setIsLoading(true)

        let submitResponse = {
          candidateId: candidateId,
          responses: userResponses,
          tabsChange: tabChangeCount,
        }
        // Dispatch submitTest action or any other actions here
        await dispatch(submitTest(submitResponse))
        setIsLoading(false)
        setTestSubmited(true)
        screenfull.exit();
        setIsFullscreen(false);
        // Reset submitClicked after the effect runs
        setSubmitClicked(false)
      }else{
        setIsLoading(false)
        
      }
    }
    submited()
  }, [submitClicked])

  const handleSubmit = async (values) => {
    // setIsLoading(true)
    
    await handleNext()
   
    setSubmitClicked(true)
  }

  const formik = useFormik({
    initialValues: {
      responses: questions,
    },
    onSubmit: handleSubmit,
  })

  const handleAnswerSelect = (optionObject, selectedOption) => {
    const updatedResponses = [...userResponses]
    const tempquestions = [...questions]
    const questionIndex = tempquestions.findIndex(
      (question) => question._id === optionObject._id
    )

    if (questionIndex !== -1) {
      const updatedQuestions = [...questions]
      const questionToUpdate = updatedQuestions[questionIndex]

      questionToUpdate.options.forEach((option) => {
        if (option[selectedOption]) {
          option.checked = true
        } else {
          option.checked = false
        }
      })
      let objectToUpdate = {
        questionId: optionObject._id,
        response: selectedOption,
      }

      const indexToUpdate = updatedResponses.findIndex(
        (obj) => obj.questionId === objectToUpdate.questionId
      )

      if (indexToUpdate !== -1) {
        updatedResponses[indexToUpdate] = objectToUpdate
      } else {
        updatedResponses.push(objectToUpdate)
      }
      setUserResponses(updatedResponses)
      updatedQuestions[questionIndex] = questionToUpdate
      setQuestions(updatedQuestions)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    const updatedResponses = [...userResponses]
    if (testStart && testStart.Questions && testStart.status) {
      const questionsWithCheckedFalse = testStart.Questions.map((question) => {
        let obj = {
          questionId: question?._id,
          response: ''
        }
        updatedResponses.push(obj)
        setUserResponses(updatedResponses)
        if (question?.qType === 'Practical') {
          return {
            ...question,
            options: null, // Set options to null for practical questions
            runCodeResult: null,
          }
        } else {
          return {
            ...question,
            options: question.options
              ? question.options.map((option) => ({
                  ...option,
                  checked: false,
                }))
              : null,
          }
        }
      })

      formik.setFieldValue('responses', questionsWithCheckedFalse)
      setQuestions(questionsWithCheckedFalse)
      setIsLoading(false)
    }
  }, [testStart])

  useEffect(() => {
    if (currentQuestion === 0) {
      setProgressWidth(0)
    }
  }, [progressWidth])

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent default context menu
  };

  const handleCopyPaste = (e) => {
    e.preventDefault();
  }

  if (isLoading) {
    return <Loader />
  }

  // console.log(formik?.values?.responses[currentQuestion]?.questionDescription)

  // document.getElementById('desc')?.innerText.length    {to detect text length}

  // console.log(
  //   'refImg.current',
  //   document.getElementById('desc')?.innerText?.length
  // )

  // console.log(
  //   'length',
  //   formik?.values?.responses[currentQuestion]?.questionDescription?.length
  // )

  // console.log('curretHeight', curretHeight)

  // console.log('topPaneHeight', topPaneHeight) 
  
  return (
    <div onContextMenu={handleContextMenu} onCopy={handleCopyPaste} onPaste={handleCopyPaste} >
      {showTabChangeWarning && (
        <TabChangeWorning
          setShowTabChangeWarning={setShowTabChangeWarning}
          showTabChangeWarning={showTabChangeWarning}
        />
      )}
      <div
        className={`bgc-color  h-screen
          `}
          // ${curretHeight > 100 ? 'h-auto' : 
          // 'h-screen'} 
         
      >
        <div className='h-auto bgc-color'>
          <nav className="w-full shadow-md shadow-black/5 sticky top-0 z-0 bgc-color">
            <div className="flex justify-between items-center px-5 mt-1">
              <div className="flex items-center">
                <div className=" font-semibold font" data-testid="candidateName">
                  {t('Candidate Name')} :{' '}
                  <span className="font-normal"> {testStart?.candidate}</span>
                </div>
                {/* <FaUserCircle className="cursor-pointer ml-2 text-md font-lg text-dark" /> */}
              </div>
             {testStart?.scoreSetting && <div className=" font-semibold font">
                  {t('Question Mark')} :{' '}
                  <span className="font-normal"> {formik.values.responses[currentQuestion]?.score}</span>
                </div>}
              <div className="flex items-center">
                <div>
                  <MdOutlineTimer />
                </div>
                <div className="text-dark ml-2" data-testid='time'>
                  {' '}
                  {t('time')} {formattedMinutes} : {formattedSeconds}
                </div>
              </div>

              {/* <div>
              <button
                type="button"
                disabled={currentQuestion === 0}  
                className="bg-red-500 text-white text-xs px-3 py-1 rounded-md"
              >
                End Test
              </button>
            </div> */}
            </div>
            <div className="px-5">
              <div className="overflow-hidden h-1 mt-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${progressWidth}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
              <p className="text-xs text-center py-1">
                {currentQuestion + 1} / {questions?.length}
              </p>
            </div>
          </nav>
          <div>
            {formik.values.responses[currentQuestion]?.qType === 'Practical' ? (
              <CodeEditor
                handleSubmit={handleSubmit}
                handlePrevious={handlePrevious}
                setQuestions={setQuestions}
                currentQuestion={currentQuestion}
                handleNext={handleNext}
                currentCode={questions[currentQuestion]?.initialCode}
                questions={questions}
                userResponses={userResponses}
                setUserResponses={setUserResponses}
              />
            ) : (
              <>
                <div className="p-5">
                  <div className="shadow-md bg-white rounded p-4">
                    {/* <p className="font-semibold text-lg p-3">
                    Question No. {currentQuestion + 1}.
                  </p>
                  <hr /> */}
                    <p className="font-semibold text-md lg:text-lg xl:text-lg p-3">
                      {currentQuestion + 1}.{' '}
                      {formik.values.responses[currentQuestion]?.questionTitle}
                    </p>
                    {formik?.values?.responses[currentQuestion]
                      ?.questionDescription && (
                      <div className="px-3 border py-2 bg-slate-100">
                        <div
                          id="desc"
                          dangerouslySetInnerHTML={{
                            __html: parse(
                              formik?.values?.responses[currentQuestion]
                                ?.questionDescription
                            ).toString(),
                          }}
                        ></div>
                      </div>
                    )}
                    <form onSubmit={formik.handleSubmit}>
                      <ul className="mt-2 p-0">
                        {formik.values.responses[currentQuestion]?.options?.map(
                          (optionObject, index) => {
                            const key = Object.keys(optionObject)[0]
                            const value = optionObject[key]
                            return (
                              <li
                                key={index}
                                className="mb-2 w-3/4 border-1 rounded"
                              >
                                <div className="flex items-center ps-3 py-3">
                                  <span className="font-semibold mr-5">
                                    {`${String.fromCharCode(65 + index)}`}:
                                  </span>
                                  <input
                                    id={`default-radio-${index}`}
                                    type="radio"
                                    onBlur={formik.handleBlur}
                                    onChange={() =>
                                      handleAnswerSelect(
                                        formik.values.responses[
                                          currentQuestion
                                        ],
                                        key
                                      )
                                    }
                                    checked={optionObject.checked}
                                    value={key}
                                    name="answer"
                                    className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                  />
                                  <label
                                    htmlFor={`default-radio-${index}`}
                                    className="ml-2 text-sm font-medium text-gray-900"
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: parse(value?.toString()),
                                      }}
                                    />
                                  </label>
                                </div>
                              </li>
                            )
                          }
                        )}
                      </ul>
                    </form>
                    <hr />
                    <div className=" flex justify-end ">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="bg-blue-500 text-white text-xs px-3 py-2 rounded-md mr-2"
                      >
                        {t('previous')}
                      </button>
                      {currentQuestion !== questions.length - 1 && (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={currentQuestion === questions.length - 1}
                          className="bg-blue-500 text-white text-xs px-3 py-2 rounded-md mr-2"
                        >
                          {t('next')}
                        </button>
                      )}
                      {currentQuestion === questions.length - 1 && (
                        <button
                          type="submit"
                          onClick={formik.handleSubmit}
                          className="bg-green-500 text-white text-xs px-3 py-2 rounded-md"
                        >
                          {t('submit')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateTestScreens
