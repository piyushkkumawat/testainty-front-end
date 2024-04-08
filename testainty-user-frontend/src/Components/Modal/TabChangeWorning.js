import { t } from 'i18next';

const TabChangeWorning = ({ showTabChangeWarning, setShowTabChangeWarning }) => {
  const toggle = () => {setShowTabChangeWarning(!showTabChangeWarning)};

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      {showTabChangeWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-75 bg-gray-200">
          <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/3">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                data-testid="toggle-click"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-200"
                onClick={toggle}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">{t('closeModal')}</span>
              </button>
              <div className="px-6 py-6 lg:px-8 ">
                <h3 className="mb-4 text-5xl font-medium text-red-600 flex items-center justify-center" >
                  {t('Warning!')}
                </h3>
                <div className='flex items-center justify-center'>
                  {t('Tab switching is not allowed during the test')}
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default TabChangeWorning;
