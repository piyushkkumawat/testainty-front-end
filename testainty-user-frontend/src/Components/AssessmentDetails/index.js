/* eslint-disable no-debugger */
/* eslint-disable no-useless-computed-key */
/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useMemo } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiConstants } from '../../Constants/api.constant.js'
import { commonService } from '../../Services/common.services.js'
import { RiDeleteBin3Fill } from 'react-icons/ri/index.js'
import { AiFillCheckCircle } from 'react-icons/ai/index.js'
import DataTable from '../Layouts/DataTable.js'
import {
  getCandidate,
  updateAssessmentById,
} from '../../Store/assessmentSlice.js'
import debounce from 'lodash.debounce'
import { BiSearch } from 'react-icons/bi/index.js'
import DeleteAssessment from '../Modal/DeleteAssessment.js'
import Breadcrumbs from '../Common/Breadcrumbs.js'
import { TbProgressCheck } from 'react-icons/tb'
import { MdOutlinePending } from 'react-icons/md'
import { t } from 'i18next'
import { BsWhatsapp } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import useOnClickOutside from '../../CustomHooks/index.js'
import SendMail from '../Modal/SendMail.js'
import { FiEdit } from 'react-icons/fi'
import EditModal from '../Modal/EditModal.js'
import toast from 'react-hot-toast'
import { getAllTeams } from '../../Store/teamsSlice.js'
import SwitchButton from '../Common/SwitchButton.js'
import Loader from '../Common/Loader.js'
import { images } from '../../Constants/image.constant.js'
import { appConstants } from '../../Constants/app.constant.js'

