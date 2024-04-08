/* eslint-disable jsx-a11y/aria-role */
import { useEffect, useRef, useState } from 'react'
import Sidebar from '../Common/Sidebar'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaRegUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../../Store/userSlice'
import { calculateTimeAgo } from '../../Utils'
import useOnClickOutside from '../../CustomHooks'
import { commonService } from '../../Services/common.services'
import { apiConstants } from '../../Constants/api.constant'
import { VscFeedback } from 'react-icons/vsc'

const AdminDashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [show, setShow] = useState(false)
  const [notificationList, setNotificationList] = useState(null)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notificationData = useSelector((state) => state.user)
  const [unReadCount, setUnReadCount] = useState(0)
  const [isNoData, setIsNoData] = useState(false)

  const notificationRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    dispatch(getNotifications({ userId: userData.id }))
  }, [dispatch, userData.id])

  useEffect(() => {
    if (
      notificationData &&
      notificationData.NotificationList &&
      notificationData?.NotificationList?.status
    ) {
      console.log(
        'notificationData.NotificationList',
        notificationData.NotificationList
      )
      setNotificationList(notificationData?.NotificationList?.data)
      setUnReadCount(notificationData?.NotificationList?.unread_count)
    }

    // if (notificationData && notificationData.NotificationList && !notificationData?.NotificationList?.status) {
    //   setIsNoData(true)
    // }
  }, [notificationData?.NotificationList])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleNotificationToggle = async () => {
    setIsNotificationOpen((prevState) => !prevState)
    const obj = { userId: userData.id }
    const response = await commonService.withToken(
      apiConstants.READ_ALL_NOTIFICATION,
      obj
    )
    if (response.status) {
      setUnReadCount(0)
    }
  }

  const handleNotificationClick = (id) => {
    navigate('/customerInquiries/CustomerInquiryDetails/' + id)
    setIsNotificationOpen(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (screenWidth < 1024) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [screenWidth])

  useOnClickOutside(notificationRef, () => {
    setIsNotificationOpen(false)
  })

  return (
    <div className=" xs:block xl:block lg:block">
      {/* {show?  */}

      {/* // : <></>} */}
      <div className="flex overflow-hidden">
      <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

        <div className="relative z-0 flex flex-1 overflow-y-auto  flex-col overflow-x-hidden">
          <nav className="w-full shadow-md shadow-black/5 z-0 main-bg">
            <div className="w-full flex justify-end items-center p-3">
              {/* <RxHamburgerMenu
                className="rounded top-2 text-2xl cursor-pointer text-color hover:shadow"
                onClick={handleToggle}
              /> */}
              <div className="dropdown" ref={notificationRef}>
                <div
                  className="cursor-pointer"
                  role="relative"
                  onClick={handleNotificationToggle}
                >
                  {unReadCount > 0 && (
                    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 -translate-y-1/2 translate-x-1/4 w-4 h-4 rounded-full bg-red-600 text-xs text-center text-light">
                      <span className="text-center">{unReadCount}</span>
                    </div>
                  )}
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg> */}
                  <img
                    src="/assets/images/notification-icon.png"
                    className="w-7 h-7"
                    alt="notification-icm"
                  />

                  {/* <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span> */}
                </div>

                {isNotificationOpen ? (
                  <div className="ul">
                    <div className="px-3 pt-2 flex justify-start items-center rounded">
                      <div className="font-semibold">Notifications</div>
                    </div>
                    <hr className="border-2 border-[lightsteelblue]" />
                    <ul
                      className={`p-0  max-h-52 ${
                        notificationList?.length > 4 ? 'overflow-y-scroll' : ''
                      } `}
                    >
                      {notificationList?.map((value, index) => {
                        return (
                          <li
                            className={`flex justify-between w-[100%] px-3 py-2 cursor-pointer hover:bg-slate-200 ${
                              notificationList?.length === index + 1
                                ? ''
                                : 'border-b'
                            }`}
                            onClick={() =>
                              handleNotificationClick(value?.receiver_id)
                            }
                            key={index}
                          >
                            <div className="flex justify-start items-center">
                              <VscFeedback className="text-xl" />
                              <div className="flex flex-col text-xs ml-3">
                                <span className="font-semibold text-primary">
                                  {value?.title}
                                </span>
                                <span>
                                  {value?.message?.slice(0, 30) + '...'}
                                </span>
                              </div>
                            </div>
                            <div
                              className="font-semibold"
                              style={{ fontSize: '10px' }}
                            >
                              {' '}
                              {calculateTimeAgo(value?.createdAt)}
                            </div>
                          </li>
                        )
                      })}
                      {!notificationList?.length && (
                        <li className="px-3 py-2">No notification here</li>
                      )}
                    </ul>
                    <div className="px-3 py-2 flex justify-center items-center rounded border-t-2 ">
                      <Link
                        to="/notification"
                        className="no-underline text-primary text-sm"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        See All
                      </Link>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </nav>

          <div className={`main-bg ${isOpen ? 'pl-60' : 'pl-10'}`}>
            <div className="">{children}</div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default AdminDashboardLayout
