/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getAllNotifications } from '../../Store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Common/Loader'
import { FaAngleLeft, FaAngleRight, FaRegUserCircle } from 'react-icons/fa'
import { calculateTimeAgo } from '../../Utils/Index'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { appConstants } from '../../Constants/app.constant'

const Notification = () => {
  const dispatch = useDispatch()
  const notificationData = useSelector((state) => state.user)
  const [notificationList, setNotificationList] = useState(null)
  const [isDataNotFound, setIsDataNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [offset, setOffset] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  // const isLoading = notificationData.loading;
  const navigate = useNavigate()
  const limit = appConstants.LIMIT

  const handleRowClick = (id) => {
    navigate('/allCandidate/candidateDetails/' + id)
  }

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {
    let obj = {
      userId: userData?.UserId,
      offset: offset,
      limit: limit,
    }
    dispatch(getAllNotifications(obj))
  }, [dispatch, limit, offset, pageCount, userData?.UserId])

  useEffect(() => {
    setIsLoading(true)
    if (
      notificationData &&
      notificationData?.allNotifications &&
      notificationData?.allNotifications?.status
    ) {
      setNotificationList(notificationData?.allNotifications?.data)
      setPageCount(notificationData.allNotifications?.pages)
      setIsDataNotFound(false)
      setIsLoading(false)
      setIsDataNotFound(false)
    } else if (
      !notificationData?.allNotifications?.status &&
      notificationData.allNotifications?.message
    ) {
      setIsDataNotFound(true)
      setIsLoading(false)
    }
  }, [notificationData?.allNotifications])


  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className={`p_five bgc-color w-full 
             ${window.screen.height > 900 ? 'h-screen' : notificationList?.length > 9 ? 'h-auto' : 'h-screen'} 
      `}>
        <div>
          <h3 className="text-sm lg:text-xl xl:text-xl font-semibold text-gray-900">
            Notifications
          </h3>
        </div>
        <div className="bg-white rounded shadow-md p-2 mt-3 ">
          {isDataNotFound ? (
            <p className="text-sm">Record not found!</p>
          ) : (
            <>
              <ul className="p-0">
                {notificationList?.map((value, index) => (
                  // <li className={`flex items-center w-[100%] px-2  ${notificationList?.length === index + 1 ? '' : 'border-b-2'}`} key={index}>
                  //     <img src='/assets/images/demo.png' className='rounded-full w-10 h-10 mr-3' alt="profile" />
                  //     <div>{value?.message}</div>
                  // </li>

                  <li
                    key={index}
                    className={`flex justify-between w-[100%] px-3 py-2 cursor-pointer hover:bg-slate-200 border-b ${
                      notificationList?.length === index + 1 ? '' : 'border-b'
                    }`}
                    onClick={() => handleRowClick(value.receiver_id)}
                  >
                    <div className="flex justify-start items-center">
                      <FaRegUserCircle className="text-xl" />
                      <div className="flex flex-col text-xs ml-3">
                        <span className="font-semibold text-primary">
                          {value?.title}
                        </span>
                        <span>{value?.message}</span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold">
                      {calculateTimeAgo(value?.createdAt)}
                    </div>
                  </li>
                ))}
              </ul>
              {pageCount > 1 && (
                <div className="flex items-end justify-end">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={
                      <FaAngleRight className="text-[rgb(0,157,255)]" />
                    }
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={1}
                    pageCount={pageCount}
                    previousLabel={
                      <FaAngleLeft className="text-[rgb(0,157,255)]" />
                    }
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center items-center mt-2"
                    pageClassName="px-3 py-1 text-color"
                    activeClassName="text-light btn-color rounded-lg"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    previousClassName="mr-2 px-3 py-2 text-color"
                    nextClassName="ml-2  px-3 py-2 text-color"
                    breakClassName="mx-2"
                    // forcePage={offset-1}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {/* )} */}
      </div>
    </>
  )
}

export default Notification
