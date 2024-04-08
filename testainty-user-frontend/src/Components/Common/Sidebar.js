import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LuNewspaper } from 'react-icons/lu/index.js';
import { GiHamburgerMenu } from 'react-icons/gi/index.js';
import '../../App.css';
import { AiOutlineTeam } from 'react-icons/ai/index.js';
import { useLocation } from 'react-router-dom'
import { FaUserGraduate } from 'react-icons/fa/index.js';
import UploadLogo from '../Modal/UploadLogo.js';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { images } from '../../Constants/image.constant.js';

const Sidebar = ({isOpen, setIsOpen}) => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1];
  // const [isOpen, setIsOpen] = useState(true);

  const [companyData, setCompanyData] = useState(null)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [isShow, setIsShow] = useState(false);
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(localStorage.getItem('userData')) : null
  // const fullName = userData.firstName + ' ' + userData.lastName

  const profileData = useSelector((state) => state.user)
  const { t } = useTranslation();

  useEffect(() => {
    if (profileData && profileData?.getProfile && profileData?.getProfile?.customerId) {
      setCompanyData(profileData?.getProfile?.customerId)
    }
  }, [profileData])

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 1024) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }

  }, [screenWidth])

  return (
    <>
      <div className={` left-0 top-0 z-10 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white shadow-lg duration-300 ease-linear fixed lg:translate-x-0 ${isOpen ? 'open' : ' w-1/5 overflow-x-hidden close'}  `} >
        <div className='flex justify-end mr-5 mt-2 mb-2'>
          <GiHamburgerMenu className='rounded left-4 top-2 text-4xl cursor-pointer text-primary hover:shadow py-2' data-testid="hamburger" onClick={handleToggleSidebar} />
        </div>

        {isOpen ?
          <div>
            <div id="sideNav" className="lg:block w-64 h-screen rounded-none border-none">
              <div className='flex justify-center'>
                <Link to="/dashboard"><img src={images.LOGO} alt='logo' className='logo-img' /></Link>
              </div>
              <hr />
              <div className="px-3 mt-3 w-[100%]">
                <Link
                  to="/dashboard"
                  data-testid="assessment"
                  onClick={(screenWidth < 1024) && handleToggleSidebar}
                  className={`relative px-4 py-2 flex items-center space-x-2 rounded-lg no-underline text-sm ${activeTab === 'dashboard' ? 'active hover:bg-[rgb(30,66,159)]' : ''
                    }`}
                >
                  <LuNewspaper className={` ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-800'}`}></LuNewspaper>
                  <span className={`mr-1 font-medium font  ${activeTab === 'dashboard' ? 'text-white' : 'text-gray-800'}`}>{t('assessments')}</span>
                </Link>
                {userData?.role?.roleType !== 5 &&
                  <Link
                    to="/teams"
                    data-testid="teams"
                    onClick={(screenWidth < 1024) && handleToggleSidebar}
                    className={`mt-2 px-4 py-2 flex items-center space-x-4 rounded-md no-underline text-sm ${activeTab === 'teams' ? 'active hover:bg-[rgb(30,66,159)]' : ''
                      }`}
                  >
                    <AiOutlineTeam className={`fas fa-wallet ${activeTab === 'teams' ? 'text-white' : 'text-gray-800'}`}></AiOutlineTeam>
                    <span className={`${activeTab === 'teams' ? 'text-white' : 'text-gray-800'}`}>{t('team')}</span>
                  </Link>}
                <Link
                  to="/allCandidate"
                  data-testid="candidate"
                  onClick={(screenWidth < 1024) && handleToggleSidebar}
                  className={`mt-2 px-4 py-2 flex items-center space-x-4 rounded-md no-underline text-sm ${activeTab === 'allCandidate' ? 'active hover:bg-[rgb(30,66,159)]' : 'text-gray-500 group'
                    }`}>
                  <FaUserGraduate className={`fas fa-wallet ${activeTab === 'allCandidate' ? 'text-white' : 'text-gray-800'}`}></FaUserGraduate>
                  <span className={`${activeTab === 'allCandidate' ? 'text-white' : 'text-gray-800'}`}>{t('candidate')}</span>
                </Link>

              </div>
            </div>
            <div className={`absolute bottom-2 p-3 w-[100%]  ${isOpen ? 'block' : 'hidden'} `}>
              <div className="w-7/12 sm:w-1/3 md:w-1/4 lg:w-full bg-[rgb(0,157,255)]  py-1 rounded-xl  px-2 flex items-center" onClick={() => setIsShow(true)}>
                <div>
                  <img src={`${companyData?.customer_logo ? `${companyData?.customer_logo}` : '/assets/images/profile-logo.png'}`} alt='logo' className='img-round bg-white shadow-lg' />
                </div>
                <div className='mt-3 ml-3'>
                  <p className='text-xs text-center text-white font-semibold font flex  justify-center items-center text-transform: capitalize'>{companyData?.customerName}</p>
                </div>
              </div>
            </div>
          </div>
          : (
            <div className='lg:block flex flex-col h-screen py-5 px-3' >
              <div className='mt-1'>
                <Link to="/dashboard"><LuNewspaper className={`text-xl ${activeTab === 'dashboard' ? 'text-[rgb(0,157,255)]' : 'text-gray-800'}`} title={t('assessments')}></LuNewspaper></Link>
              </div>
              {userData?.role?.roleName === 'SuperAdmin' && (<div className='mt-4'>
                <Link to="/teams"><AiOutlineTeam className={`text-xl ${activeTab === 'teams' ? 'text-[rgb(0,157,255)]' : 'text-gray-800'}`} title={t('team')}></AiOutlineTeam></Link>
              </div>)}
              <div className='mt-4'>
                <Link to="/allCandidate"><FaUserGraduate className={`text-xl ${activeTab === 'allCandidate' ? 'text-[rgb(0,157,255)]' : 'text-gray-800'}`} title={t('candidate')}></FaUserGraduate></Link>
              </div>
            </div>
          )}
      </div>
      <UploadLogo isOpen={isShow} setIsOpen={setIsShow} />

    </>
  );
};

export default Sidebar;
