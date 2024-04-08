/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import SplitPane, { Pane } from 'react-split-pane';
import { t } from 'i18next';
import { parse } from 'node-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { runCode } from '../../Store/assessmentTestSlice';
/* eslint-disable no-debugger */


const CodeEditor = ({handleSubmit, handleNext, currentQuestion, handlePrevious, questions, userResponses, setUserResponses, setQuestions }) => {
  // State for code editor content


  const [code, setCode] = useState(questions[currentQuestion]?.initialCode || '');
  const dispatch = useDispatch()
  const [rightWidth, setRightWidth] = useState(window.innerWidth - 500)
  const topPaneRef = useRef(null);
  const widthRef = useRef(null);
  const [topPaneHeight, setTopPaneHeight] = useState(window.innerHeight);
  const [editorHeight, setEditorHeight] = useState(80)
  const [resultData, setResultData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const runCodeData = useSelector((state) => state.runCode)
  // const isLoading =false;
  const editorRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      let newHeight = window.innerHeight;
      let newMinHeight;

      if (window.innerHeight > 900) {
        newHeight = 750;
        newMinHeight = 600;
        console.log('large screen')
      } else if (window.innerHeight > 720) {
        newHeight = 650;
        newMinHeight = 500;
        console.log('medium screen')
      } else if (window.innerHeight <= 720) {
        console.log('working ', window.innerHeight)
        newMinHeight = 400;
        newHeight = 500;
      }

      setTopPaneHeight(newHeight);
      // setMinHeight(newMinHeight)
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect(() => {
  //   // setIsLoading(true)
  //   debugger 

  //   if (runCodeData && runCodeData.testCodeResult && runCodeData.testCodeResult.status) {
  //     let score = runCodeData.testCodeResult.finalResult.score
  //     const updatedQuestions = [...questions];
  //     const updateQuestionIndex = updatedQuestions.findIndex(obj => obj._id === runCodeData.testCodeResult.finalResult.questionId);
  //     if (updateQuestionIndex !== -1 && questions[currentQuestion]._id === runCodeData.testCodeResult.finalResult.questionId) {
  //       updatedQuestions[updateQuestionIndex].runCodeResult = runCodeData;
  //       setQuestions(updatedQuestions);
  //     }
  //     let updateResponse = [...userResponses];
  //     console.log(runCodeData.testCodeResult.finalResult.questionId,'====')
  //     const indexToUpdate = updateResponse.findIndex(obj => obj.questionId === runCodeData.testCodeResult.finalResult.questionId);
  //     console.log(updateResponse,'updateResponse')

  //     console.log(indexToUpdate,'indexToUpdate')
  //     let objectToUpdate = {
  //       questionId: runCodeData.testCodeResult.finalResult.questionId,
  //       response: score,
  //       code:questions[currentQuestion]?.initialCode,
  //       testcase:runCodeData.testCodeResult.finalResult.testcaseObject
  //     }
  //     if (indexToUpdate > -1) {
  //       updateResponse[indexToUpdate] = objectToUpdate;
  //     } else {
  //       updateResponse.push(objectToUpdate);
  //     }

  //     setUserResponses(updateResponse);
  //     setEditorHeight(60)
  //     setResultData(runCodeData)
  //     // setIsLoading(false)
  //   }
  // }, [runCodeData])
  
  const handleCodeChange = (newCode) => {
    const updatedQuestions = [...questions];
    const indexToUpdate = updatedQuestions.findIndex(obj => obj._id === questions[currentQuestion]._id);
    questions[indexToUpdate].initialCode = newCode
    setQuestions(questions)
    setCode(newCode);
  };

  // Function to run code (placeholder)

  const handlerunCode = async () => {
    setIsLoading(true)
    let obj = {
      languageId: questions[currentQuestion]?.languageId?.languageId,
      code: questions[currentQuestion]?.initialCode,
      questionId: questions[currentQuestion]?._id
    };
  
    try {
      const runCodeData = await dispatch(runCode(obj));
      if (
        runCodeData && runCodeData.payload &&
        runCodeData.payload.finalResult &&
        runCodeData.payload.status
      ) {
    setIsLoading(false)

        let score = runCodeData.payload.finalResult.score;
        const updatedQuestions = [...questions];
        const updateQuestionIndex = updatedQuestions.findIndex(
          (obj) => obj._id === runCodeData.payload.finalResult.questionId
        );
        if (
          updateQuestionIndex !== -1 &&
          questions[currentQuestion]._id ===
            runCodeData.payload.finalResult.questionId
        ) {
          updatedQuestions[updateQuestionIndex].runCodeResult = runCodeData.payload;
          setQuestions(updatedQuestions);
        }
        let updateResponse = [...userResponses];
        const indexToUpdate = updateResponse.findIndex(
          (obj) => obj.questionId === runCodeData.payload.finalResult.questionId
        );
        let objectToUpdate = {
          questionId: runCodeData.payload.finalResult.questionId,
          response: score,
          code: questions[currentQuestion]?.initialCode,
          testcase: runCodeData.payload.finalResult.testcaseObject
        };
        if (indexToUpdate > -1) {
          updateResponse[indexToUpdate] = objectToUpdate;
        } else {
          updateResponse.push(objectToUpdate);
        }
  
        setUserResponses(updateResponse);
        setEditorHeight(60);
        setResultData(runCodeData);
      }
    } catch (error) {
       setIsLoading(false)

      // Handle error here if needed
      console.error('Error while running code:', error);
    }
  };
  
  // Function to prevent copy and paste
  const handleEditorDidMount = (editor, monaco) => {
    editor.onKeyDown((e) => {
      console.log('e.keyCode', e.keyCode)
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 52 || e.keyCode === 33)) {
        e.preventDefault();
      }
    });
  }

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent default context menu
  };

  const handleCopyPaste = (e) => {
    e.preventDefault();
  }
  
  return (

    <div onContextMenu={handleContextMenu} onCopy={handleCopyPaste} onPaste={handleCopyPaste}>
        <SplitPane
          ref={widthRef}
          split="vertical"
          minSize={200}
          maxSize={500}
          defaultSize={500}
          onChange={(size) => setRightWidth(window.innerWidth - size)}
          style={{ zIndex: 0, height: '92vh', top: '68px' }}
        >
          <Pane className='bgc-color h-screen'>
            <div>
              <div className='flex px-2 items-center justify-between pt-2 font-bold '>
                <div className='text-xs  border-gray-700'>
                  <p className='pt-2'> Description</p>
                </div>
                <div className='text-xs '>
                  <select className='w-auto border-b-2 border-gray-400 text-xs text-gray-500  rounded-none overflow-y-scroll  focus:outline-none focus:ring-0 focus:border-gray-200 peer'>
                    <option value={questions[currentQuestion]?.languageId}>{questions[currentQuestion]?.languageId.name}</option>
                  </select>
                </div>
              </div>
              <div className="p-2 border-4 overflow-y-scroll w-full h-[75vh] ">
                <h1 className="text-lg font-bold mb-4" >{currentQuestion + 1}. {' '} { questions[currentQuestion]?.questionTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: parse(questions[currentQuestion]?.questionDescription)?.toString() }} />
              </div>

              <div className=" p-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="bg-blue-500 text-white text-xs px-3 py-2 rounded-md mr-2"
                >
                  {t('previous')}
                </button>
                {currentQuestion !== questions.length - 1 &&
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentQuestion === questions.length - 1}
                    className="bg-blue-500 text-white text-xs px-3 py-2 rounded-md mr-2"
                  >
                    {t('next')}
                  </button>
                }
                {currentQuestion === questions.length - 1 && <button
                  type="submit"
                  className="bg-green-500 text-xs text-white px-3 py-2 rounded-md"
                  onClick={handleSubmit}
                >
                  {t('submit')}
                </button>}
              </div>
            </div>
          </Pane>
          <Pane style={{ width: `${rightWidth}px` }} ref={topPaneRef} >

            <Editor
              ref={editorRef}
              height={`${editorHeight}vh`}
              language={questions[currentQuestion]?.languageId.name.toLowerCase()}
              theme="vs-dark"
              value={questions[currentQuestion]?.initialCode}
              onMount={handleEditorDidMount}
              options={{ readOnly: false, dragAndDrop: false, contextmenu: false }}
              onChange={handleCodeChange}
              onContextMenu={handleContextMenu}
            />

            <div className='bgc-color h-screen'>
             {isLoading? (<div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600 absolute top-48 z-1 flex justify-center items-center" style={{ left: '50%', top: '45%'}} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">loading</span>
              </div>) : (<></>)}
              <div className='p-3 overflow-y-scroll h-[22vh] xl:h-[30vh] 2xl:h-[35vh]'>
                <div className='flex justify-between px-3 border-b-2'>
                  <div>
                    {
                     questions[currentQuestion] && questions[currentQuestion].runCodeResult && questions[currentQuestion].runCodeResult?.finalResult.status.id === 3 ? <p className="text-lg font-semibold text-green-800 font">Accepted</p> : <p className="text-lg font font-semibold text-red-500">{questions[currentQuestion].runCodeResult?.finalResult.status.description}</p>
                    }

                  </div>
                  <div className='mb-2'>
                    <button disabled={isLoading ? true : false} className="text-xs shadow-md bg-green-500 text-white font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded " onClick={handlerunCode}>
                   {isLoading ? 'Loading..' : 'Run Code' }  
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                {
                    (questions[currentQuestion].runCodeResult && questions[currentQuestion].runCodeResult &&
                      questions[currentQuestion].runCodeResult?.finalResult &&
                      questions[currentQuestion].runCodeResult?.finalResult.status.id !== 3) &&
                      <div className="text-red-500 font-thin text-sm font mt-2 ml-4">{questions[currentQuestion].runCodeResult?.finalResult.Error}</div> 
                  }
                {
                  
                  (questions[currentQuestion].runCodeResult && questions[currentQuestion].runCodeResult &&
                    questions[currentQuestion].runCodeResult?.finalResult &&
                    questions[currentQuestion].runCodeResult?.finalResult.status.id === 3 &&
                    questions[currentQuestion].runCodeResult?.finalResult.testcaseObject.map((data, index) => {
                      const testCaseStatus = Object.values(data)[0];
                      const testCaseInput = Object.values(data)[1];
                      return (
                        <details key={index} className={`mb-4 ${testCaseStatus === 'false' ? 'bg-white' : 'bg-white'}`}>
                          <summary className={`px-3 py-3 text-sm ${testCaseStatus === 'false' ? 'text-red-500' : 'text-green-500'} cursor-pointer`}>
                            {testCaseStatus === 'false' ? <span>&#10008;</span> : <span>&#10003;</span>} Test Case {index + 1}
                          </summary>
                          <div className="shadow-sm duration-300 bg-white px-5 py-3 border border-gray-300 text-sm font-light">
                            <p>Input: {testCaseInput}</p>
                          </div>
                        </details>
                      );
                    }))
                }

                </div>
              </div>
            </div>
          </Pane>
        </SplitPane>

    </div>
  );
};

export default CodeEditor;