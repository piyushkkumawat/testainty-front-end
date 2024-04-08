/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/aria-role */
import { useState, useEffect, useRef } from 'react'
import { FaUserCircle } from 'react-icons/fa/index.js'
import { RiLogoutCircleRLine } from 'react-icons/ri/index.js'
import { BiUser } from 'react-icons/bi/index.js'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import useOnClickOutside from '../../CustomHooks/index'
import '../../App.css'
import { FaRegUserCircle } from 'react-icons/fa'
import { getNotifications, getProfile } from '../../Store/userSlice'
import { commonService } from '../../Services/common.services'
import { apiConstants } from '../../Constants/api.constant'
import { calculateTimeAgo } from '../../Utils/Index'
import { images } from '../../Constants/image.constant'
import { MdOutlineSyncLock } from "react-icons/md";

const NavBar = () => {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const profileData = useSelector((state) => state.user)
  const [userProfileData, setUserProfileData] = useState(null)
  const [notificationList, setNotificationList] = useState(null)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [unReadCount, setUnReadCount] = useState(0)
  // const [isNoData, setIsNoData] = useState(false)
  const navigate = useNavigate()
  const notificationData = useSelector((state) => state.user)
  const ref = useRef()
  const notificationRef = useRef()
  const dispatch = useDispatch()

  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if (userData && userData.UserId) {
      dispatch(getNotifications({ userId: userData?.UserId }))
      dispatch(getProfile({ userId: userData?.UserId }))
    }
  }, [dispatch, userData?.UserId])

  useEffect(() => {
    if (
      notificationData &&
      notificationData.NotificationList &&
      notificationData?.NotificationList?.status
    ) {
      setNotificationList(notificationData?.NotificationList?.data)
      setUnReadCount(notificationData?.NotificationList?.unread_count)
      // setIsNoData(false)
    }

    if (
      notificationData &&
      notificationData.NotificationList &&
      !notificationData?.NotificationList?.status
    ) {
      // setIsNoData(true)
    }
  }, [notificationData?.NotificationList])

  useEffect(() => {
    if (profileData && profileData.getProfile) {
      setUserProfileData(profileData?.getProfile)
    }
  }, [profileData])

  const handleLogout = () => {
    // debugger
    localStorage.removeItem('userData')
    // navigate('/login')
    window.location.href = '/login'
    setShow(false)
  }

