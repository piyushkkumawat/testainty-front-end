import { Formik, Field, ErrorMessage } from 'formik'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { inviteAdmins } from '../../Store/teamsSlice'
import { t } from 'i18next'

function InviteAdmin({ isOpen, setIsOpen }) {
  const dispatch = useDispatch()
  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      <Modal size="sm" isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{t('inviteAdmin')}</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
            validate={(values) => {
              const errors = {}
              if (!values.firstName) {
                errors.firstName = t('required')
              }
              if (!values.lastName) {
                errors.lastName = t('required')
              }
              if (!values.email) {
                errors.email = t('required')
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = t('invalidEmailAddress')
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false)
              dispatch(inviteAdmins(values))
              toggle()
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {t('fName')}
                  </label>
                  <Field
                    data-testid="enter-fname"
                    type="text"
                    name="firstName"
                    placeholder={t('enterFName')}
                    className={
                      'mt-1 block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
                    }
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 mt-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {t('lName')}
                  </label>
                  <Field
                    data-testid="enter-lname"
                    type="text"
                    name="lastName"
                    placeholder={t('enterLName')}
                    className={
                      'mt-1 block w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5'
                    }
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 mt-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    {t('email')}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    data-testid="enter-email"
                    placeholder={t('enterEmailp')}
                    className={
                      'mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-2 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    {t('submit')}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  )
}

export default InviteAdmin
