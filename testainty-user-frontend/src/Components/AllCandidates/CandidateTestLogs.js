import { parse } from 'node-html-parser'
import { useState } from 'react'

import CodeSnippet from '../../CodeSnippet'
const CandidateTestLogs = ({ testLogsData, tabValue }) => {
  // testLogsData[0][tabValue].map((v, i) => console.log(v))

  console.log('tabValue', tabValue)
  console.log('testLogsData', testLogsData)
  const [isOpen, setIsOpen] = useState(false)
  const [indexed, setIndexed] = useState(null)
  const toggle = (index) => {
    setIsOpen(!isOpen)
    setIndexed(index)
  }

  // selectedQBank.find(selected => selected.questionBanksId === value._id)

  return (
    <>
      {/* <h6 className="mb-4 font-semibold text-gray-900 dark:text-white ">
        Test Overview Report
      </h6> */}
      {testLogsData[tabValue]?.map((value, index) => {
        return value.qType === 'Practical' ? (
          <details className="w-full border-b-2 mt-3 font" key={index}>
            <summary className="bg-inherit text-black py-3 cursor-pointer font-bold">
              {index + 1}. {value?.questionTitle}{' '}
              {!value?.testcases ? (
                <span className="text-red-500"> ( Not Attempted )</span>
              ) : (
                ''
              )}
            </summary>

          

            {value?.questiondesc && (
              <div className="mt-2 border-2 rounded border-gray-300 shadow-sm px-3 py-2 bg-white ">
                <p className="font-bold text-sm">Description</p>
                <div
                  className="text-sm font"
                  dangerouslySetInnerHTML={{
                    __html: value?.questiondesc.replace(/\n/g, '<br>'),
                  }}
                />
              </div>
            )}

            {value?.testcases && (
              <div className="mt-3 border-2 rounded border-gray-300 shadow-sm px-3 py-2 bg-white">
                <p className="font-bold text-sm ">Test casses</p>
                <ul
                  className="w-full  text-sm font-medium text-gray-900 flex flex-col p-0 sm:flex-col md:flex-row lg:flex-row xl:flex-row"
                  key={index}
                >
                  {value?.testcases?.map((data, index) => {
                    const testCaseStatus = Object.values(data)[0]
                    const testCaseInput = Object.values(data)[1]
                    const testCaseOutput = Object.values(data)[2]

                    return (
                      <details
                        key={index}
                        className={` w-full mt-2 sm:px-0
                    ${index > 0 ? 'xl:ml-3 lg:ml-0' : 'ml-0'}
                    
                    `}
                      >
                        <summary
                          className={`px-3 py-3 text-sm border ${
                            testCaseStatus === 'false'
                              ? 'text-red-500'
                              : 'text-green-500'
                          } cursor-pointer`}
                          onClick={() => toggle(index)}
                        >
                          {testCaseStatus === 'false' ? (
                            <span>&#10008;</span>
                          ) : (
                            <span>&#10003;</span>
                          )}{' '}
                          Test Case {index + 1}
                        </summary>
                        {index === indexed && (
                          <div className="shadow-sm duration-300 bg-gray-100 px-3 py-3 border border-gray-300 text-sm font-light">
                            <p className="font-semibold">
                              Input :{' '}
                              <span className="font-normal">
                                {testCaseInput}
                              </span>
                            </p>
                            <p className="font-semibold">
                              Output :{' '}
                              <span className="font-normal">
                                {testCaseOutput}
                              </span>
                            </p>
                          </div>
                        )}
                      </details>

                      // <li
                      //   className={`w-full border-1 rounded mr-2 xs:mt-2 lg:mt-0 xl:mt-0 border-gray-200  dark:border-gray-600 ${
                      //     testCaseStatus === 'true'
                      //       ? 'border-green-600  dark:border-green-600'
                      //       : 'border-red-600  dark:border-red-600'
                      //   } `}
                      //   key={index}
                      // >
                      //   <div className="flex ps-3 py-3">
                      //     <input
                      //       id={`vue-checkbox-list-${index}`}
                      //       type="checkbox"
                      //       value=""
                      //       onChange={() => {}}
                      //       className={`w-4 h-4 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:border-transparent dark:border-transparent  ${
                      //         testCaseStatus === 'true'
                      //           ? 'accent-green-500 text-white'
                      //           : 'accent-red-500 text-white'
                      //       }`}
                      //       checked={`${
                      //         testCaseStatus === 'true' ? 'checked' : ''
                      //       }`}
                      //     />
                      //     <label
                      //       htmlFor={`vue-checkbox-list-${index}`}
                      //       className="w-full  ms-2 text-xs font-medium text-gray-900 dark:text-gray-300"
                      //     >
                      //       <div
                      //         dangerouslySetInnerHTML={{
                      //           __html: parse(testCaseInput),
                      //         }}
                      //       />
                      //     </label>
                      //   </div>
                      // </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {value?.submittedcode && (
              <div className="mt-3 border-2 rounded border-gray-300 shadow-sm px-3 py-2 bg-white ">
                <p className="font-bold text-sm">
                  Submitted Code{' '}
                  {!value?.testcases ? (
                    <span className="text-red-500"> ( Not Attempted )</span>
                  ) : (
                    ''
                  )}
                </p>

                <CodeSnippet language={value?.language?.name.toLowerCase()} code={value?.submittedcode} />
                {/* <div
                  className="text-sm font"
                  dangerouslySetInnerHTML={{
                    __html: value?.submittedcode.replace(/\n/g, '<br>'),
                  }}
                /> */}
              </div>
            )}

            {value?.optimizedSolution && (
              <div className="mt-3 border-2 rounded border-gray-300 shadow-sm px-3 py-2 bg-white ">
                <p className="font-bold text-sm">Expected Code</p>
                {/* <div
                  className="text-sm font"
                  dangerouslySetInnerHTML={{
                    __html: value?.optimizedSolution.replace(/\n/g, '<br>'),
                  }}
                /> */}
                <CodeSnippet language={value?.language?.name.toLowerCase()} code={value?.optimizedSolution} />

                 {/* <CodeSnipet code={value?.optimizedSolution} /> */}
              </div>
            )}
          </details>
        ) : (
          <div className="w-full border-b-2 mt-3 font " key={index}>
            <p className="bg-inherit text-black py-3 cursor-pointer font-bold">
              {index + 1}. {value?.questionTitle}{' '}
              {!value?.candidateAnswer ? (
                <span className="text-red-500"> ( Not Attempted )</span>
              ) : (
                ''
              )}
            </p>

            {value?.questiondesc && (
              <div className="mt-2 border rou border-gray-300 shadow-sm px-3 py-2 bg-white ">
                <p className="font-bold text-sm">Description</p>
                <div
                  className="text-sm font"
                  dangerouslySetInnerHTML={{
                    __html: value?.questiondesc.replace(/\n/g, '<br>'),
                  }}
                />
              </div>
            )}

            {value?.options && (
              <ul
                className={`w-full text-sm font-medium text-gray-900 flex flex-col p-0 sm:flex-col md:flex-row lg:flex-row xl:flex-row ${
                  value?.questiondesc ? 'mt-3' : 'mt-0'
                }`}
                key={index}
              >
                {value?.options?.map((option, optionIndex) => {
                  return (
                    <li
                      className={`w-full border-1 rounded mr-2 xs:mt-2 lg:mt-0 xl:mt-0 ${
                        value?.correctAnswer === Object.keys(option).join('')[0]
                          ? 'border-green-600  dark:border-green-600'
                          : value?.candidateAnswer ===
                            Object.keys(option).join('')[0]
                          ? 'border-red-600'
                          : 'border-gray-200'
                      }  ${
                        option?.status
                          ? 'overflow-y-scroll h-16'
                          : 'overflow-y-hidden'
                      }`}
                      key={optionIndex}
                    >
                      <div className="flex ps-3 py-3">
                        <input
                          id={`vue-checkbox-list-${index}-${optionIndex}`}
                          type="checkbox"
                          value=""
                          onChange={() => {}}
                          className={`w-4 h-4 bg-gray-100 border-gray-300 rounded focus:border-transparent ${
                            value?.correctAnswer === value?.candidateAnswer &&
                            value?.candidateAnswer ===
                              Object.keys(option).join('')[0]
                              ? 'accent-green-500 text-white'
                              : 'accent-red-500 text-white'
                          }`}
                          checked={`${
                            value?.candidateAnswer ===
                            Object.keys(option).join('')[0]
                              ? 'checked'
                              : ''
                          }`}
                        />
                        <label
                          htmlFor={`vue-checkbox-list-${index}-${optionIndex}`}
                          className="w-full  ms-2 text-xs font-medium text-gray-900 "
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: parse(
                                option[String.fromCharCode(65 + optionIndex)]
                                  .length > 25
                                  ? option[
                                      String.fromCharCode(65 + optionIndex)
                                    ]
                                      .toString()
                                      .slice(0, 24) + '...'
                                  : option[
                                      String.fromCharCode(65 + optionIndex)
                                    ]
                              ),
                            }}
                          />
                        </label>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </>
  )
}

export default CandidateTestLogs
