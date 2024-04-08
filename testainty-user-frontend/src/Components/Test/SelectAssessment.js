import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestionBank } from '../../Store/assessmentSlice.js'
import ReactPaginate from 'react-paginate'
import { AiOutlineCheck } from 'react-icons/ai'
import { addQBank } from '../../Store/createAssesmentSlice'
import { handleNext, handlePrev } from '../../Store/createAssesmentSlice'
import { t } from 'i18next'
import { toast } from 'react-hot-toast'
import '../../App.css'
import { BiSearch } from 'react-icons/bi'
import { debounce } from 'lodash'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { appConstants } from '../../Constants/app.constant.js'

const SelectAssessment = () => {
  const getQuestionbankData = useSelector((state) => state.assessment)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [offset, setOffset] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [questionBankData, setQuestionbankData] = useState([])
  const [selectedQBank, setSelectedQBank] = useState([])
  const selectQBankData = (state) => state.createAssessment
  const selectQuestionbank = (state) =>
    selectQBankData(state)?.selectedQBank || {}
  const createQuestionBankData = useSelector(selectQuestionbank)
  const [showMore, setShowMore] = useState(false)
  const [totalAssessmentTime, setTotalAssessmentTime] = useState(0)
  const [totalAssessmentScore, setTotalAssessmentScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const limit = appConstants.SELECT_ASSESSMENT_LIMIT

  const [search, setSearch] = useState('')

  useEffect(() => {
    if (createQuestionBankData?.length > 0) {
      setSelectedQBank(createQuestionBankData)
    }
  }, [createQuestionBankData])

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleSelectQBank = (
    id,
    qBankName,
    qTime,
    totalScore,
    totalQuestions
  ) => {
    const qBankScore = totalScore / totalQuestions
    setSelectedQBank((prevSelected) => [
      ...prevSelected,
      {
        questionBanksId: id,
        qBankName: qBankName,
        count: 1,
        questionTime: qTime || 1,
        totalQDurationTime: qTime || 1,
        totalScore: qBankScore || 1,
      },
    ])
  }

  const handleUnselectedQBank = (id, questionTime) => {
    if (id) {
      const filteredArray = selectedQBank.filter(
        (value, index) => value.questionBanksId !== id
      )
      setSelectedQBank(filteredArray)
    }
  }

  const handleSubmit = () => {
    if (selectedQBank.length === 0) {
      toast.error(t('selectQBnk'))
    } else {
      dispatch(addQBank(selectedQBank))
      dispatch(handleNext())
      navigate('/dashboard/setting')
    }
  }

  const handleSeeMore = (id) => {
    setShowMore((prevId) => (prevId === id ? null : id))
  }

  useEffect(() => {
    if (
      getQuestionbankData &&
      getQuestionbankData.getQuestionBanks &&
      getQuestionbankData.getQuestionBanks.qBanks
    ) {
      setQuestionbankData(getQuestionbankData.getQuestionBanks.qBanks)
      setPageCount(getQuestionbankData.getQuestionBanks.pages)
        setIsLoading(false)
    }
  }, [getQuestionbankData])

  useEffect(() => {
    const debouncedGetData = debounce(() => {
      setIsLoading(true)
      // if (search.length >= 3 || search === '') {
        let obj = {
          offset: offset,
          limit: limit,
          query: search,
        }
        dispatch(getQuestionBank(obj))
      // }
    }, 300) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }
  }, [dispatch, offset, limit, search])

  useEffect(() => {
    const totalQTime = selectedQBank.reduce((total, question) => {
      return total + question.totalQDurationTime
    }, 0)

    const totalScore = selectedQBank.reduce((total, question) => {
      return total + question.totalScore
    }, 0)

    setTotalAssessmentTime(totalQTime)
    setTotalAssessmentScore(totalScore)
  }, [selectedQBank])

  // set state for search
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  // Increase number of question Count
  const handleAddCount = (id, totalQuestions, timealloted, totalScore) => {
    setSelectedQBank((prevSelected) => {
      const updatedSelectedQBank = [...prevSelected]
      const index = updatedSelectedQBank.findIndex(
        (selected) => selected.questionBanksId === id
      )

      if (index >= 0 && index < updatedSelectedQBank.length) {
        const selectedQuestion = updatedSelectedQBank[index]

        if (selectedQuestion) {
          const newCount = selectedQuestion.count
            ? selectedQuestion.count + 1
            : 1
          const newTotalQDurationTime =
            newCount * selectedQuestion.questionTime || 0
          const qBankScore = totalScore / totalQuestions
          const newScore = newCount * qBankScore || 0

          // count by total number of questions
          if (newCount <= totalQuestions) {
            updatedSelectedQBank[index] = {
              ...selectedQuestion,
              count: newCount,
              totalQDurationTime: newTotalQDurationTime,
              totalScore: newScore,
            }
          }
        }
      }

      return updatedSelectedQBank
    })
  }

  // Decrease number of question Count
  const handleDecreaseCount = (id) => {
    setSelectedQBank((prevSelected) => {
      const updatedSelectedQBank = [...prevSelected]

      const index = updatedSelectedQBank.findIndex(
        (selected) => selected.questionBanksId === id
      )
      const selectedQuestion = updatedSelectedQBank[index]

      if (selectedQuestion && selectedQuestion.count > 1) {
        updatedSelectedQBank[index] = {
          ...selectedQuestion,
          count: selectedQuestion.count - 1,
          totalQDurationTime:
            (selectedQuestion.count - 1) * selectedQuestion.questionTime || 0,
          totalScore:
            selectedQuestion.totalScore -
              selectedQuestion.totalScore / selectedQuestion.count || 0,
        }
      }

      return updatedSelectedQBank
    })
  }

  return (
    <div className="p_five font ">
      <div className="w-full flex flex-col md:flex-row justify-between ">
        <div className="flex items-center border rounded-lg px-3 shadow-sm bg-white mt-2 md:mt-0">
          <div>
            <BiSearch className="text-lg" />
          </div>
          <div>
            <input
              type="text"
              data-testid="search-input"
              placeholder="Search"
              value={search}
              className="bg-white w-full sm:w-64 px-3 py-1 sm:mb-0 border-none focus:border-none focus:outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-2 md:ml-2 py-1 border-1 bg-white shadow-sm border-gray-100 rounded text-center md:w-72">
          <span className="text-color font text-sm xl:text-md font-semibold">
            {' '}
            Total Assessment <span className="text-gray-600">Time : </span>
            {totalAssessmentTime} min{' '}
          </span>
        </div>

        <div className="mt-2 md:ml-2 py-1 border-1 bg-white shadow-sm border-gray-100 rounded text-center md:w-72">
          <span className="text-color font text-sm xl:text-md font-semibold">
            {' '}
            Total Assessment <span className="text-gray-600">
              Marks :{' '}
            </span>{' '}
            {totalAssessmentScore}
          </span>
        </div>
      </div>

      <div className="row mt-3">
        {isLoading ? (
          <div className='h-[25vh] flex justify-center items-center'>
            <div
              className="spinner-border text-primary "
            ></div>
          </div>
        ) : (
          questionBankData &&
          questionBankData?.map((value, index) => (
            <div className="col-sm-4 mt-3" key={index}>
              <div className="block max-w-sm px-6 pt-2 pb-3 border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-white">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold lg:text-md xl:text-md">
                    {value.qBankName}
                  </p>
                  {selectedQBank.some(
                    (selected) => selected.questionBanksId === value._id
                  ) ? (
                    <AiOutlineCheck
                      className="text-color text-xl cursor-pointer font-bold"
                      onClick={() =>
                        handleUnselectedQBank(value._id, value.timealloted)
                      }
                    />
                  ) : (
                    <h6
                      data-testid="select-qbank"
                      className="text-color text-xl cursor-pointer font-bold"
                      onClick={() =>
                        handleSelectQBank(
                          value._id,
                          value.qBankName,
                          parseInt(value.questionTime),
                          value.totalScore,
                          value.totalQuestions
                        )
                      }
                    >
                      +
                    </h6>
                  )}
                </div>
                <div className=" text-xs">
                  <div>
                    {showMore === value._id
                      ? value.description
                      : `${value.description.substring(0, 100)}`}
                    <p
                      className="text-color text-xs"
                      onClick={() => handleSeeMore(value._id)}
                    >
                      {showMore === value._id ? 'Show less' : 'Show more'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <label className="text-xs">No. of Question</label>
                  </div>
                  <div>
                    <div className="quantity">
                      <div
                        className="quantity__minus"
                        onClick={() => handleDecreaseCount(value._id)}
                      >
                        <span>-</span>
                      </div>
                      <input
                        name="quantity"
                        type="text"
                        className="quantity__input py-2"
                        value={
                          selectedQBank.find(
                            (selected) => selected.questionBanksId === value._id
                          )?.count || 0
                        }
                        readOnly
                      />
                      <div
                        className="quantity__plus"
                        onClick={() =>
                          handleAddCount(
                            value._id,
                            value.totalQuestions,
                            parseInt(value.questionTime),
                            value.totalScore
                          )
                        }
                      >
                        <span>+</span>
                      </div>
                    </div>
                  </div>

                  {/* <div>
                                    <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 " onClick={() => handleDecreaseCount(value._id)}>-</button>

                                    <input
                                        className="w-10 m-2 text-center text-xs"
                                        type="number"
                                        value={(selectedQBank.find(selected => selected.questionBanksId === value._id)?.count || 0)}
                                        readOnly
                                    />

                                    <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3" onClick={() => handleAddCount(value._id)}>+</button>
                                </div> */}
                </div>

                <div className="flex items-center mt-2">
                  <p className="text-xs">{t('Total time')}:</p>
                  <p className="text-xs ml-2 text-color">
                    {selectedQBank.find(
                      (selected) => selected.questionBanksId === value._id
                    )?.totalQDurationTime || 0}{' '}
                    min
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-xs  ">{t('Total marks')}:</p>
                  <p className="text-xs ml-2 text-color">
                    {selectedQBank.find(
                      (selected) => selected.questionBanksId === value._id
                    )?.totalScore || 0}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {pageCount > 1 && (
        <div className="flex items-end justify-end mt-2">
       
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaAngleRight className="text-[rgb(0,157,255)]" />}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<FaAngleLeft className="text-[rgb(0,157,255)]" />}
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center mt-2"
            pageClassName="px-3 py-1 text-color"
            activeClassName="text-light btn-color rounded-lg"
            disabledClassName="opacity-50 cursor-not-allowed"
            previousClassName="mr-2 px-3 py-2 text-color"
            nextClassName="ml-2  px-3 py-2 text-color"
            breakClassName="mx-2"
            // forcePage={offset-1}
          />
        </div>
      )}

      <div className="flex justify-end items-cenetr w-100 mt-3">
        <button
          className={
            'bg-primary text-white text-xs sm:text-sm font-medium rounded-md px-4 py-1 mr-3'
          }
          data-testid="previous-btn"
          onClick={() => {
            dispatch(handlePrev())
            navigate('/dashboard/createAssessment')
          }}
        >
          {t('previous')}
        </button>
        <button
          type="submit"
          data-testid="next-btn"
          className={
            'bg-primary text-white text-xs sm:text-sm  font-medium rounded-md px-4 py-1'
          }
          onClick={handleSubmit}
        >
          {t('next')}
        </button>
      </div>
    </div>
  )
}

export default SelectAssessment
