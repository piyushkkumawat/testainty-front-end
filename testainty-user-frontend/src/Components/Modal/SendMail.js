import { useState } from 'react'
import { Formik } from 'formik'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { inviteCandidates } from '../../Store/assessmentSlice'
import { t } from 'i18next'
import { BsWhatsapp } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { MdOutlineEmail } from 'react-icons/md'
import { formatedDate } from '../../Utils/Index'
import { LiaMailBulkSolid } from 'react-icons/lia'

function SendMail({ isOpen, setIsOpen, data }) {
  const dispatch = useDispatch()
  const toggle = () => setIsOpen(!isOpen)
  const [isShareviaMail, setIsShareViaMail] = useState(false)
  const userData = JSON.parse(localStorage.getItem('userData'))

  // const expirationTime = 12 // in hours
  // const expirationMessage = `Please note that the assessment link will expire in ${expirationTime} hours.`
  let msg = `Hi,

We hope this message finds you well. You have been invited to take the assessment! 🚀
  
**Assessment Details:**
  📝 Assessment Name: ${data?.assessmentName} 
  📅 Date: ${formatedDate(new Date())}
  🕒 Time: ${data?.assessment_duration} min
  🔗 Assessment Link: ${data?.assessment_invite_url}
  
**Instructions:**
  1. Click on the provided link to access the assessment.
  2. Ensure a stable internet connection.
  3. Complete the assessment within the specified time.
  
We appreciate your time and effort in taking this assessment. Good luck! 🌟`

  return (
    <Modal size="md" isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{t('inviteCandidates')}</ModalHeader>
      <ModalHeader
        className="text-center cursor-pointer hover:bg-slate-200"
        onClick={() => setIsShareViaMail(!isShareviaMail)}
      >
        <div className="flex justify-start items-center text-center w-full ">
          <div className="rounded-full bg-primary p-2">
            <MdOutlineEmail className="text-xl text-light" />
          </div>
          <div className="text-center ml-4 text-sm">Share via Email</div>
        </div>
      </ModalHeader>
      {isShareviaMail && (
        <ModalBody>
          <Formik
            initialValues={{ candidateName: '', candidateEmail: '' }}
            validate={(values) => {
              const errors = {}
              if (!values.candidateName) {
                errors.candidateName = t('required')
              }
              if (!values.candidateEmail) {
                errors.candidateEmail = t('required')
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.candidateEmail
                )
              ) {
                errors.candidateEmail = t('invalidEmailAddress')
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false)
              let obj = {
                candidateName: values.candidateName,
                candidateEmail: values.candidateEmail,
                assessment_url: data.assessment_url,
                assessment_id: data._id,
              }
              dispatch(inviteCandidates(obj))
              toggle()
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
              <>
                <form onSubmit={handleSubmit} className="bg-white text-black">
                  <div className="flex justify-between">
                    <div className="">
                      <label
                        htmlFor="candidateName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t('candidateName')}
                      </label>
                      <input
                        type="text"
                        data-testid="name-input"
                        id="candidateName"
                        placeholder={t('enterName')}
                        value={values.candidateName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 block w-full p-3 border h-11 ${
                          errors.candidateName && touched.candidateName
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md`}
                      />
                      {errors.candidateName && touched.candidateName && (
                        <div className="text-red-500 mt-2 text-sm">
                          {errors.candidateName}
                        </div>
                      )}
                    </div>
                    <div className="">
                      <label
                        htmlFor="candidateEmail"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {t('candidateEmail')}
                      </label>
                      <input
                        type="email"
                        id="candidateEmail"
                        placeholder={t('enterEmailp')}
                        value={values.candidateEmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 block w-full p-3 border h-11 ${
                          errors.candidateEmail && touched.candidateEmail
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md`}
                      />
                      {errors.candidateEmail && touched.candidateEmail && (
                        <div className=" text-red-500 mt-2 text-sm">
                          {errors.candidateEmail}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end w-100 mt-4">
                    <button
                      className="bg-primary rounded px-3 py-2 text-white text-sm"
                      type="submit"
                    >
                      {t('submit')}
                    </button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </ModalBody>
      )}

      <Link
        className="no-underline text-dark hover:bg-slate-200"
        target="_blank"
        to={`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`}
      >
        <ModalHeader>
          <div className="flex justify-start items-center text-center w-full">
            <div className="rounded-full bg-success p-2">
              <BsWhatsapp className="text-xl text-light" />
            </div>
            <div className="text-center ml-4 text-sm">Share via whatsapp</div>
          </div>
        </ModalHeader>
      </Link>

      {/* <ModalHeader className="text-center cursor-pointer hover:bg-slate-200">
        <div className="flex justify-start items-center text-center w-full ">
          <div className="rounded-full bg-teal-400 p-2">
            <LiaMailBulkSolid className="text-xl text-light" />
          </div>
          <div className="text-center ml-4 text-sm">Bulk Invite</div>
        </div>
      </ModalHeader> */}
    </Modal>
  )
}

export default SendMail
