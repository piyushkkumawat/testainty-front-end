import { useMemo, useState } from 'react'
import CandidateTestLogs from './CandidateTestLogs'

const CandidateLogsTab = ({ data }) => {
  const [tabValue, setTabValue] = useState(Object.keys(data)[0])
  const handleTabClick = (tab) => {
    if (tab) {
      setTabValue(tab)
    }
  }

  const CandidateTestLogsScreen = useMemo(() => {
    return <CandidateTestLogs testLogsData={data} tabValue={tabValue} />
  }, [data, tabValue])

  return (
    <div>
      <div className="p-3 text-sm font-medium bg-white shadow rounded mt-3 text-gray-500 border-b border-gray-200">
        <h6 className=" font-semibold text-gray-900  flex justify-start ">
          Test Overview Report
        </h6>
        <hr />
        <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200'>
          <ul className="flex flex-wrap -mb-px pl-0">
            {Object.keys(data)?.map((tabs, tabIndex) => {
              return (
                <li key={tabIndex}>
                  <button
                    onClick={() => handleTabClick(tabs)}
                    className={`inline-block px-3 py-3 border-b-2 border-transparent rounded-t-lg focus:outline-none hover:text-gray-600 hover:border-gray-200   ${
                      tabValue === tabs
                        ? 'text-blue-600 border-blue-600 shadow-md bg-slate-200'
                        : 'text-black hover:bg-gray-50'
                    } ${tabIndex > 0 ? 'ml-2' : ''}`}
                  >
                    {tabs}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        
        {CandidateTestLogsScreen}
      </div>
    </div>
  )
}

export default CandidateLogsTab
