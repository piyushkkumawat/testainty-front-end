/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-debugger */
import { useEffect, useMemo, useState } from 'react'
import DataTable from '../Layouts/DataTable.js'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi/index.js'
import SendMail from '../Modal/SendMail.js'
import {
  getAllAssessments,
  updateAssessment,
} from '../../Store/assessmentSlice.js'
import debounce from 'lodash.debounce'
import { images } from '../../Constants/image.constant.js'
import DeleteAssessment from '../Modal/DeleteAssessment.js'
import Breadcrumbs from '../Common/Breadcrumbs.js'
import { toast } from 'react-hot-toast'
import { resetValue } from '../../Store/createAssesmentSlice.js'
import { useTranslation } from 'react-i18next'
import { RiDeleteBin3Fill } from 'react-icons/ri'
import { FaShareSquare } from 'react-icons/fa'
import SwitchButton from '../Common/SwitchButton.js'
import { appConstants } from '../../Constants/app.constant.js'

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [assessmentList, setAssessmentList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(state ? state : 1)
  const [isOpen, setIsOpen] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [assessmentDetail, setAssessmentDetail] = useState(null)
  const [search, setSearch] = useState('')
  const [assessmet_id, setAssessmentId] = useState(null)

  const { t } = useTranslation()
  const limit = appConstants.LIMIT

  const assessmentData = useSelector((state) => state.assessment)

  const isLoading = assessmentData?.loading

  const breadcrumbItems = [
    { label: t('dashboard'), url: '/dashboard' },
    { label: t('assessment'), url: '/dashboard' },
  ]

  const SendMailMemoized = useMemo(() => {
    return (
      <SendMail isOpen={isOpen} setIsOpen={setIsOpen} data={assessmentDetail} />
    )
  }, [isOpen, setIsOpen, assessmentDetail])

  const DeleteAssessmentMemoized = useMemo(() => {
    return (
      <DeleteAssessment
        isOpen={isShow}
        setIsOpen={setIsShow}
        data={{ assessment_id: assessmet_id }}
      />
    )
  }, [isShow, setIsShow, assessmet_id])

  useEffect(() => {
    if (
      assessmentData &&
      assessmentData.getAllAssessments &&
      assessmentData.getAllAssessments.assessments
    ) {
      setAssessmentList(assessmentData.getAllAssessments.assessments)
      setPageCount(assessmentData.getAllAssessments.pages)
    }
  }, [assessmentData.getAllAssessments])

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleInviteLink = (data) => {
    if (data.assessment_status) {
      setAssessmentDetail(data)
      setIsOpen(!isOpen)
    } else {
      toast.error(t('candidateNotInvited'))
    }
  }

  // const handleIdClick = (assessment_id, assessment_url) => {
  //     navigate('/dashboard/assessment/' + assessment_id + '/' + assessment_url)
  // }

  const handleDeleteAssessment = (event, assessment_id) => {
    event.stopPropagation()
    setAssessmentId(assessment_id)
    setIsShow(!isShow)
  }

  useEffect(() => {
    const debouncedGetData = debounce(() => {
      let obj = {
        offset: offset,
        limit: limit,
        query: search,
      }
      dispatch(getAllAssessments(obj))
    }, 0) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [dispatch, offset, limit, search])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleRowClick = (data) => {
    const { _id, assessment_url } = data
    navigate('/dashboard/assessment/' + _id + '/' + assessment_url, {
      state: offset,
    })
  }

  const handleStatusChange = async (event, data) => {
    // Prevent the default behavior if needed
    // event.preventDefault();

    let obj = {
      assessment_id: data._id,
      status: event.target.checked ? 1 : 0,
    }

    let tempArrList = [...assessmentList]

    const updatedTempArrList = tempArrList.map((assessmentData) => {
      if (assessmentData._id === data._id) {
        return {
          ...assessmentData,
          assessment_status: event.target.checked ? 1 : 0,
        }
      }

      return assessmentData
    })
    setAssessmentList(updatedTempArrList)

    await dispatch(updateAssessment(obj))

    // let obj2 = {
    //     offset: offset,
    //     limit: limit,
    //     query: search
    // };

    // If you need to wait for getAllAssessments, uncomment the line below
    // await dispatch(getAllAssessments(obj2));
  }

  const columns = [
    { Header: t('name'), accessor: 'assessmentName' },
    {
      Header: t('date'),
      accessor: 'createdAt',
      Cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {` ${new Date(row.original.createdAt).getDate()} ${new Date(
            row.original.createdAt
          ).toLocaleString('en-US', { month: 'short' })}   ${new Date(
            row.original.createdAt
          ).getFullYear()}`}
        </div>
      ),
    },
    {
      Header: t('duration'),
      accessor: 'assessment_duration',
      Cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.assessment_duration}
        </div>
      ),
    },
    {
      Header: t('inviteCandidates'),
      accessor: 'inviteCandidates',
      disableSortBy: true,
      Cell: ({ row }) => (
        // <div>
        //     <BsFillCloudArrowUpFill data-testid="assessment-invite" className="text-[rgb(0,157,255)] text-lg cursor-pointer text-center ml-9 " onClick={(e) => { e.stopPropagation(); handleInviteLink(row.original) }} />
        // </div>
        <div className="flex items-center justify-center">
          <FaShareSquare
            data-testid="assessment-invite"
            className="text-[rgb(0,157,255)] text-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              handleInviteLink(row.original)
            }}
            title="Share"
          />
        </div>
      ),
    },
    {
      Header: t('status'),
      accessor: 'assessment_status',
      disableSortBy: true,
      Cell: ({ row }) => (
        <div
          className="flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* <Switch data-testid="assessment-status-toggle" onChange={(status) => { handleStatusChange(row.original, status) }} checked={row.original.assessment_status === 1 ? true : false} /> */}

          <SwitchButton
            data={row.original}
            status={row?.original?.assessment_status}
            handleStatusChange={handleStatusChange}
            data-testid="assessment-status-toggle"
          />
          {/* <div className= {`switch-btt ${row.original.assessment_status === 1 ? 'checked-y': 'checked-n'}`}>
                <input type='checkbox' name='' className='toggle' checked={row.original.assessment_status === 1 ? true : false} onChange={(event) => { handleStatusChange(event, row.original) }} />
                <div className='slide'></div>
              </div> */}
        </div>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <RiDeleteBin3Fill
            className=" text-red-500 text-xl cursor-pointer "
            onClick={(event) => handleDeleteAssessment(event, row.original._id)}
            title="Delete"
          />
          {/* <FaEye className="cursor-pointer text-[rgb(0,157,255)] text-lg ml-2" onClick={(e) => {e.stopPropagation(); handleIdClick(row.original._id, row.original.assessment_url)}} /> */}
        </div>
      ),
    },
  ]

  const handleClick = () => {
    dispatch(resetValue())
    navigate('/dashboard/createAssessment')
  }

  // if (isLoading) {
  //   return <Loader />
  // }

  return (
    <div
      data-testid="dashboard"
      className={`p_five bgc-color w-full overflow-y-hidden ${window.screen.height >= 900 ? 'screen-height' : assessmentList.length > 9 ? 'h-auto': 'screen-height'}`}
    >
       {/* <div
      data-testid="dashboard"
      className={`p_five bgc-color w-full overflow-y-hidden ${window.screen.height >= 900 ? 'h-[90vh] lg:h-[92vh]' : assessmentList.length > 9 ? 'h-auto': 'h-[90vh] lg:h-[92vh]'}`}
    > */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col justify-start items-start sm:justify-between  xs:items-start xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row mt-4">
        {/* <div className="no-underline" onClick={handleClick}>
                    <button  className="px-6 py-2 bg-[rgb(0,157,255)] hover:bg-[rgb(30,66,159)] text-white rounded-md no-underline font text-xs sm:text-xs lg:text-base md:text-base xl:text-base 2xl:text-base">{t('createAssessment')}</button>
                </div> */}

        <div className=" flex items-center border rounded-lg px-3 shadow-sm bg-white sm:mb-3 ">
          <div className="">
            <BiSearch className="text-lg" />
          </div>
          <div className="">
            <input
              type="text"
              data-testid="search-input"
              placeholder={t('search')}
              value={search}
              className="rounded-md bg-white sm:w-64 px-3 py-1 mb-1 sm:mb-0 border-none focus:border-none focus:outline-none "
              onChange={handleChange}
            />
          </div>
        </div>

        <div className=" group flex xs:mt-3 xl:mt-0">
          {/* <MdCreateNewFolder className="text-4xl text-color cursor-pointer" onClick={handleClick} /> */}
          <img
            data-testid="create-img"
            src={images.CREACTE_ICON}
            alt="create"
            className=" w-16 md:py-0 cursor-pointer"
            onClick={handleClick}
            title={t('crtAssessment')}
          />
          {/* <span
            data-testid="create-label"
            className="absolute top-[17rem] lg:top-56 xl:top-56 scale-0 rounded border-1 border-gray-400  p-1 text-xs text-black group-hover:scale-100"
          >
            {t('crtAssessment')}
          </span> */}
        </div>
      </div>
      {/* {isLoading ? (<Loader data-testid="loader" />) :  */}
      <DataTable
        columns={columns}
        data={assessmentList}
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        handleRowClick={handleRowClick}
        offset={offset}
      />
      {/* }) */}
      {assessmentDetail && SendMailMemoized}
      {DeleteAssessmentMemoized}
      {/* <SendMail isOpen={isOpen} setIsOpen={setIsOpen} data={assessmentDetail} /> */}
      {/* <DeleteAssessment isOpen={isShow} setIsOpen={setIsShow} data={{ assessment_id: assessmet_id }} /> */}
    </div>
  )
}

export default Dashboard