const handleChangePassword = () => {
  navigate('/changePassword')
  setShow(false)

}

  const handleToggle = () => {
    setShow(!show)
  }

  const handleNotificationToggle = async () => {
    setIsNotificationOpen((prevState) => !prevState)
    const obj = { userId: userData?.UserId }
    const response = await commonService.withToken(
      apiConstants.READ_ALL_NOTIFICATION,
      obj
    )
    // setUnReadCount(0)

    if(response.status){
      setUnReadCount(0)
    }
   
  }

  const handleProfile = () => {
    navigate('/dashboard/profile')
    setShow(false)
    // setIsOpen(!isOpen)
  }

  const handleRowClick = (id) => {
    navigate('/allCandidate/candidateDetails/' + id)
    setIsNotificationOpen(false)
  }

  useOnClickOutside(ref, () => setShow(false))

  useOnClickOutside(notificationRef, () => {
    setIsNotificationOpen(false)
  })


  const handleSeeAll = async() => {
    setIsNotificationOpen(false)
      setUnReadCount(0)

  }

  return (
    <nav className="w-full shadow-md shadow-black/5 z-1 bgc-color">
       {/* <nav className="w-full shadow-md shadow-black/5 z-0 bgc-color h-[10%] lg:h-[8vh]"> */}
      <div className="flex justify-end items-center py-3 px-4">
        {/* <div className='mr-4 '>
                    <IoNotificationsCircle className='text-2xl cursor-pointer text-primary' />
                </div> */}
        {/* <button class="inline-block relative mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span>
                </button> */}

        <div className="dropdown " ref={notificationRef}>
          <div
            // role="relative"
            onClick={handleNotificationToggle}
            className='cursor-pointer'
          >
            {unReadCount > 0 && (
              <div className="absolute bottom-auto left-auto right-0 top-0 z-10 -translate-y-1/2 translate-x-1/4 w-5 h-5 rounded-full bg-red-600 text-xs text-center text-light">
                <span className="text-center">{unReadCount}</span>
              </div>
            )}

            <img src={images.NOTIFICATION} className='h-7 w-7' alt='nottification-img' />


            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-700"
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
            {/* <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span> */}
          </div>

          {isNotificationOpen ? (
            <div className="ul">
              <div className="px-3 pt-2 bgc-[rgba(169, 216, 232, 1)] flex justify-start items-center rounded">
                <div className='font-bold text-sm'>{t('notifications')}</div>
               
              </div>
              <hr className='text-white border-3' />
              <ul
                className={`p-0  max-h-52 ${
                  notificationList?.length > 4 ? 'overflow-y-scroll' : ''
                } `}
              >
                {notificationList?.map((value, index) => {
                  return (
                    <li
                      className={`flex justify-between w-[100%] px-3 py-2 cursor-pointer hover:bg-slate-200 ${
                        notificationList?.length === index + 1 ? '' : 'border-b'
                      }`}
                      key={index}
                      onClick={() => handleRowClick(value.receiver_id)}
                    >
                      <div className="flex justify-start items-center">
                        <FaRegUserCircle className="text-xl" />
                        <div className="flex flex-col text-xs ml-3">
                          <span className="font-semibold text-primary">
                            {value?.title}
                          </span>
                          <span>{value?.message?.slice(0, 30) + '...'}</span>
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

                {!notificationList?.length ? (
                  <li className="px-3 py-2 text-sm">{t('noNotification')}</li>
                ) : (
                  <></>
                )}
              </ul>
              <div className="px-3 py-2 shadow-sm flex justify-center items-center rounded border-t-2 ">
                <Link
                  to="/dashboard/notification"
                  className="no-underline text-primary text-sm"
                  onClick={handleSeeAll}
                >
                  {t('seeAll')}
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div ref={ref}>
          <div
            className="cursor-pointer relative"
            onClick={handleToggle}
            data-testid="button-that-shows-items"
          >
            {userProfileData && userProfileData?.profile_picture ? (
              <img
                src={`${userProfileData?.profile_picture}`}
                alt="profile_image"
                data-testid="profile_image"
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full shadow-md btn-color">
                <FaUserCircle className="text-3xl text-white cursor-pointer" />
              </div>
            )}
          </div>

          {show && (
            <div className="bg-white absolute z-50 w-1/7 mt-2 right-7">
              <div
                className="flex justify-start no-underline items-center cursor-pointer border px-3 py-2 hover:bg-[rgb(27,47,71,1)] hover:text-white"
                data-testid="profile"
                onClick={handleProfile}
              >
                <BiUser className="text-sm font-lg hover:text-white" />
                <span className="text-sm px-1 hover:text-white">
                  {t('profile')}
                </span>
              </div>
              <div
                className="flex justify-start items-center no-underline cursor-pointer border w-100 px-3 py-2 hover:bg-[rgb(27,47,71,1)] hover:text-white"
                data-testid="logout"
                onClick={handleChangePassword}
              >
                <MdOutlineSyncLock className="text-sm font-lg hover:text-white" />
                <span className="text-sm px-1 hover:text-white">
                  {t('Change Password')}
                </span>
              </div>
              <div
                className="flex justify-start items-center no-underline cursor-pointer border w-100 px-3 py-2 hover:bg-[rgb(27,47,71,1)] hover:text-white"
                data-testid="logout"
                onClick={handleLogout}
              >
                <RiLogoutCircleRLine className="text-sm font-lg hover:text-white" />
                <span className="text-sm px-1 hover:text-white">
                  {t('logout')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
export default NavBar
