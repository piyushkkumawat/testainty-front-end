import { t } from 'i18next';

function AddQuestionCount({ isOpen, setIsOpen, handleAddCount, handleDecreaseCount }) {
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-opacity-75 bg-gray-200">
          <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
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
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">
                  Select Number of Question count
                </h3>
                <button className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2" onClick={handleDecreaseCount}>-</button>

                <input className="w-auto" type='number' readOnly />
                <button className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2"
                  onClick={handleAddCount}>+</button>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default AddQuestionCount;