const AssessmentDetails = () => {
  const candidateData = useSelector((state) => state.assessment.getCandidates)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const status = [
    { id: 1, status: 'In_Progress' },
    { id: 2, status: 'Invited' },
    { id: 3, status: 'Completed' },
    { id: 4, status: 'Waiting' }
  ]
  const navigate = useNavigate()
  const { state } = useLocation()
  const [assesmentData, setAssessmentData] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(
    state?.candidateOffset ? state?.candidateOffset : 1
  )
  // const [rating, setRating] = useState(null)
  // const [hover, setHover] = useState(null)
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [candidateId, setCandidateId] = useState(null)
  // const [isCopy, setIsCopy] = useState(false);
  const { _id, assessment_url } = useParams()
  var assessment_id = _id
  // const [text, setText] = useState('');
  const [isShare, setIsShare] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [filedName, setFiledName] = useState('')
  const [teamsList, setTeamsList] = useState([])
  const [value, setValue] = useState('')
  const [filterByStatus, setFilterByStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false)
  const [showScore, setShowScore] = useState(assesmentData?.showScore)

  // const [isCandidateLoading, setCandidateLoading] = useState(false)
  const teamsData = useSelector((state) => state.teams)

  const dispatch = useDispatch()
  const ref = useRef()
  const limit = appConstants.LIMIT
  const breadcrumbItems = [
    { label: t('assessment'), url: '/dashboard' },
    {
      label: t('details'),
      url: `/dashboard/assessment/${_id}/${assessment_url}`,
    },
  ]

  useEffect(() => {
    let obj = {
      offset: 1,
      limit: 100,
      query: search,
    }
    dispatch(getAllTeams(obj))
  }, [])

  useEffect(() => {
    // Update component state when teams data changes
    if (teamsData.getAllTeams && teamsData.getAllTeams.status) {
      setTeamsList(teamsData?.getAllTeams?.users)
    }
  }, [teamsData?.getAllTeams])

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleFilterByStatus = (e) => {
    setFilterByStatus(e.target.value)
    setSearch('')
    setIsLoadingRefresh(true)
  }

  const handleCandidateDelete = (candidateId) => {
    if (candidateId) {
      setCandidateId(candidateId)
      setIsOpen(!isOpen)
    }
  }
  const handleRowClick = (data) => {
    const { _id, status } = data
    if (status === 'Completed') {
      navigate('/dashboard/candidateDetails/' + _id, {
        state: {
          state: state,
          candidateOffset: offset,
          assessment_id: assessment_id,
          assessment_url: assessment_url,
        },
      })
    } else {
      toast.error('This test has not been completed yet.')
    }
  }

  const handleEditModalClick = (value, filedName) => {
    setIsModalOpen(!isModalOpen)
    setFiledName(filedName)
    setValue(value)
  }

  const handleApprovedStatusChange = async (e, id) => {
    let tempCandidateList = candidates.map((candidate) => ({ ...candidate }))
    let findIndex = tempCandidateList.findIndex((data) => data._id === id)

    if (findIndex > -1) {
     
      let obj = {
        candidateId: id,
      }
    
      let response = await commonService.withToken(
        apiConstants.CANDIDATE_APPROVE,
        obj
      )
      if (response?.data && response?.status && response?.data?.status) {
        let obj = {
          assessment_url: assessment_url,
          assessment_id: _id,
          offset: offset,
          limit: limit,
          query: search,
          filter: {
            status: filterByStatus,
          },
        }
        tempCandidateList[findIndex] = {
          ...tempCandidateList[findIndex],
          status: 'Invited',
        }
        setCandidates(tempCandidateList)
        toast.success('Candidate Invite successfull!')
        await dispatch(getCandidate(obj))
      } else {
        toast.error(response?.data?.message)
      }
    }
  }

  // const copyToClipBoard = () => {
  //   navigator.clipboard
  //     .writeText(text)
  //     .then(() => {
  //       setIsCopy(true);
  //       toast.success(t('copiedURL'), {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     })
  //     .catch((error) => {
  //       // Handle clipboard writeText error
  //       console.error('Clipboard writeText failed:', error);
  //       setIsCopy(false);
  //     });
  //   // () => {
  //   //     setIsCopy(false)
  //   // });

  //   setTimeout(() => {
  //     setIsCopy(false);
  //   }, 5000);
  // };

  const columns = [
    { Header: t('name'), accessor: 'candidateName' },
    { Header: t('email'), accessor: 'candidateEmail' },
    {
        Header: t('Percentage'),
        accessor: 'candidatePercentage',
  
        Cell: ({ row }) => (
          <div className="flex items-center justify-center">
            {row.values?.candidatePercentage === 'NA' ? row.values?.candidatePercentage : `${row.values?.candidatePercentage}%`}
          </div>
        ),
      },
    {
      Header: t('status'),
      accessor: 'status',
      disableSortBy: true,
      Cell: ({ row }) => (
        <div
          className=" sm:px-1 flex items-center justify-center"
          onClick={(event) => event.stopPropagation()}
        >
          {row.values?.status === 'In_Progress' ? (
            <TbProgressCheck className="text-secondary text-lg" title={row.values?.status} />
          ) : row.values?.status === 'Invited' ? (
            <MdOutlinePending className="text-primary text-lg" title={row.values?.status} />
          ) : row.values?.status === 'Waiting' ? (
            <>
            {/* <ImSpinner3 className="text-primary text-lg" /> */}
            {row?.original?.status === 'Waiting' && (
              <SwitchButton
                data={row?.original?.status === 'Waiting' ? false : true}
                status={row?.original?.status === 'Waiting' ? 0 : 1}
                handleStatusChange={(e) =>
                  handleApprovedStatusChange(e, row?.original?._id)
                }
                title={row.values?.status}
              />
            )}
            </>
          ) : (
            <AiFillCheckCircle className="text-success text-lg" title={row.values?.status}/>
          )}

         {/* {<span className={`absolute z-10 top-75 scale-0 rounded border-1 bg-light border-gray-400 p-1 text-xs text-black group-hover:scale-100 ${row?.original?.status === 'Waiting'? 'top-[10rem]': 'top-75'} 
         `}
         >
            {row.values?.status}
          </span>} */}
        </div>
      ),
    },
    {
      Header: t('action'),
      accessor: 'action',
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <RiDeleteBin3Fill
            className="text-red-600 text-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleCandidateDelete(row.original._id)
            }}
          />
          {/* <button className=" bg-primary text-white rounded px-2 text-center cursor-pointer text-base">Details</button> */}
        </div>
      ),
    },
  ]

  // const searchRes = useCallback(
  //     debounce(async (query) => {
  //         try {
  //             let obj = {
  //                 assessment_url: assessment_url,
  //                 assessment_id: _id,
  //                 offset: 1,
  //                 limit: 10,
  //                 query: query
  //             }

  //             dispatch(getCandidate(obj))
  //         } catch (error) {
  //             console.error('Error performing search:', error);
  //         }
  //     }, 500),
  //     []
  // );

  useEffect(() => {
    const debouncedGetData = debounce(async () => {
      // setCandidateLoading(true)
      let obj = {
        assessment_url: assessment_url,
        assessment_id: _id,
        offset: offset,
        limit: limit,
        query: search,
        filter: {
          status: filterByStatus,
        },
      }
      await dispatch(getCandidate(obj))
     
    }, 300) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [dispatch, offset, limit, search, filterByStatus])

  useEffect(() => {
    // setIsAssessmentLoading(true)
    const obj = {
      assessment_id: _id,
      limit: limit,
      offset: offset,
    }

    const getData = async () => {
      try {
        setIsLoading(true)
        const response = await commonService.withToken(
          apiConstants.GET_ASSESSMENT_BY_ID,
          obj
        )
        if (response?.data && response?.status) {
          setAssessmentData(response?.data?.assesment)
          setShowScore(response?.data?.assesment?.showScore)
          setIsLoading(false)
          // setText(response?.data?.assesment?.assessment_invite_url);
        }
        return response
      } catch (error) {
        // Handle error
        console.log(error)
      }
    }

    const debouncedGetData = debounce(getData, 0) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [])

  useEffect(() => {
    if (candidateData && candidateData.candidates) {
      setCandidates(candidateData?.candidates)
      setPageCount(candidateData?.pages)
      setIsLoading(false)
      setIsLoadingRefresh(false)
    }
  }, [candidateData])

  useOnClickOutside(ref, () => setIsShare(false))

  const editModal = useMemo(
    () => (
      <EditModal
        isShow={isModalOpen}
        setIsShow={setIsModalOpen}
        value={value}
        setValue={setValue}
        filedName={filedName}
        assessment_id={_id}
        offset={offset}
        limit={limit}
        setAssessmentData={setAssessmentData}
      />
    ),
    [isModalOpen, setIsModalOpen, value, _id, filedName]
  )

  const sendMail = useMemo(
    () => (
      <SendMail isOpen={isShow} setIsOpen={setIsShow} data={assesmentData} />
    ),
    [isShow, setIsShow, assesmentData]
  )

  const handleInchargeUpdate = async (e) => {
    let tempassesmentData = {...assesmentData}
      tempassesmentData.incharge._id = e.target.value
      setAssessmentData(tempassesmentData)
      let obj = {
        assessment_id: assesmentData._id,
        ['incharge']: e.target.value,
      }
      await dispatch(updateAssessmentById(obj))

      // const obj1 = {
      //   assessment_id: _id,
      //   limit: limit,
      //   offset: offset,
      // }
      // // await dispatch(getQuestionsByQuestionBankId(obj2));
      // const response = await commonService.withToken(
      //   apiConstants.GET_ASSESSMENT_BY_ID,
      //   obj1
      // )
      // if (response?.data && response?.status) {
      //   setAssessmentData(response?.data?.assesment)
      //   // setText(response?.data?.assesment?.assessment_invite_url);
      // }
    // }
  }

  const handleRefresh = async (event) => {
    event.preventDefault()
    const currentPosition = window.pageYOffset;
    setIsLoadingRefresh(true)
    let obj = {
      assessment_url: assessment_url,
      assessment_id: _id,
      offset: offset,
      limit: limit,
      query: search,
      filter: {
        status: filterByStatus,
      },
    }
    await dispatch(getCandidate(obj))
    setIsLoadingRefresh(false)
    setTimeout(() => {
      window.scrollTo(0, currentPosition);
    }, 50); 
  }

  const handleShowScore = async(e) => {
    setShowScore(e.target.checked)
    let obj = {
      assessment_id: assesmentData._id,
      showScore: e.target.checked
    }
    await dispatch(updateAssessmentById(obj))
}


  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={`p_five  ${window.screen.height >= 900 ? 'h-screen' : (window.screen.height > 720 && candidates?.length > 5 && !isLoadingRefresh) ? 'h-auto ': window.screen.height <= 720 && !isLoading ? 'h-auto' : 'h-screen'} bgc-color`}>
      <>
        <Breadcrumbs items={breadcrumbItems} state={state} />
        <div className="bg-white shadow-sm rounded p-3">
          <div className="flex justify-between flex-row">
            <h6 className="font font-semibold text-xs sm:text-xs lg:text-sm md:text-sm xl:text-base 2xl:text-base">
              {t('testInformation')}
            </h6>

            <div className="flex justify-center">
              <div className="text-center font-semibold">
                <FaShareSquare
                  className="text-sm sm:text-sm lg:text-md md:text-sm xl:text-xl 2xl:text-xl  cursor-pointer"
                  onClick={() => setIsShow(true)}
                  title="Share"
                />
              </div>

              {/* <div
                            data-testid="copy-clipboard"
                            className={`text-xs sm:text-xs lg:text-xs md:text-sm xl:text-sm 2xl:text-base text-primary ml-5 px-3 py-1 border-1 border-gray cursor-pointer text-center flex justify-center items-center font-semibold ${isCopy ? 'text-success' : 'text-primary'
                                }`}
                            onClick={copyToClipBoard}
                        >
                            <AiFillCopy className="text-xs sm:text-xs lg:text-xs md:text-sm xl:text-sm 2xl:text-base" /> {` ${isCopy ? t('copied') : t('copy')}`}
                        </div> */}
              {/* <div className="ml-2">
              <Link
                to={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  assesmentData?.assessment_invite_url
                )}`}
              >
                <BsWhatsapp className="text-success text-2xl" />
              </Link>
            </div> */}
            </div>
          </div>

          {isShare ? (
            <div className="w-full" ref={ref}>
              <div className=" bgc-color shadow w-16 rounded absolute right-3">
                <Link
                  target="_blank"
                  to={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    assesmentData?.assessment_invite_url
                  )}`}
                >
                  <div className="flex flex-col justify-center items-center">
                    <div className="py-1">
                      <BsWhatsapp className="text-success text-2xl " />
                    </div>
                    <div className="py-1">
                      <FaLinkedin className=" text-2xl text-[#0A66C2] " />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex-col justify-between items-center font md:flex-col lg:flex-col xl:flex-row 2xl:flex-row font">
            <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row">
              {/* <p className="mt-3 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
              {t("assessmentURL")}
            </p> */}
              {/* <div className="flex text-xs sm:text-xs lg:text-xs md:text-xs xl:text-sm 2xl:text-base items-center overflow-auto ">
              <p className=" ml-0 lg:ml-3">{assesmentData?.assessmentName}</p> */}
              {/* <div
                                data-testid="copy-clipboard"
                                className={`text-xs sm:text-xs lg:text-xs md:text-sm xl:text-sm 2xl:text-base text-primary ml-5 px-3 py-1 border-1 border-gray cursor-pointer text-center flex justify-center items-center font-semibold ${isCopy ? 'text-success' : 'text-primary'
                                    }`}
                                onClick={copyToClipBoard}
                            >
                                <AiFillCopy className="text-xs sm:text-xs lg:text-xs md:text-sm xl:text-sm 2xl:text-base" /> {` ${isCopy ? t('copied') : t('copy')}`}
                            </div>
                            <div className="ml-2">
                                <Link to={`https://api.whatsapp.com/send?text=${encodeURIComponent(assesmentData?.assessment_invite_url)}`}><BsWhatsapp className="text-success text-2xl"/></Link>
                            </div> */}
              {/* </div> */}
            </div>

            <div className="flex flex-col xl:flex-row xl:justify-between  ">
              <div className="flex flex-col ">
                <div className="flex items-center mt-1">
                  <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
                    {t('Test Name')} :
                  </p>
                  <p className="ml-3 text-primary text-xs sm:text-xs md:text-sm lg:text-sm xl:text-text-sm 2xl:text-base">
                    {assesmentData?.assessmentName}
                  </p>

                  <p>
                    <FiEdit
                      className="ml-3 cursor-pointer text-sm sm:text-sm lg:text-md md:text-sm xl:text-lg 2xl:text-xl"
                      onClick={() =>
                        handleEditModalClick(
                          assesmentData?.assessmentName,
                          'assessmentName'
                        )
                      }
                      title='Edit'
                    />
                  </p>
                </div>

                <div className="flex items-center ">
                  <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
                    {t('testDuration')}
                  </p>
                  <p className="ml-3 text-primary text-xs sm:text-xs md:text-sm lg:text-sm xl:text-text-sm 2xl:text-base">
                    {assesmentData?.assessment_duration} {t('min')}
                  </p>
                </div>

                <div className="flex items-center ">
                  <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
                    {t('testScore')} :
                  </p>
                  <p className="ml-3 text-primary text-xs sm:text-xs md:text-sm lg:text-sm xl:text-text-sm 2xl:text-base">
                    {assesmentData?.totalTestScore}
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
                    {t('Question Banks')} :
                  </p>
                  <ul className="list-disc px-3">
                    {assesmentData?.questionBanksId?.map((value, index) => (
                      <li
                        className="m-0 p-0 text-primary text-xs sm:text-xs md:text-sm lg:text-sm xl:text-text-sm 2xl:text-base"
                        key={index}
                      >
                        {value?.qBankName}
                      </li>
                    ))}
                  </ul>
                </div>
                
              </div>

              <div className="flex flex-col">
                {userData?.role?.roleType !== 5 && <div>
                  <label className="mr-3 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base font-semibold">
                    {t('Assessment Incharge')} :
                  </label>
                  <select
                    name="status"
                    value={assesmentData?.incharge?._id}
                    data-testid="plan-input"
                    onChange={(e) => handleInchargeUpdate(e)}
                    required
                    className="w-44 mt-1 py-1 cursor-pointer bgc-color  text-primary block border text-sm border-gray-300 rounded-md focus:border-blue-300 focus:outline-blue-300"
                  >
                    {teamsList.map((data) => {
                      return (
                        <option
                          key={data?._id}
                          name={data?._id}
                          value={
                            data?._id === assesmentData?.incharge?._id
                              ? assesmentData?.incharge?._id
                              : data?._id
                          }
                          className="cursor-pointer text-sm"
                        >
                          {`${data?.firstName} ${data?.lastName}`}
                        </option>
                      )
                    })}
                  </select>
                </div>}

                <div className="mt-4">
                  <p className="font-semibold text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base ">
                    {t('antiCheat')}
                  </p>
                  <ul className="list-disc px-3 text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base">
                    <li>{t('disallow')}</li>
                    <li>{t('makeFullscreen')}</li>
                    <li>{t('logTab')}</li>
                  </ul>
                  {/* <div className=' flex items-center'>
                        <input type='checkbox'  onChange={handleShowScore} checked={showScore} />
                        <label className='ml-3 lg:ml-5 xl:ml-5' >{t('showScore')}</label>
                    </div> */}
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base ">
                    {t('additionalSettings')} :
                  </p>
                  <div className=' flex items-center'>
                        <input type='checkbox' onChange={handleShowScore} checked={showScore} />
                        <label className='ml-3 lg:ml-5 xl:ml-5' >{t('showScore')}</label>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* candidate =============== */}
      <div className="mt-5 relative">
        <h6 className="font font-semibold">{t('candidatec')}</h6>

        <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center ">
          <div className="flex w-full">
            <div className="flex items-center border w-full xl:w-1/2 rounded-lg bg-white">
              <div className="px-2">
                <BiSearch className="text-lg" />
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  data-testid="search-input"
                  placeholder={t('search')}
                  value={search}
                  className="bg-white mb-1 py-1 sm:mb-0 border-none focus:border-none focus:outline-none w-full"
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setFilterByStatus('')
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center xl:justify-end mt-2 xl:pt-0 w-full xl:w-1/2">
            <div>
              <select
                name="status"
                value={filterByStatus}
                data-testid="plan-input"
                onChange={(e) => handleFilterByStatus(e)}
                required
                className="font-bold block w-full px-3 border text-xs sm:text-sm border-gray-300 h-10 rounded-md focus:border-blue-300 focus:outline-blue-300 bgc-color  "
              >
                <option value="" selected>
                  {t('Filter Status: All')}
                </option>
                {status.map((data) => {
                  return (
                    <option key={data.id} name={data.id} value={data.status}>
                      {data.status === 'In_Progress'
                        ? 'In-Progress'
                        : data.status}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex items-center ml-2">
              <img
                src={images.REFRESH}
                className="w-14 py-1 bgc-color hover:bg-slate-300 rounded cursor-pointer border-2 border-blue-200"
                alt="refresh"
                onClick={handleRefresh}
                title='Refresh'
              />
            </div>
          </div>
        </div>

       {isLoadingRefresh ? 
       <div >
         <div
              className="spinner-border text-primary absolute top-50 z-1 "
              style={{ left: '50%' }}
            ></div> 
        </div>
         : <div className="pb-3">
          {/* {isFilter ? (
           
          ) : ( */}
            <DataTable
              columns={columns}
              data={candidates}
              handlePageClick={handlePageClick}
              pageCount={pageCount}
              handleRowClick={handleRowClick}
              offset={offset}
            />
          {/* )} */}
        </div>}
      </div>

      <DeleteAssessment
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={{ candidateId: candidateId, assementId: _id }}
      />

      {sendMail}
      {editModal}
    </div>
  )
}
export default AssessmentDetails
