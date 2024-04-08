import { useEffect, useRef, useState } from 'react'
import { images } from '../../Constants/image.constant'
import Footer from '../Common/Footer'
import OurServices from './OurServices'
import GetInTouch from './GetInTouch'
import { scroller } from 'react-scroll'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import { appConstants } from '../../Constants/app.constant'

const HomePage = () => {
  const [isReadMore, setIsReadMore] = useState(false)
  const [showTopBtn, setShowTopBtn] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    // localStorage.clear('userData')
    // Function to animate the image after the component has mounted

    const animateImage = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = 'translateX(-10px)'
      }
    }

    // Trigger the animation after the component has mounted
    animateImage()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY
      if (value > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    scroller.scrollTo(sectionId, {
      duration: 100,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  return (
    <div className="w-full home ">
      <div
        id="home"
        className="flex flex-col lg:flex-row xl:flex-row overflow-x-hidden xl:h-[75vh] "
      >
        <div className="xs:mt-32 w-full md:w-3/2 lg:w-3/2 xl:w-3/6 flex flex-col justify-center px-5 lg:mt-0 xl:mt-24">
          <div className="text-2xl lg:text-5xl xl:text-5xl text-color font-bold animate-text">
            Elevate <span className="text-black"> Assessment, </span>
          </div>
          <div className="text-2xl lg:text-5xl xl:text-5xl text-color font-bold animate-text">
            Illuminate <span className="text-black"> Potential</span>
          </div>
          <p className=" text-left mt-4 ml-2">
            Dive into the future of evaluation with Testainty, your all-in-one
            platform for transformative assessments. Crafted with precision and
            fueled by innovation, Testainty is more than a tool; it is a
            catalyst for unlocking untapped potential. Seamlessly navigate a
            world of dynamic evaluations, personalized learning paths, and
            actionable insights.
          </p>
       
        </div>
        {/* <div
          className={
            'animate-slide-in'
          }
        > */}
        {/* <img
            src={images.HOME}
            className="hidden xl:block w-2/4 xl:w-3/5 lg:w-3/5 right-36 relative top-0 lg:absolute lg:top-0 xl:absolute xl:top-0 lg:right-full xl:right-full animate-slide-in"
            alt=""
          /> */}
        <div className="flex justify-center items-center  lg:w-full xl:w-[37%] md:px-20 xs:mt-3 md:mt-3 lg:px-10 xs:px-10 py-0 xl:mt-20 ">

          <iframe
            src={`https://www.youtube.com/embed/${appConstants.VIDEO_ID}
            `}
            allow="autoplay; encrypted-media"
            className="w-[100%] h-[35vh] md:h-[60vh] lg:h-[50vh] rounded-lg animate-slide-in z-10 relative right-full xl:right-full xl:h-[66%]"
            allowFullScreen
            title="video"
          />
        </div>
        {/* </div> */}
      </div>

      <div
        id="aboutus"
        className="flex flex-col  lg:flex-row xl:flex-row lg:justify-between xl:justify-between mt-3 bg-slate-100 "
      >
        <div className="w-full lg:w-2/4 xl:w-2/4 flex flex-col px-5 py-5">
          {/* <p className="text-color text-lg lg:text-2xl xl:text-2xl">ABOUT US</p> */}
          <div className="text-color text-2xl lg:text-5xl xl:text-5xl font-bold">
            Who <span className="text-black"> We</span> Are
          </div>
          <p className="text-left mt-3">
            Testainty is not just a platform it is a dynamic ecosystem designed
            to elevate evaluation experiences. With cutting-edge features and
            user-centric design, we empower you to discover true potential.
            Embrace a seamless blend of precision and innovation, and embark on
            a journey of unparalleled growth.
          </p>
          <p className="text-left ">
            As an innovative evaluation platform, Testainty offers a
            comprehensive suite of features that seamlessly blend accuracy.
            Whether you are an educator seeking advanced assessment tools or an
            organization aiming to streamline evaluations, Testainty is your
            partner in excellence.
          </p>
        </div>
        <div className="w-full lg:w-2/4 xl:w-2/4  ">
          <img src={images.ABOUT} className="w-full" alt="" />
        </div>
      </div>

      <div
        id="Services"
        className="bg-white flex flex-col md:flex-row items-center justify-center md:justify-between xl:p-0 md:p-6"
      >
        <OurServices />
      </div>
      {
        <div id="contact">
          <GetInTouch />
        </div>
      }
      <div className="bg-slate-100 m-0 p-0">
        <Footer scrollToSection={scrollToSection} />
      </div>
      {showTopBtn && <ScrollToTop />}
    </div>
  )
}

export default HomePage