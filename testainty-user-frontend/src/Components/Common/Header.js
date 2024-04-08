import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import i18next from 'i18next';
import { images } from '../../Constants/image.constant';
import useOnClickOutside from '../../CustomHooks/index'

const Header = ({scrollToSection }) => {
  const { t } = useTranslation();
  const ref = useRef()

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(screenWidth >= 1024);
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId);
    setIsOpen(false)
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    setIsOpen(screenWidth >= 1024); // Show sidebar by default on larger screens
  }, [screenWidth]);

  // const handleClick = (e) => {
  //   i18next.changeLanguage(e.target.value);
  // };

  const handleSignIn = () => {
    navigate('/login');
  };


  useOnClickOutside(ref, () => setIsOpen(false))




  return (
    <header className={`fixed w-full z-20 start-0 transition-all duration-300 ${isSticky || screenWidth < 768 ? 'bg-white shadow-md' : 'bg-transparent z-20 '}`} ref={ref}>
      <nav className={`max-w-screen-xl mx-auto ${isSticky ? 'mb-2' : 'p-0'}`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto lg:px-3 ">
          <img src={images.LOGO} alt='logo' className='logo-img w-44' />
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button data-testid="signIn" type="button" className={` w-20 ${isSticky ? 'text-white btn-color' : 'text-black bg-white'} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-2 py-2 sm:px-5 md:w-32 rounded-full text-center`} onClick={handleSignIn}>
           { t('signIn')}
            </button>
            <button onClick={toggleMenu} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between ${isOpen ? '' : 'hidden'} ${isSticky ? '' : 'bg-transparent'} w-full md:flex md:w-auto md:order-1" id="navbar-sticky`}>
            <ul className={`flex flex-col md:p-0 mt-0 font-medium rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ${isSticky ? '' : 'sm:bg-transparent'} `}>
              <li>
                <Link className="text-decoration-none block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => handleScrollToSection('home')}> {t('home')}</Link>
              </li>
              <li>
                <Link className="text-decoration-none block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => handleScrollToSection('aboutus')}>{t('aboutUs')}</Link>
              </li>
              <li>
                <Link className="text-decoration-none block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => handleScrollToSection('Services')}>{t('Services')}</Link>
              </li>
              <li>
                <Link className="text-decoration-none block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 " onClick={() => handleScrollToSection('contact')}>{t('contact')}</Link>
              </li>
              {/* <li>
                <Link className="text-decoration-none block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{t('pricing')}</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
