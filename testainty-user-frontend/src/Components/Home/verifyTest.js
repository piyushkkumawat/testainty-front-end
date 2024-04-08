import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { verifySiteUser } from '../../Store/userSlice';

const VerifyUser = () => {
    const dispatch = useDispatch()
    return (
        <>
            <div className='w-[80%] mb-4'>
                <Formik
                    initialValues={{ code : '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.code) {
                            errors.name = 'required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        dispatch(verifySiteUser(values))
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
                        <form onSubmit={handleSubmit} className='bg-white h-full shadow text-black rounded'>
                            <div className='p-5 lg:flex lg:flex-col lg:justify-center xl:flex xl:flex-col xl:justify-center '>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                       Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        placeholder="Enter verification code"
                                        data-testid="code-input"
                                        value={values.code}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`mt-1 block w-full p-3 border h-11 ${errors.code && touched.code ? 'border-red-500' : 'border-gray-300'
                                            } rounded-md`}
                                    />
                                    {errors.code && touched.code && (
                                        <div className="text-red-500 mt-2 text-sm">{errors.code}</div>
                                    )}
                                </div>
                               
                                <div className='px-0'>
                                    <button
                                        type="submit"
                                        className={`w-full text-white font-medium rounded-md h-11 btn-color ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        disabled={isSubmitting}
                                        data-testid="submit"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Verify'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>

    )
}

export default VerifyUser
