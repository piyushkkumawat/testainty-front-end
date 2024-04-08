/*eslint-disable no-undef*/
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { apiConstants } from '../../Constants/api.constant'
import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch } from 'react-redux'
import {
  getQuestionsByQuestionBankId,
  updateQuestionById,
} from '../../Store/userSlice'
import { object } from 'prop-types'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiAddToQueue } from 'react-icons/bi'

function InputModal({
  isShowEdit,
  setIsShowEdit,
  value,
  setValue,
  questionId,
  filedName,
  id,
  setQuestionData,
}) {
  const dispatch = useDispatch()
  const toggle = () => setIsShowEdit(!isShowEdit)
  const [totalWeight, setTotalWeight] = useState(0)
  const [remainingWeight, setRemainingWeight] = useState(0)
  // const [value, setValue] = useState(data)
  useEffect(() => {
    if (filedName === 'testCases') {
      const tempTotalWeight = value.reduce((acc, curr) => {
        const weight = parseFloat(curr.weightage)
        return isNaN(weight) ? acc : acc + weight
      }, 0)
      setTotalWeight(tempTotalWeight)
      const rem = 100 - tempTotalWeight

      setRemainingWeight(rem)
    }

  }, [filedName, value])

  const handleChange = (e) => {
    let data = e.target.value
    setValue(data)
  }

  const handleChangeEditor = (content) => {
    setValue(content)
  }

  const handleImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData()
    formData.append('file', blobInfo.blob(), blobInfo.filename())
    const api = `${
      process.env.REACT_APP_API_URL + apiConstants.UPLOAD_IMAGE_EDITOR
    }`
    try {
      const response = await fetch(api, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Image upload failed')
      }

      const data = await response.json()
      const awsImageUrl = data.file
      success(awsImageUrl)
    } catch (error) {
      failure('Image upload failed')
    }
  }

  const handleInputChange = (index, event) => {
    const newTestCases = value.map((testCase, i) => {
      if (i === index) {
        return {
          ...testCase,
          [event.target.name]: event.target.value,
        }
      }
      return testCase
    })

    setValue(newTestCases)
  }

  const handleWeightageChange = (index, weightage) => {
    const newTestCases = [...value]
    const updatedTestCase = {
      ...newTestCases[index],
      weightage: weightage.toString(),
    }

    newTestCases[index] = updatedTestCase

    setValue(newTestCases)
  }

  const handleEditorOptionChange = (content, index) => {
    console.log('content', content)
    setValue((prevValue) => {
      return prevValue.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            [String.fromCharCode(65 + index)]: content,
          }
        }
        return option
      })
    })

    console.log('value==', value)
  }

  const handleOptionChange = (index, event) => {
    // const updatedValue = [...value]; // Create a copy of the original state
    // const optionToUpdate = updatedValue[index];
    // const updatedOption = { ...optionToUpdate, [String.fromCharCode(65 + index)]: event.target.value };
    // updatedValue[index] = updatedOption;
    // setValue(updatedValue); // Update the state with the modified value

    setValue((prevValue) => {
      return prevValue.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            [String.fromCharCode(65 + index)]: event.target.value,
          }
        }
        return option
      })
    })
  }


  const handleSubmit = async () => {
    let obj = {
      questionId,
      [filedName]: value,
    }

    dispatch(updateQuestionById(obj))
    const obj2 = {
      questionBankId: id,
    }
    const response = await dispatch(getQuestionsByQuestionBankId(obj2))
    console.log('response', response)
    if (
      response &&
      response.getQuestionsdata &&
      response.getQuestionsdata.status
    ) {
      //  const paredHtml = parse(questions.getQuestionsdata.data)
      //  console.log('paredHtml', paredHtml
      setQuestionData(response?.getQuestionsdata?.data)
    }
    toggle()
  }

  return (
    <Modal size="lg" isOpen={isShowEdit} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div className="flex items-center justify-between">
          <div>Edit</div>
        </div>
      </ModalHeader>
      <ModalBody>
        {filedName === 'questionTitle' && (
          <input
            id="questionTitle"
            data-testid="question-input"
            placeholder="Enter Question"
            value={value}
            onChange={handleChange}
            // onBlur={handleBlur}
            className="mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 border-gray-300 rounded-md"
            rows="4"
          />
        )}
        {filedName === 'questionDescription' && (
          <Editor
            id="file-picker"
            name="questionDecription"
            apiKey={process.env.REACT_APP_TINY_API_KEY}
            value={value}
            init={{
              selector: 'textarea',

              plugins:
                'anchor autolink codesample emoticons image link lists media searchreplace table visualblocks wordcount',

              toolbar:
                'undo redo | bold italic underline | numlist bullist | link image',
              /* enable title field in the Image dialog*/
              image_title: true,
              automatic_uploads: true,
              file_picker_types: 'image',
              file_picker_callback: (cb, value, meta) => {
                // Provide image and alt text for the image dialog
                const input = document.createElement('input')
                input.setAttribute('type', 'file')
                input.setAttribute('accept', 'image/*')

                input.addEventListener('change', (e) => {
                  const file = e.target.files[0]
                  const reader = new FileReader()
                  reader.addEventListener('load', () => {
                    const id = 'blobid' + new Date().getTime()
                    const blobCache =
                      tinymce.activeEditor.editorUpload.blobCache
                    const base64 = reader.result.split(',')[1]
                    const blobInfo = blobCache.create(id, file, base64)
                    blobCache.add(blobInfo)

                    // Upload the image to AWS and replace the base64 with the AWS URL
                    handleImageUpload(
                      blobInfo,
                      (awsImageUrl) => {
                        // Replace the base64 with the AWS URL
                        if (meta.filetype === 'image') {
                          cb(awsImageUrl, { alt: 'My alt text' })
                        }

                        // cb(blobInfo.blobUri(), { title: file.name, source: awsImageUrl });
                      },
                      (errorMessage) => {
                        // Handle failure, you might want to display an error message
                        console.error('Image upload failed:', errorMessage)
                      }
                    )
                  })
                  reader.readAsDataURL(file)
                })

                input.click()
              },
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
            }}
            onEditorChange={(content) => {
              handleChangeEditor(content)
            }}
          />
        )}
        {filedName === 'initialCode' && (
          <textarea
            id="initialCode"
            data-testid="question-input"
            placeholder="Enter Initial Code"
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700  rounded-md"
            rows="4"
          />
        )}

        {filedName === 'testCaseFunction' && (
          <textarea
            id="testCaseFunction"
            data-testid="question-input"
            placeholder="Enter Test Case Function"
            value={value}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700  rounded-md"
            rows="4"
          />
        )}

        {filedName === 'optimizedSolution' && (
          // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
          // <Editor
          //     id="optimizedSolution"
          //     name="optimizedSolution"
          //     apiKey={process.env.REACT_APP_TINY_API_KEY}
          //     value={value}
          //     menubar={false}
          //     init={{
          //       selector: 'textarea',
          //       menu: {},
          //       height: '250px',
          //       plugins: '',
          //       toolbar: 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat',
          //     }}
          //     onEditorChange={(content) => {
          //         handleChangeEditor(content);
          //     }}
          // />
          <textarea
            id="optimizedSolution"
            data-testid="optimizedSolution"
            placeholder="Enter Optimized Solution "
            value={value}
            onChange={handleChange}
            className={`mt-1 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 
                       rounded-md`}
            rows="4"
          />
        )}

        {filedName === 'testCases' && (
          <>
            <div className="flex justify-between mt-2 mb-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                Test Cases
              </label>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700">
                {remainingWeight >= 0
                  ? `Remaining weightage out of 100 is ${remainingWeight}`
                  : ''}
              </label>
            </div>
            {value.map((testCase, index) => (
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
                      handleWeightageChange(index, parseInt(e.target.value))
                    }
                    className="w-full border rounded py-1 px-2"
                  />
                  {remainingWeight < 0 && (
                    <div className="text-red-500 mt-2 text-sm">
                      Total weightage exceeded 100!
                    </div>
                  )}
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
                  {/* <div className="mt-2" onClick={()=>handleDeleteTestCase(index)}>
                                                       <RiDeleteBin6Line className="text-red-600 text-lg cursor-pointer" />
                                                    </div> */}
                  {/* {value.length > 1 && (
                                  <div
                                    className="mt-2"
                                    onClick={() => handleDeleteTestCase(index)}
                                    title={'Add more - Test Case'}
                                  >
                                    <RiDeleteBin6Line className="text-red-600 text-lg cursor-pointer" />
                                  </div>
                                )} */}
                </div>
              </div>
            ))}
            {remainingWeight > 0 && (
              <div className="text-red-500 mt-2 text-sm">
                Total weightage should be 100%
              </div>
            )}
          </>
        )}

        {filedName === 'options' && (
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700">
              Options
            </label>

            {value.map((option, index) => (
              <div key={index}>
                {!option?.status && (
                  <input
                    id={`option${index + 1}`}
                    data-testid="question-input"
                    name={`option${index + 1}`}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    defaultValue={option[String.fromCharCode(65 + index)]}
                    onChange={(e) => handleOptionChange(index, e)}
                    // onBlur={handleBlur}
                    className="mt-4 block w-full p-3 border placeholder:text-xs sm:placeholder:text-sm placeholder-gray-700 border-gray-300 rounded-md"
                    rows="4"
                  />
                )}

                {option?.status && (
                  <div className="mt-4">
                    <Editor
                      id={`option${index + 1}`}
                      name={`option${index + 1}`}
                      apiKey={process.env.REACT_APP_TINY_API_KEY}
                      value={option[String.fromCharCode(65 + index)]}
                      init={{
                        selector: 'textarea',

                        plugins:
                          'anchor autolink codesample emoticons image link lists media searchreplace table visualblocks wordcount',

                        toolbar:
                          'undo redo | bold italic underline | numlist bullist | link image',
                        /* enable title field in the Image dialog*/
                        image_title: true,
                        automatic_uploads: true,
                        file_picker_types: 'image',
                        file_picker_callback: (cb, value, meta) => {
                          // Provide image and alt text for the image dialog
                          const input = document.createElement('input')
                          input.setAttribute('type', 'file')
                          input.setAttribute('accept', 'image/*')

                          input.addEventListener('change', (e) => {
                            const file = e.target.files[0]
                            const reader = new FileReader()
                            reader.addEventListener('load', () => {
                              const id = 'blobid' + new Date().getTime()
                              const blobCache =
                                tinymce.activeEditor.editorUpload.blobCache
                              const base64 = reader.result.split(',')[1]
                              const blobInfo = blobCache.create(
                                id,
                                file,
                                base64
                              )
                              blobCache.add(blobInfo)

                              // Upload the image to AWS and replace the base64 with the AWS URL
                              handleImageUpload(
                                blobInfo,
                                (awsImageUrl) => {
                                  // Replace the base64 with the AWS URL
                                  if (meta.filetype === 'image') {
                                    cb(awsImageUrl, { alt: 'My alt text' })
                                  }

                                  // cb(blobInfo.blobUri(), { title: file.name, source: awsImageUrl });
                                },
                                (errorMessage) => {
                                  // Handle failure, you might want to display an error message
                                  console.error(
                                    'Image upload failed:',
                                    errorMessage
                                  )
                                }
                              )
                            })
                            reader.readAsDataURL(file)
                          })

                          input.click()
                        },
                        tinycomments_mode: 'embedded',
                        tinycomments_author: 'Author name',
                      }}
                      onEditorChange={(content) => {
                        handleEditorOptionChange(content, index)
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {filedName === 'correctAnswer' && (
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
              value={value}
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
          </div>
        )}

        <div className="mt-4 flex item-start justify-end space-x-7 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
          <button
            className="text-black font-medium rounded-md h-10 px-5 max-lg:px-1 border"
            type="button"
            data-testid="submit"
            onClick={toggle}
          >
            Cancel
          </button>
          <button
            disabled={
              (remainingWeight < 0 && filedName === 'testCases') ||
              (filedName === 'testCases' && remainingWeight > 0)
            }
            className="btn-color text-white font-medium rounded-md h-10 px-5 max-lg:px-1"
            type="submit"
            data-testid="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default InputModal
/*eslint-enable no-undef*/
