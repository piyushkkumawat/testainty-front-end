import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../../Store/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { commonService } from '../../Services/common.services';
import { apiConstants } from '../../Constants/api.constant';


const EditQuestion = () => {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({})
  const { id } = useParams()
  const navigate = useNavigate();

  const [questionType, setQuestionType] = useState('Objective')
   
  useEffect(() => {
    const obj = {
      customerId: id
    }
    const getData = async () => {
      const response = await commonService.withToken(apiConstants.GET_QUESTION_BY_ID, obj)
      if (response.data && response.data.data) {
        const tempobj = {
          customerId: id,
          customerName: response.data.data.customerName || '',
          email: response.data.data.email || '',
          plan: response.data.data.plan || '',
          planStart: response.data.data.planStart || '',
          planEnd: response.data.data.planEnd || ''
        };
        setInitialValues(tempobj);
      }
      return response
    }
    getData()

  }, [id])
    
   
  const handleSelectType = (e) => {
    setQuestionType(e.target.value)
  }

  return (
    Object.keys(initialValues).length && <div className='md:h-screen d-flex justify-content-around align-items-center mt-5'>
      <div className='shadow-lg bg-white p-5 mt-5 d-flex justify-content-around align-items-center max-md:flex-col '>
        <div>
          <Formik
            initialValues={{ questionTitle: '', options: [{ A: '' }, { B: '' }, { C: '' }, { D: '' }], correctAnswer: '', level:''}}
            validate={(values) => {
              const errors = {};
              if (!values.questionTitle) {
                errors.questionTitle = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              values.qBank = id
              values.qType = questionType
              dispatch(addQuestion(values))
              setSubmitting(false);
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
              isSubmitting 
            }) => (
              <form onSubmit={handleSubmit} className='bg-white text-black p-2 w-96 mt-2'>
                <h4 className='owner-logo'>Edit Question</h4>
                <hr className='hr' />
                <div className="mb-4">
                  <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700">
                                        Question Type
                  </label>
                  <select name="correctAnswer" value={values.name} data-testid="qType-input" onChange={handleSelectType} required className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 ">
                    <option name='Objective' value='Objective'>Objective</option>
                    <option name='Coding' value='Coding'>Coding</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="questionTitle" className="block text-sm font-medium text-gray-700">
                                        Question
                  </label>
                  <textarea
                    id="questionTitle"
                    data-testid="questionTitle-input"
                    placeholder="Enter Question"
                    value={values.questionTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full p-3 border ${errors.questionTitle && touched.questionTitle ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                    rows="4"
                  />
                  {errors.questionTitle && touched.questionTitle && (
                    <div className="text-red-500 mt-2 text-sm">{errors.questionTitle}</div>
                  )}
                </div>
                { questionType === 'Objective' && <div className="mb-4">
                  <label htmlFor="options" className="block text-sm font-medium text-gray-700">
                                        Options
                  </label>
                  {values.options.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      id={`option${index + 1}`}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      value={option[index]}
                      onChange={(e) => {
                        const updatedOptions = [...values.options];
                        updatedOptions[index][String.fromCharCode(65 + index)] = e.target.value;
                        handleChange({ target: { name: 'options', value: updatedOptions } });
                      }}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full p-3 border h-11 ${errors.options && touched.options ? 'border-red-500' : 'border-gray-300'
                      } rounded-md`}
                    />
                  ))}
                                 
                </div>}
                { questionType === 'Objective' && <div className="mb-4">
                  <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700">
                                        Currect Answer
                  </label>
                  <select name="correctAnswer" value={values.name} data-testid="answer-input" onChange={handleChange} required className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md">
                    <option value="">Select Currect Answer</option>
                    <option name='A' value='A'>A</option>
                    <option name='B' value='B'>B</option>
                    <option name='C' value='C'>C</option>
                    <option name='D' value='D'>D</option>
                  </select>
                </div>}
                <div className="mb-4">
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                                        Level
                  </label>
                  <select name="level" value={values.name} data-testid="level-input" onChange={handleChange} required className="mt-1 block w-full p-1 border border-gray-300 h-10 rounded-md focus:border-lime-300 focus:outline-lime-300 ">
                    <option value="">Select level of question</option>
                    <option name='Beginner' value='Beginner'>Beginner</option>
                    <option name='Intermediate' value='Intermediate'>Intermediate</option>
                    <option name='Advanced' value='Advanced'>Advanced</option>
                  </select>
                </div>
                             
                <button
                  type="submit"
                  data-testid="submit"
                  className={`w-full bg-color text-white font-medium rounded-md h-11 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
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

    </div>
  );

};

export default EditQuestion;