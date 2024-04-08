import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAssessment } from '../../Store/assessmentSlice'
import { handlePrev } from '../../Store/createAssesmentSlice'
import { t } from 'i18next';
const Preview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const createAssessmentState = useSelector((state) => state.createAssessment);
    console.log(createAssessmentState)
    const [data, setData] = useState(null)
    const [totalAssessmentTime, setTotalAssessmentTime] = useState(0)
    const [totalAssessmentScore, setTotalAssessmentScore] = useState(0)

    // const [questionBanksCount, setQuestionBanksCount] = useState(null)

    useEffect(() => {
        if (createAssessmentState?.basicDetails && createAssessmentState?.selectedQBank) {
            const totalQTime = createAssessmentState?.selectedQBank.reduce((total, question) => {
                return total + question.totalQDurationTime;
            }, 0);

            const totalScore = createAssessmentState?.selectedQBank.reduce((total, question) => {
                return total + question.totalScore;
            }, 0);

            setTotalAssessmentScore(totalScore)
            setTotalAssessmentTime(totalQTime);
            const basicDetails = createAssessmentState?.basicDetails;
            const selectedQBank = createAssessmentState?.selectedQBank;
            console.log(createAssessmentState)
            const addSettings = createAssessmentState?.settings;
            const arr = selectedQBank.map((v, i) => (
                v.questionBanksId
            ))
            const outputArray = selectedQBank.map(item => ({
                Id: item.questionBanksId,
                count: item.count
            }));
            let obj = { ...basicDetails };
            obj.questionBanksId = arr
            obj.questionBanksCount = outputArray
            obj.assessment_duration = totalQTime
            obj.totalScore = totalScore
            obj.showScore = addSettings?.showScore
            setData(obj)
        }
    }, [createAssessmentState?.basicDetails, createAssessmentState?.selectedQBank, createAssessmentState?.settings])

    const handleSubmit = async() => {
        if (data) {
            console.log(data);
           await dispatch(createAssessment(data))
            navigate('/dashboard')
        } else {
            console.error('There is Some Error to create assessment !')
        }
    }

    return (

    // <div className='bgc-color h-screen'>
            <div className="mt-5 px-3 lg:mx-5 xl:mx-5 py-2 font bg-white">
            <div className="flex flex-col lg:items-center lg:flex-row xl:justify-between xl:flex-row lg:justify-between xl:items-center ">
                <div className="w-full lg:w-2/4 xl:w-2/4">
                    <div className='flex justify-around items-start ' >
                        <div className='text-xs lg:text-sm xl:text-sm'>
                            <p className='font-semibold font'>{t('namec')} </p>
                            <p className='font-semibold font'>{t('durationc')}</p>
                            <p className='font-semibold font'>{t('totalMarks')}</p>
                            <p className='font-semibold font'>{t('qBank')}</p>

                        </div>
                        <div className='text-xs lg:text-sm xl:text-sm'>
                            <p>{data?.assessmentName}</p>
                            <p>{totalAssessmentTime} {t('min')}</p>
                            <p>{totalAssessmentScore}</p>
                            <ul className='px-0 '>
                                {createAssessmentState?.selectedQBank?.map((value, index) => (
                                    <li className="text-xs lg:text-sm xl:text-sm" key={index} >{value?.qBankName}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className='w-full lg:mr-5 xl:mr-5 lg:w-2/4 xl:w-2/4 flex flex-col lg:justify-end lg:items-end xl:justify-end xl:items-end justify-start items-start px-2'> 
                   <div>
                     <p className='lg:mr-5 xl:mr-16 text-left text-sm lg:text-sm xl:text-sm  font-semibold '>{t('antiCheat')}</p>
                    </div>
                    <ul className="list-disc text-xs lg:text-sm xl:text-sm">
                        <li>{t('disallow')}</li>
                        <li>{t('logTab')}</li>
                        <li>{t('makeFullscreen')}</li>
                    </ul>
                </div>
                {/* <div className="col-8 font">
                    <p>Enable Test URL: <span className="text-sm">Yes</span></p>
                    <p>Test URL Expiry: <span className="text-sm">{data?.assessment_url_duration}</span></p>
                </div> */}
            </div>
            <div className="flex justify-end items-cenetr w-100 mt-2 mb-3 lg:px-5 xl:px-5">
                <button
                    className={'bg-primary text-white font-medium rounded-md mr-3 px-4 py-1 font text-xs lg:text-sm xl:text-sm'}
                    data-testid="previous"
                    onClick={() => {
                        dispatch(handlePrev())
                        navigate('/dashboard/setting')
                    }}
                >
                    {t('previous')}
                </button>
                <button
                    type="submit"
                    data-testid="submit"
                    className={'bg-primary text-white font-medium rounded-md px-4 py-1 font text-xs lg:text-sm xl:text-sm'}
                    onClick={handleSubmit}
                >
                    {t('submit')}
                </button>
            </div>
        </div>
    // </div>
    )
}

export default Preview;