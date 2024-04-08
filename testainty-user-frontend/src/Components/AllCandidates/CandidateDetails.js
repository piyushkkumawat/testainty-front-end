import { getCandidateById } from '../../Store/candidateSlice.js'
import {
  Chart as ChartJS,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Loader from '../Common/Loader.js'
import ReactApexChart from 'react-apexcharts'
import { formatedDate } from '../../Utils/Index.js'
/* eslint-disable */
import PdfDocument from './PdfDocument.js'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { FaAngleUp, FaFileDownload } from 'react-icons/fa'
import { candidateTestLogs } from '../../Store/candidateSlice.js'
import { t } from 'i18next'
import debounce from 'lodash.debounce'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import '../../App.css'
import CandidateLogsTab from './CandidateLogsTab.js'
import ScrollToTop from '../ScrollToTop/ScrollToTop.js'
ChartJS.register(
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

const CandidateDetails = () => {
  const candidateData = useSelector((state) => state.candidates)
  // const isLoading = candidateData?.loading;

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1];
  const [candidate, setCandidate] = useState({})
  const [chartData, setChartData] = useState({})
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [percentage, setPercentage] = useState([])
  const [testLogsData, setTestLogsData] = useState([])
  const [showTopBtn, setShowTopBtn] = useState(false)

  

  const totalScore = {
    // series: [78] || [],
    options: {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        zIndex: 0,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: '22px',
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ['Average Results'],
    },
  }

  const handleBackClick = () => {
    if(activeTab === 'allCandidate'){
      navigate('/allCandidate', { state: state })
    }else if(activeTab === 'dashboard'){
      navigate('/dashboard/assessment/' + state?.assessment_id + '/' + state?.assessment_url, {state: {state:state?.state, candidateOffset: state?.candidateOffset }})
    }
  }
  const startDate = formatedDate(candidate?.StartedAt)

  useEffect(() => {
    setIsLoading(true)
    const debouncedGetData = debounce(async () => {
      if (id) {
        await dispatch(getCandidateById({ candidateId: id }))
        await dispatch(candidateTestLogs({ candidateId: id }))
        setIsLoading(false)
      }
    }) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [id])

  useEffect(() => {
    if (
      candidateData &&
      candidateData?.getCandidateById &&
      candidateData?.getCandidateById?.candidatedata &&
      candidateData?.getCandidateById?.testData &&
      candidateData?.candidateTestLogsData &&
      candidateData?.candidateTestLogsData?.data
    ) {
      setCandidate(candidateData?.getCandidateById?.candidatedata)
      setPercentage(candidateData?.getCandidateById?.candidatedata?.Percentage)
      setChartData(candidateData?.getCandidateById?.testData)
      setTestLogsData(candidateData?.candidateTestLogsData?.data)
    }
  }, [
    id,
    candidateData?.getCandidateById,
    candidateData?.candidateTestLogsData,
  ])

  const pdfLink = useMemo(
    () => (
      <PDFDownloadLink
        document={
          <PdfDocument candidateData={candidate} testData={chartData} />
        }
        fileName={`${candidate?.candidateName}.pdf`}
        className="text-white no-underline"
      >
        {({ loading }) =>
          loading ? (
            'Loading document...'
          ) : (
            <div className="mx-0 group flex justify-center sm:px-12">
              <FaFileDownload className="text-2xl text-color cursor-pointer " title={t('downloadPDF')}/>
              {/* <span className="absolute top-40 scale-0 rounded border-1 border-gray-400  p-1 text-xs text-black group-hover:scale-100">
                {t('downloadPDF')}
              </span> */}
            </div>
          )
        }
      </PDFDownloadLink>
    ),
    [candidate, chartData]
  ) // Corrected the dependency array

  // const CandidateTestLogsScreen = useMemo(() => {
  //   return <CandidateTestLogs testLogsData={data}  />
  // }, [testLogsData])

  const options = {
    chart: {
      // height: 180,
      type: 'radialBar',
      zndex: 0,
    },
    plotOptions: {
      radialBar: {
        offsetX: 0,
        offsetY: 0,
        startAngle: 0,
        // endAngle: 270,
        hollow: {
          margin: 5,
          // size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
          },
        },
      },
    },
    colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
    labels: chartData?.labels || [],
    legend: {
      show: true,
      floating: false,
      fontSize: '12px',
      position: 'right',
      offsetX: 0,
      offsetY: 0,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: (seriesName, opts) => {
        return (
          seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + '%'
        )
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  }
  const series = chartData?.data

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY 
      console.log('value', value)
      if (value > 400) {
        console.log('true')
        setShowTopBtn(true)
      } else {
        console.log('false')
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="p_five h-auto bgc-color w-full">
      <div >
          {/* <div className="flex justify-center items-center mb-3 bg-white  shadow-md"> */}
           <div className='bg-white flex justify-center w-14 mb-3 rounded'>
           <MdOutlineKeyboardBackspace
              className="cursor-pointer text-color text-2xl  text-center"
              onClick={handleBackClick}
              title='Back'
            />
           </div>
          {/* </div> */}
        
        <div className="bg-white shadow-md rounded p-3 flex xs:flex-col xs:items-start sm:flex-row justify-between sm:items-center">
          <div>
            <h6 className="text-color">{candidate?.candidateName}</h6>
            <p className="text-xs">{candidate?.candidateEmail}</p>
          </div>
          {candidate && <div className="">{pdfLink}</div>}
        </div>

        <div className="flex flex-col mt-4 font w-100 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 ">
            <div className="bg-white shadow-md rounded p-3 text-xs h-[60%]">
              <div className="grid grid-cols-2">
                <div className="col-span-1 font-semibold">
                  <p>{t('assessmentc')}</p>
                  <p>{t('durationc')}</p>
                  <p>{t('appearedOn')}</p>
                  <p>{t('statusc')}</p>
                </div>
                <div className="col-span-1">
                  <p>{candidate?.AssessmentName}</p>
                  <p>
                    {candidate?.AssessmentDuration} {t('min')}
                  </p>
                  <p>{startDate}</p>
                  <p className="bg-success text-white rounded w-20 text-center">
                    {candidate?.Status}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row xl:flex-row mt-4">
              <div className="bg-white shadow-md rounded text-xs w-full lg:w-1/2 xl:w-1/2">
                <div className="grid grid-cols-1 p-3">
                  <div className="font-semibold">{t('antiCheating')}</div>
                  <div className="font-semibold row mt-3">
                    <div className="col-8">
                      {/* <p>{t('disconnected')}</p>
                          <p>{t('fullScreen')}</p> */}
                      <p>{t('switchedTab')}</p>
                    </div>
                    <div className="col-4">
                      <p>{candidate?.tabsCount || 0}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white lg:ml-2 xl:ml-2 shadow-md rounded w-full lg:w-1/2 xl:w-1/2 xs:mt-3 lg:mt-0 xl:mt-0">
                <p className="text-xs font-semibold p-3">{t('overallScore')}</p>
                <div className="flex justify-center items-center">
                  <ReactApexChart
                    options={totalScore?.options}
                    series={percentage}
                    type="radialBar"
                    className="chart z-10"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] bg-white shadow-md rounded sm:w-[100%] xs:ml-0 md:ml-2 lg:ml-2 xl:ml-2 2xl:ml-2 xs:mt-5 sm:mt-5 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0 md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2">
            <p className="text-xs font-semibold p-3">{t('skillScore')}</p>
            <div className="flex justify-center items-center">
              <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                className="chart z-10"
                style={{ width: '100%', height: '300px' }}
              />
            </div>
          </div>
        </div>
        <CandidateLogsTab data={testLogsData} />
        { showTopBtn && (
          <ScrollToTop />
       )}
      </div>
    </div>
  )
}

export default CandidateDetails
