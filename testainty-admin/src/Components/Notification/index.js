/* eslint-disable quotes */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { getAllNotifications } from '../../Store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import DataNotFound from '../404/DataNotFound'
import { calculateTimeAgo } from '../../Utils/index'
import ReactPaginate from 'react-paginate'
import { VscFeedback } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notificationData = useSelector((state) => state.user)
  const [notificationList, setNotificationList] = useState([])
  const [isDataNotFound, setIsDataNotFound] = useState(false)
  const isLoading = notificationData.loading
  const [offset, setOffset] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const limit = 10

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleNotificationClick = (id) => {
    navigate('/customerInquiries/CustomerInquiryDetails/' + id)
  }

  const userData = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {
    const obj = {
      userId: userData.id,
      offset: offset,
      limit: limit,
    }
    dispatch(getAllNotifications(obj))
  }, [dispatch, userData.id])

  useEffect(() => {
    if (notificationData && notificationData.allNotifications && notificationData.allNotifications.status) {
      setNotificationList(notificationData?.allNotifications?.data)
      setPageCount(notificationData?.allNotifications?.pages)
      setIsDataNotFound(false)
    }else if(!notificationData?.allNotifications?.status){
      setIsDataNotFound(true)
    }

    // if (!notificationData?.NotificationList) {
    //   setIsDataNotFound(true)
    // }
  }, [notificationData])

  return (
    <div className={`p_five w-full main-bg   ${window.screen.height > 900 ? 'h-screen' : notificationList?.length > 9 ? 'h-auto' : 'h-screen'} `}>
      <div>
        <h3 className="text-lg lg:text-xl xl:text-xl  font-semibold text-gray-900">
          Notifications
        </h3>
      </div>
      {isLoading ? (
        <div
          className="spinner-border text-primary absolute top-50 z-1"
          style={{ left: '50%' }}
        ></div>
      ) : (
        <></>
      )}
      {isDataNotFound && !isLoading ? (
        <p className='px-3 py-2 text-sm'>Record not found!</p>
      ) : (
        <div className="bg-white rounded shadow-md p-2 mt-3 ">
          <ul className="p-0">
            {notificationList?.map((value, index) => (
              // <li className={`flex items-center w-[100%] px-2  ${notificationList?.length === index + 1 ? '' : 'border-b-2'}`} key={index}>
              //     <img src='/assets/images/demo.png' className='rounded-full w-10 h-10 mr-3' alt="profile" />
              //     <div>{value?.message}</div>
              // </li>

              <li
                key={index}
                className={`flex justify-between w-[100%] px-3 py-2 cursor-pointer hover:bg-slate-200 ${
                  notificationList?.length === index + 1 ? '' : 'border-b'
                }`}
                onClick={() => handleNotificationClick(value?.receiver_id)}
              >
                <div className="flex justify-start items-center">
                  <VscFeedback className="text-xl" />
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
            <div className="flex justify-end w-full">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                marginPagesDisplayed={2}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center items-center mt-4"
                pageClassName="px-3 py-2 text-blue-600"
                activeClassName="btn-color hover:bg-[rgb(144,179,31)] text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                previousClassName="mr-2 border px-3 py-2"
                nextClassName="ml-2 border px-3 py-2"
                breakClassName="mx-2"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Notification
