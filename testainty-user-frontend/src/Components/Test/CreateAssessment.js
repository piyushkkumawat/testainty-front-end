import { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../App.css'
import { useLocation } from 'react-router-dom';

const CreateAssessment = ({ children }) => {
    const value = useSelector((state) => state.createAssessment.value)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [circleSize, setcircleSize] = useState(32)
    const [fontSize, setFontSize] = useState(16)
    const { t } = useTranslation();
    const location = useLocation();
    const activeLocation = location.pathname;

    const steps = [
        { title: 'Basic Details' },
        { title: 'Select Question Bank' },
        { title: 'Setting' },
        { title: 'Preview' },
    ];

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
        if (screenWidth < 500) {
            setcircleSize(20)
            setFontSize(12)
        } else {
            setcircleSize(32)
        }
    
      }, [screenWidth])


    return (
        <div className={`font bgc-color p_five 
        ${window.screen.height > 863 ? 'min-h-screen' : activeLocation === '/dashboard/selectAssessment' ? 'h-auto': 'min-h-screen'}
        `}>
            <div className='border bg-white w-full'>
                <div className='flex items-center w-full px-4'>
                    <h5 className='text-color p-1 mt-3 text-sm lg:text-lg xl:text-lg font'>{t('createAssessment')}</h5>
                </div>
                {value !== 4 && (
                    <Stepper steps={steps} activeStep={value} className="absolute z-0 text-xs" titleFontSize={fontSize} size={circleSize} circleFontSize={fontSize} />
                )}
                {children}
            </div>
        </div>
    )
}
export default CreateAssessment;