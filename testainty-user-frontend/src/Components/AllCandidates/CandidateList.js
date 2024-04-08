/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import DataTable from '../Layouts/DataTable.js'
import { RiDeleteBin3Fill } from 'react-icons/ri/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { BiSearch } from 'react-icons/bi/index.js'
import debounce from 'lodash.debounce'
import DeleteAssessment from '../Modal/DeleteAssessment.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { searchAllCandidates } from '../../Store/candidateSlice'
import Breadcrumbs from '../Common/Breadcrumbs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { TbProgressCheck } from 'react-icons/tb'
import { MdOutlinePending } from 'react-icons/md'
import { ImSpinner3 } from 'react-icons/im'
import { t } from 'i18next'
import { toast } from 'react-hot-toast'
import SwitchButton from '../Common/SwitchButton.js'
import { commonService } from '../../Services/common.services.js'
import { apiConstants } from '../../Constants/api.constant.js'
import { images } from '../../Constants/image.constant.js'
import Loader from '../Common/Loader.js'
import '../../App.css'
import { appConstants } from '../../Constants/app.constant.js'

const CandidateList = () => {
  const candidateData = useSelector((state) => state.candidates)
  const status = [
    { id: 1, status: 'In_Progress' },
    { id: 2, status: 'Invited' },
    { id: 3, status: 'Completed' },
    { id: 4, status: 'Waiting' },
  ]

  // const isLoading = candidateData?.loading
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(state ? state : 1)
  const [candidateList, setCandidateList] = useState([])
  const [search, setSearch] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [cId, setCId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterByStatus, setFilterByStatus] = useState('')
  const [isFilter, setIsFilter] = useState(false)
  const breadcrumbItems = [
    { label: t('dashboard'), url: '/dashboard' },
    { label: t('candidate'), url: '/allCandidate' },
  ]
  const limit = appConstants.LIMIT
  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    setFilterByStatus('')
  }

  const handleFilterByStatus = (e) => {
    setFilterByStatus(e.target.value)
    setSearch('')
    setIsLoading(true)
  }

  const handleRowClick = (data) => {
    const { _id, status } = data
    if (status === 'Completed') {
      navigate('/allCandidate/candidateDetails/' + _id, { state: offset })
    } else {
      toast.error('This test has not been completed yet.')
    }
  }
  const handleDeleteCandidate = (event, id) => {
    event.stopPropagation()
    setCId(id)
    setIsShow(true)
  }

  useEffect(() => {
    const debouncedGetData = debounce(() => {
      let obj = {
        offset: offset,
        limit: limit,
        query: search,
        filter: {
          status: filterByStatus,
        },
      }
      dispatch(searchAllCandidates(obj))
      // setIsFilter(false)
    },300) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [dispatch, offset, limit, search, filterByStatus])

  useEffect(() => {
    if (
      candidateData &&
      candidateData?.getAllCandidates &&
      candidateData?.getAllCandidates?.candidates
    ) {
      setCandidateList(candidateData?.getAllCandidates?.candidates)
      setPageCount(candidateData?.getAllCandidates?.pages)
      setIsLoading(false)
    }
  }, [candidateData?.getAllCandidates])

  const handleApprovedStatusChange = async (e, id) => {
    let tempCandidateList = candidateList.map((candidate) => ({ ...candidate }))
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
        setCandidateList(tempCandidateList)

        toast.success('Candidate Invite successfull!')
        await dispatch(searchAllCandidates(obj))
      } else {
        toast.error(response?.data?.message)
      }
    }
  }

  const columns = [
    { Header: t('name'), accessor: 'candidateName' },
    { Header: t('email'), accessor: 'candidateEmail' },
    // {
    //   Header: t('Score'),
    //   accessor: 'assessmentScore',

    //   Cell: ({ row }) => (
    //     <div className="flex items-center justify-center">
    //       {row.assessmentScore}
    //     </div>
    //   ),
    // },
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
            <MdOutlinePending className="text-primary text-lg" title={row.values?.status}/>
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
            <AiFillCheckCircle className="text-success text-lg"
            title={row.values?.status}
             />
          )}
          {
        //     <span
        //       className={`absolute z-10 scale-0 rounded border-1 bg-light border-gray-400 p-1 text-xs text-black group-hover:scale-100 ${
        //         row?.original?.status === 'Waiting' ? 'bottom-80 ' : 'top-75'
        //       }
        //  `}
        //     >
        //       {row.values?.status}
        //     </span>
          }
        </div>
      ),
    },
    // {
    //   Header: t('approved'),
    //   accessor: 'approvedStatus',
    //   disableSortBy: true,
    //   Cell: ({ row }) => (
    //     <div
    //       className="flex items-center justify-center"
    //       onClick={(e) => e.stopPropagation()}
    //     >
    //       {/* <Switch data-testid="assessment-status-toggle" onChange={(status) => { handleStatusChange(row.original, status) }} checked={row.original.assessment_status === 1 ? true : false} /> */}

    //       {row?.original?.status === 'Waiting' && (
    //         <SwitchButton
    //           data={row?.original?.status === 'Waiting' ? false : true}
    //           status={row?.original?.status === 'Waiting' ? 0 : 1}
    //           handleStatusChange={(e) =>
    //             handleApprovedStatusChange(e, row?.original?._id)
    //           }
    //         />
    //       )}
    //     </div>
    //   ),
    // },
    {
      Header: t('action'),
      accessor: 'action',
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <RiDeleteBin3Fill
            className="text-red-500 text-lg cursor-pointer"
            onClick={(event) => handleDeleteCandidate(event, row.original._id)}
            title="Delete"
          />
        </div>
      ),
    },
  ]

  // if (isLoading) {
  //   return <Loader />
  // }

  const handleRefresh = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const currentPosition = window.pageYOffset;
    let obj = {
      offset: offset,
      limit: limit,
      query: search,
      filter: {
        status: filterByStatus,
      },
    }
    await dispatch(searchAllCandidates(obj))
    setTimeout(() => {
      window.scrollTo(0, currentPosition);
    }, 50); 
    setIsLoading(false)
  }

  return (
    <div
      className={`p_five w-full overflow-y-hidden bgc-color ${
        window.screen.height >= 900
          ? 'screen-height'
          : candidateList?.length > 9
          ? 'h-auto '
          : 'screen-height'
      }`}
    >
      <div className="flex items-center sm:flex-row">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mt-4">
        <div className="flex w-full">
          <div className=" flex items-center border rounded-lg px-3 shadow-sm bg-white">
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
        </div>

        <div className="flex items-center xl:justify-end xs:mt-3 xl:mt-0 w-full xl:w-1/2">
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
                Filter Status: All
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
              title="Refresh"
            />
          </div>
        </div>
      </div>

      {/* {isLoading ? (<Loader />) : */}
      {/* ( */}

      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={candidateList}
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          handleRowClick={handleRowClick}
          offset={offset}
        />
      )}

      {/* )} */}
      <DeleteAssessment
        isOpen={isShow}
        setIsOpen={setIsShow}
        data={{ cId: cId }}
      />
    </div>
  )
}

export default CandidateList
