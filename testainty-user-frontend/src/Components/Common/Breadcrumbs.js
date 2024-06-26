import { Link } from 'react-router-dom'

const Breadcrumbs = ({ items, state }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center pl-0 ">
        {items.map((item, index) => (
          <div key={index}>
            {index < items.length - 1 ? (
              <li className="flex items-center justify-center">
                <Link
                  to={item.url}
                  state={state?.state}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {/* <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg> */}
                  {item.label}
                </Link>
              </li>
            ) : (
              <li>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-2.5 h-2.5 text-gray-400 mx-1 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>

                  <Link
                    to={item.url}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 "
                  >
                    {item.label}
                  </Link>
                </div>
              </li>
            )}
          </div>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
