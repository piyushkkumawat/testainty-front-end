import { useEffect, useState } from 'react'
import DataTable from '../Layouts/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getQuestionsBank } from '../../Store/userSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DeleteModal from '../Modal/DeleteModal'
import { MdCreateNewFolder } from 'react-icons/md'
import debounce from 'lodash.debounce'
import Loader from '../Loader'
import '../../App.css'

const QuestionBank = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [questionBankList, setQuestionBankList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(state ? state : 1)
  const [isShow, setIsShow] = useState(false)
  const [questionBankId, setQuestionBankId] = useState(null)
  const questionBank = useSelector((state) => state.user)
  const userData = JSON.parse(localStorage.getItem('userData'))
  const limit = 10

  useEffect(() => {
    setLoading(true)
    const debouncedGetData = debounce(() => {
      const obj = {
        limit,
        offset,
      }
      dispatch(getQuestionsBank(obj))
    }, 0) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [dispatch, offset])

  useEffect(() => {
    if (
      questionBank &&
      questionBank.questionsBankData &&
      questionBank.questionsBankData.qBanks
    ) {
      setQuestionBankList(questionBank.questionsBankData.qBanks)
      setPageCount(questionBank.questionsBankData.pages)
      setLoading(false)
    }
  }, [questionBank, questionBank.questionsBankData])

  const handleAddQuestions = (id, data) => {
    localStorage.setItem('qtype', JSON.stringify(data.type))
    navigate('/questionBank/addQuestions/' + id)
  }

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleEdit = (event, id) => {
    event.stopPropagation()
    navigate('/questionBank/editQuestionBank/' + id)
  }

  const handleRowClick = (data) => {
    const { _id } = data
    localStorage.setItem('qtype', JSON.stringify(data.type))

    navigate('/questionBank/questionsDetails/' + _id, { state: offset })
  }

  const handleDelete = (event, questionBankId) => {
    event.stopPropagation()
    setQuestionBankId(questionBankId)
    setIsShow(!isShow)
  }

  const columns = [
    {
      Header: 'Name',
      accessor: 'qBankName',
      Cell: ({ row }) => (
        <>
          <span className="no-underline cursor-pointer">
            {row.original.qBankName}
          </span>
        </>
      ),
    },
    {
      Header: 'Questions',
      accessor: 'totalQuestions',
      Cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <span className="no-underline cursor-pointer">
            {row.original.totalQuestions}
          </span>
        </div>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <MdCreateNewFolder
            className="text-primary cursor-pointer "
            onClick={(event) => {
              event.stopPropagation()
              handleAddQuestions(row.original._id, row.original)
            }}
          />
          {userData?.role?.roleType !== 4 && (
            <RiDeleteBin6Line
              onClick={(event) => handleDelete(event, row.original._id)}
              className="ml-4 cursor-pointer text-red-600"
            />
          )}
          {/* <FiEdit className="ml-4 cursor-pointer" onClick={(event) => handleEdit(event, row.original._id)} /> */}
        </div>
      ),
    },
  ]

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div
        className={`p_five main-bg font ${
          questionBankList?.length > 9 ? 'h-auto' : 'h-screen'
        }`}
      >
        <div className="flex sm:flex-row justify-between items-start w-full">
          <h3 className="text-base lg:text-xl xl:text-xl font-semibold ">
            Question Banks
          </h3>
          <div className="flex justify-center sm:px-12">
            <Link to="/questionBank/addQuestionBank">
              <img src="../assets/images/crt.png" className="w-20" alt="" title='+ Question Bank' />
            </Link>
            {/* <span className="absolute top-32 scale-0 rounded border-1 border-gray-400 p-1 text-xs text-black group-hover:scale-100">
              + Question Bank
            </span> */}
          </div>
          {/* <div className="ml-auto px-4">
                        <div>
                            <Link to="/questionBank/addQuestionBank"><button className=" text-sm p-2 btn-color hover:bg-[rgb(144,179,31)] text-white rounded-md">+ Add Question Bank</button></Link>
                        </div>
                    </div> */}
        </div>

        <DataTable
          columns={columns}
          data={questionBankList}
          handlePageClick={handlePageClick}
          pageCount={pageCount}
          handleRowClick={handleRowClick}
          offset={offset}
        />
        <DeleteModal
          isOpen={isShow}
          setIsOpen={setIsShow}
          data={{ questionBankId: questionBankId }}
        />
      </div>
    </>
  )
}

export default QuestionBank
