import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { addBasicDetails } from '../../Store/createAssesmentSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import { handleNext } from '../../Store/createAssesmentSlice.js';
import { useTranslation } from 'react-i18next';


const BasicDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const selectAssessmentData = (state) => state.createAssessment;
    const selectBasicDetails = (state) => selectAssessmentData(state)?.basicDetails || {};
    const createAssessmentData = useSelector(selectBasicDetails);

    const initialValues = {
        assessmentName: createAssessmentData?.assessmentName || '',
        // assessment_duration: createAssessmentData?.assessment_duration || '',
        desc: createAssessmentData?.desc || '',
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors = {};
                    if (!values.assessmentName) {
                        errors.assessmentName = t('required');
                    }
                    // if (!values.assessment_duration) {
                    //     errors.assessment_duration = t('required');
                    // }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    if (values) {
                        dispatch(addBasicDetails(values))
                        dispatch(handleNext())
                        navigate('/dashboard/selectAssessment')
                    }
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
                    <form onSubmit={handleSubmit} className='text-black w-full px-5 py-4 font'>

                            <div className="mb-4 w-full lg:w-1/2 xl:w-1/2">
                                <label htmlFor="assessmentName" className="block text-xs lg:text-sm xl:text-sm font-medium text-gray-700">
                                    {t('assessmentName')}
                                </label>
                                <input
                                    type="text"
                                    data-testid="assessment-input"
                                    id="assessmentName"
                                    placeholder={t('enterAssName')}
                                    value={values.assessmentName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`mt-1 block w-100 p-2 border h-10 text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm ${errors.assessmentName && touched.assessmentName ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}
                                />
                                {errors.assessmentName && touched.assessmentName && (
                                    <div className="text-red-500 mt-2 text-sm">{errors.assessmentName}</div>
                                )}
                            </div>
                            {/* <div className="mb-4 w-full lg:w-1/2 xl:w-1/2 pl-0 lg:ml-3 xl:ml-3">
                                <label htmlFor="assessment_duration" className="block text-xs lg:text-sm xl:text-sm font-medium text-gray-700">
                                    {t('assDuration')}
                                </label>
                                <input
                                    type="number"
                                    id="assessment_duration"
                                    data-testid="assessment_duration"
                                    placeholder={t("EnterAsseDuration")}
                                    value={values.assessment_duration}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`mt-1 block w-full p-2 border h-10 text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm ${errors.assessment_duration && touched.assessment_duration ? 'border-red-500' : 'border-gray-300'
                                        } rounded-md`}
                                />
                                {errors.assessment_duration && touched.assessment_duration && (
                                    <div className="text-red-500 mt-2 text-sm">{errors.assessment_duration}</div>
                                )}
                            </div> */}
                        {/* </div> */}
                        <div className="w-full">
                            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                {t('description')}
                            </label>
                            <textarea
                                id="desc"
                                data-testid="desc"
                                placeholder={t('enterDec')}
                                value={values.desc}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`mt-1 block w-full p-2 border text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm ${errors.desc && touched.desc ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md`}
                                rows="4"
                            />
                            {errors.desc && touched.desc && (
                                <div className="text-red-500 mt-2 text-sm">{errors.desc}</div>
                            )}
                        </div>

                        <div className="flex justify-end items-center w-100 mt-3">
                            <button
                                data-testid="next-click"
                                type="submit"
                                className={`bg-color text-white font-medium rounded-md px-4 py-1  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'bg-[rgb(0,157,255)] hover:bg-[rgb(88,189,500)]'}`}
                                disabled={isSubmitting}
                            >
                                {t('next')}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default BasicDetails;