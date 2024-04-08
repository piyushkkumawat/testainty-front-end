import { TfiEmail } from 'react-icons/tfi'
import { images } from '../../Constants/image.constant'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RiLinkedinLine } from 'react-icons/ri'
import { FaXTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'

const Footer = ({ scrollToSection }) => {
  const { t } = useTranslation()
  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId)
  }

  return (
    <footer className="bgg p-0 m-0">
      
      <div className=" px-4 py-12 xs:flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-row flex justify-around ">
        <div className="flex flex-col items-center justify-center xs:w-[100%] sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] px-5">
          <Link to="/">
            <img src={images.FOOTERLOGO} alt="logo" className="w-[250px] min-w-[250px]" />
          </Link>

            <div className="flex justify-center items-center py-2 mr-5">
              <Link to="https://twitter.com/testainty" className="" target="_blank">
                {' '}
                <div className="w-9 h-9 rounded-full shadow text-center flex justify-center items-center media-icon">
                  <FaXTwitter className="" />
                </div>
              </Link>

              <Link to="https://www.linkedin.com/company/testainty" className="ml-3" target="_blank">
                {' '}
                <div className="w-9 h-9 rounded-full shadow text-center flex justify-center items-center media-icon">
                  <RiLinkedinLine className="" />
                </div>
              </Link>

              <Link to="https://www.instagram.com/testainty_24/" className="ml-3" target="_blank">
                {' '}
                <div className="w-9 h-9 rounded-full shadow text-center flex justify-center items-center media-icon">
                  <FaInstagram className="" />
                </div>
              </Link>
            </div>
          </div>
        {/* </div> */}
        <div className="flex justify-between  xs:w-[100%] xs:mt-10 lg:mt-0 md:mt-0 sm:mt-0 xl:mt-0 xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[70%]">

          <div className='w-1/2 flex flex-col justify-start xl:items-center lg:items-center md:items-center sm:items-center xs:items-start'>

            <div className="mb-3 text-sm font-bold text-white uppercase">
              {t('quikLinks')}
            </div>
            <div >
              <div className="mb-3 ">
                <Link
                  className="hover:underline text-sm no-underline text-blue-50 hover:text-blue-500"
                  onClick={() => handleScrollToSection('home')}
                >
                  {t('home')}
                </Link>
              </div>
              <div className="mb-3">
                <Link
                  className="hover:underline text-sm  no-underline text-blue-50 hover:text-blue-500"
                  onClick={() => handleScrollToSection('aboutus')}
                >
                  {t('aboutUs')}
                </Link>
              </div>

              <div className="mb-3">
                <Link
                  className="text-blue-50 hover:text-blue-500 hover:underline  text-sm  no-underline "
                  onClick={() => handleScrollToSection('Services')}
                >
                  {t('Services')}
                </Link>
              </div>
              <div>
                <Link
                  className="hover:underline text-sm no-underline text-blue-50 hover:text-blue-500"
                  onClick={() => handleScrollToSection('contact')}
                >
                  {t('contact')}
                </Link>
              </div>

              {/* <div className="mb-4">
                                    <Link className="hover:underline  no-underline text-white">Pricing</Link>
                                </div> */}
            </div>
          </div>
          <div className='flex flex-col justify-start items-start xl:w-2/5 lg:w-2/5 md:w-2/5 sm:w-2/5 xs:w-1/2'>
            <div className="mb-3 text-sm font-bold text-white uppercase ">
              {t('quickContact')}
            </div>
            <div className="text-white ">
              <Link
                to="mailto:support@testainty.com"
                className="flex items-center  hover:underline text-sm no-underline text-blue-50 hover:text-blue-500"
              >
                <div>
                  <TfiEmail className="mr-2 " />
                </div>
                <div>
                  {t('supportMail')}
                </div>
              </Link>
              {/* <div className='flex items-center mt-2'>
                                   
                                    Shekhar Central, 616, Palasia Square, Manorama Ganj, Indore, Madhya Pradesh 452001
                                </div> */}
            </div>
          </div>
        </div>
      </div>

      <hr className="text-white m-0 p-0" />

      <span className="text-sm text-white font py-1 sm:text-center flex justify-center items-center ">
       {t('bottomLine')}
      </span>

      {/* </div> */}
    </footer>
  )
}

export default Footer
