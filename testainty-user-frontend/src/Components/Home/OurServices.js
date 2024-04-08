/* eslint-disable react/no-unescaped-entities */
import { BiBraille } from 'react-icons/bi'
import { AiFillBank } from 'react-icons/ai'
import { SiTestrail } from 'react-icons/si'
import { GiBackwardTime } from 'react-icons/gi'

const OurServices = () => {
  return (
    
      <div className="w-full md:w-full text-center md:text-left py-5">
        <div className="text-2xl lg:text-5xl xl:text-5xl font-bold ">
          Our <span className="text-color ">Services</span>
        </div>
        <div className="mt-3 px-2 flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="cards transition px-3 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300max-w-full md:max-w-sm  border border-gray-200 rounded-2xl shadow w-full lg:w-1/4 xl:w-1/4 cursor-pointer">
            <div className="flex justify-center py-4">
              <div className="w-20 h-20 rounded-full shadow-lg btn-color flex justify-center items-center card-circle ">
                <AiFillBank className="text-4xl card-icon" />
              </div>
            </div>
            <div className="p-3 flex flex-col justify-center items-center ">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 card-footer-h">
                Ready-Made Question Banks
              </h5>
              <p className="mb-3 font-normal text-gray-700 text-sm font card-footer">
                Streamline your assessments with ready-made question banks,
                covering popular skills at varying difficulty levels. Save time
                and effort by using them directly in your evaluations.
              </p>
            </div>
          </div>

          <div className="cards transition px-3 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300max-w-full md:max-w-sm  border border-gray-200 rounded-2xl shadow w-full lg:w-1/4 xl:w-1/4 cursor-pointer lg:mt-20 xl:mt-20">
            <div className="flex justify-center py-4">
              <div className="w-20 h-20 rounded-full shadow-lg btn-color flex justify-center items-center card-circle  ">
                <SiTestrail className="text-4xl card-icon" />
              </div>
            </div>
            <div className="p-3 flex flex-col justify-center items-center ">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 card-footer-h">
                Tailored Assessments
              </h5>
              <p className=" font-normal text-gray-700  text-sm font card-footer">
                Craft personalized assessments effortlessly by selecting from
                our diverse question banks.
              <br />
               <span> "Your evaluations, your way."</span>
              </p>
   
            </div>
          </div>
          <div className="cards transition px-3 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300max-w-full md:max-w-sm  border border-gray-200 rounded-2xl shadow w-full lg:w-1/4 xl:w-1/4 cursor-pointer ">
            <div className="flex justify-center py-4">
              <div className="w-20 h-20 rounded-full shadow-lg btn-color flex justify-center items-center card-circle ">
                <GiBackwardTime className="text-4xl card-icon" />
              </div>
            </div>
            <div className="p-3 flex flex-col justify-center items-center ">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 card-footer-h font-sans">
                Flexible Duration 
              </h5>
              <p className="mb-3 font-normal text-gray-700 font text-sm card-footer">
                Take full control of your assessments with configurable
                duration. Customize the time frame based on your unique needs
                and requirements.
              </p>
            </div>
          </div>

          <div className="cards transition px-3 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300max-w-full md:max-w-sm  border border-gray-200 rounded-2xl shadow w-full lg:w-1/4 xl:w-1/4 cursor-pointer lg:mt-20 xl:mt-20">
            <div className="flex justify-center py-4">
              <div className="w-20 h-20 rounded-full shadow-lg btn-color flex justify-center items-center card-circle ">
                <BiBraille className="text-4xl card-icon" />
              </div>
            </div>
            <div className="p-3 flex flex-col justify-center items-center ">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 card-footer-h">
                Automated Evaluations
              </h5>
              <p className="mb-3 font-normal text-gray-700 text-sm font card-footer">
                Experience the efficiency of automated evaluation and focus on
                what truly matters – interpreting insights; saving you time and
                ensuring consistent, unbiased results.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default OurServices