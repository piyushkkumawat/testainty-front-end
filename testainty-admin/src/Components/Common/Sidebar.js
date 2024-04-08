import { useEffect, useState } from 'react'
import { FaHouseUser } from 'react-icons/fa'
// import { RiUserSettingsFill } from 'react-icons/ri';
import { GiBrain } from 'react-icons/gi'
import { BsQuestionOctagon } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GrUserAdmin } from 'react-icons/gr'
import { VscFeedback } from 'react-icons/vsc'
import { BiLogOut } from 'react-icons/bi'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [show, setShow] = useState(false)
  const storedUserData = localStorage.getItem('userData')
  const userData = storedUserData ? JSON.parse(storedUserData) : null

  const activeTab = location.pathname.split('/')[1]

  const handleLogout = () => {
    localStorage.removeItem('userData')
    window.location.href = '/'
    if (screenWidth < 1024) {
      setIsOpen(!isOpen)
    }
  }
  const handleToggle = () => {
    setIsOpen(!isOpen)
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
      setIsOpen(false)
      setShow(true)
    } else {
      setIsOpen(true)
      setShow(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth])

  return (
    <>
      <div
        className={`h-screen  shadow-lg z-10 duration-300 ease-linear bg-white lg:translate-x-0 border-none fixed left-0 top-0 ${
          isOpen ? 'open' : 'w-1/5 overflow-hidden close '
        }`}
      >
        <div className="flex justify-end mr-5 mt-2">
          <RxHamburgerMenu
            className="rounded top-2 text-2xl cursor-pointer text-color hover:shadow"
            data-testid="hamburger"
            onClick={handleToggle}
          />
        </div>
        <div className="font">
          {isOpen ? (
            <>
              <div
                id="sideNav"
                className="lg:block md:w-25 lg:w-64 h-screen rounded-none border-none"
              >
                <div className="flex justify-center">
                  <Link
                    to={
                      userData?.role?.roleType !== 4 ? '/dashboard' : '/skills'
                    }
                  >
                    <img
                      src="https://testainty-images.s3.ap-south-1.amazonaws.com/profilePicture/Main-logo.svg"
                      width="200"
                      alt="logo"
                    />
                  </Link>
                </div>
                <hr />
                <div className=" space-y-3 px-3">
                  {userData?.role?.roleType !== 4 && (
                    <Link
                      onClick={screenWidth < 1024 && handleToggle}
                      to="/dashboard"
                      data-testid="customers"
                      className={`relative px-4 py-2 flex items-center space-x-4 rounded-lg no-underline hover:bg-slate-200  ${
                        activeTab === 'dashboard'
                          ? 'text-white btn-color'
                          : 'text-gray-500 group'
                      }`}
                    >
                      <FaHouseUser
                        className={` ${
                          activeTab === 'dashboard' ? 'text-white' : ''
                        }`}
                      ></FaHouseUser>
                      <span
                        className={`mr-1 font-medium  ${
                          activeTab === 'dashboard' ? 'text-white' : ''
                        }`}
                      >
                        Customers
                      </span>
                    </Link>
                  )}

                  {userData?.role?.roleType !== 4 && (
                    <Link
                      to="/subAdmins"
                      onClick={screenWidth < 1024 && handleToggle}
                      className={`px-4 py-2 flex items-center space-x-4 rounded-md no-underline hover:bg-slate-200 ${
                        activeTab === 'subAdmins'
                          ? 'text-white btn-color '
                          : 'text-gray-500 group'
                      }`}
                    >
                      <GrUserAdmin
                        className={`fas fa-wallet ${
                          activeTab === 'subAdmins' ? 'text-white' : ''
                        }`}
                      ></GrUserAdmin>
                      <span
                        className={`${
                          activeTab === 'subAdmins' ? 'text-white' : ''
                        }`}
                      >
                        Authors
                      </span>
                    </Link>
                  )}

                  {/* {userData?.role?.roleType !== 4 && <Link
                      to="/roles"
                      data-testid="roles"
                      className={`px-4 py-2 flex items-center space-x-4 rounded-md no-underline ${activeTab === '/roles' ? 'text-white btn-color ' : 'text-gray-500 group'}`}
                    >
                      <RiUserSettingsFill className={`fas fa-wallet ${activeTab === '/roles' ? 'text-white' : ''}`}></RiUserSettingsFill>
                      <span className={`${activeTab === '/roles' ? 'text-white' : ''}`}>Roles</span>
                    </Link>} */}

                  <Link
                    to="/skills"
                    data-testid="skills"
                    onClick={screenWidth < 1024 && handleToggle}
                    className={`px-4 py-2 flex items-center space-x-4 rounded-md no-underline hover:bg-slate-200 ${
                      activeTab === 'skills'
                        ? 'text-white btn-color '
                        : 'text-gray-500 group'
                    }`}
                  >
                    <GiBrain
                      className={`fas fa-wallet ${
                        activeTab === 'skills' ? 'text-white' : ''
                      }`}
                    ></GiBrain>
                    <span
                      className={`${
                        activeTab === 'skills' ? 'text-white' : ''
                      }`}
                    >
                      Skills
                    </span>
                  </Link>
                  <Link
                    to="/questionBank"
                    data-testid="questionBank"
                    onClick={screenWidth < 1024 && handleToggle}
                    className={`px-4 py-2 flex items-center space-x-4 rounded-md no-underline hover:bg-slate-200 ${
                      activeTab === 'questionBank'
                        ? 'text-white btn-color '
                        : 'text-gray-500 group'
                    }`}
                  >
                    <BsQuestionOctagon
                      className={`fas fa-wallet ${
                        activeTab === 'questionBank' ? 'text-white' : ''
                      }`}
                    ></BsQuestionOctagon>
                    <span
                      className={`${
                        activeTab === 'questionBank' ? 'text-white' : ''
                      }`}
                    >
                      Question Banks
                    </span>
                  </Link>

                  {userData?.role?.roleType !== 4 && (
                    <Link
                      to="/customerInquiries"
                      onClick={screenWidth < 1024 && handleToggle}
                      className={`px-4 py-2 flex items-center space-x-4 rounded-md no-underline hover:bg-slate-200 ${
                        activeTab === 'customerInquiries'
                          ? 'text-white btn-color '
                          : 'text-gray-500 group'
                      }`}
                    >
                      <VscFeedback
                        className={`fas fa-wallet ${
                          activeTab === 'customerInquiries' ? 'text-white' : ''
                        }`}
                      ></VscFeedback>
                      <span
                        className={`${
                          activeTab === 'customerInquiries' ? 'text-white' : ''
                        }`}
                      >
                        Inquiries
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 p-4 flex justify-center items-center border-t-4 w-64">
                <button
                  className="px-5 bg-[rgb(234,67,67)] text-white py-2 rounded "
                  data-testid="logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="lg:block h-screen py-5 ">
              <div className="flex flex-col justify-center items-center">
                <div className="mt-1">
                  <Link to="/dashboard">
                    <FaHouseUser
                      className={`text-xl ${
                        activeTab === 'dashboard'
                          ? 'menu-text'
                          : 'text-gray-800'
                      }`}
                    ></FaHouseUser>
                  </Link>
                </div>

                <div className='mt-4'>
                {userData?.role?.roleType !== 4 && (
                  <Link to="/subAdmins">
                    <GrUserAdmin
                      className={`fas fa-wallet ${
                        activeTab === 'subAdmins' ? 'menu-text' : 'text-gray-800'
                      }`}
                    ></GrUserAdmin>
                  </Link>
                )}
                </div>

             
                {/* <div className='mt-4'>
                <Link to="/roles"><RiUserSettingsFill className={`text-xl ${activeTab === 'roles' ? 'menu-text' : 'text-gray-800'}`}></RiUserSettingsFill></Link>
              </div> */}
                <div className="mt-4">
                  <Link to="/skills">
                    <GiBrain
                      className={`text-xl ${
                        activeTab === 'skills' ? 'menu-text' : 'text-gray-800'
                      }`}
                    ></GiBrain>
                  </Link>
                </div>
                <div className="mt-4">
                  <Link to="/questionBank">
                    <BsQuestionOctagon
                      className={`fas fa-wallet ${
                        activeTab === 'questionBank'
                          ? 'menu-text'
                          : 'text-gray-800'
                      }`}
                    ></BsQuestionOctagon>
                  </Link>
                </div>

                <div className='mt-4'>
                  {userData?.role?.roleType !== 4 && (
                    <Link to="/customerInquiries">
                      <VscFeedback
                        className={`fas fa-wallet ${
                          activeTab === 'customerInquiries' ? 'menu-text' : 'text-gray-800'
                        }`}
                      ></VscFeedback>
                    </Link>
                  )}
                </div>

                <div className="absolute bottom-0 p-4 flex justify-center cursor-pointer">
                  <BiLogOut className="text-xl" onClick={handleLogout} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
