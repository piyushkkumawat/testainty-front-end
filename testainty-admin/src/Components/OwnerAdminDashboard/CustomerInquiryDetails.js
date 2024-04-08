import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import debounce from 'lodash.debounce'
import { customerInquiriesDetails } from '../../Store/userSlice'
import { formatedDate } from '../../Utils'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import '../../App.css'

const CustomerInquiryDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()
  const customerInquiry = useSelector((state) => state.user)

  const [customerData, setCustomerData] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  const isLoading = customerInquiry?.loading

  console.log('state', state)

  const handleBackClick = () => {
    navigate('/customerInquiries', { state: state })
  }

  useEffect(() => {
    const obj = {
      customerEnquiryId: id,
    }
    const debouncedGetData = debounce(() => {
      dispatch(customerInquiriesDetails(obj))
    }, 0) // Example debounce with 300ms delay

    debouncedGetData() // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel() // Cancel any pending API call on cleanup
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    // setIsLoading(true)
    if (
      customerInquiry &&
      customerInquiry.customerInquiryDetailsData &&
      customerInquiry.customerInquiryDetailsData.data
    ) {
      setCustomerData(customerInquiry.customerInquiryDetailsData.data)
      // setIsLoading(false)
    }
  }, [customerInquiry, customerInquiry.customerInquiryDetailsData])

  return (
    <>
      <div className="p_five main-bg h-screen">
        {isLoading ? (
          <div
            className="spinner-border text-primary absolute top-50 z-1" style={{ left: '50%' }}>
          </div>
        ) : (
          <></>
        )}

        <div>
          <IoArrowBackCircleOutline
            className="mb-2 text-3xl cursor-pointer"
            onClick={handleBackClick}
            title='Back'
          />
        </div>
        <h3 className="text-base lg:text-xl xl:text-xl font-bold mb-4 font ">
          Inquiry Details
        </h3>
        <div className="flex flex-col md:flex-row mt-4 rounded bg-white shadow-md">
          <div className="w-full  px-3 pt-3">
            <div className="row w-full">
              <div className="col-5 font-semibold text-xs md:text-base">
                <p>Name :</p>
                <p >Email :</p>
                <p>Inquiry Date :</p>
                <p>Messsage :</p>
              </div>
              <div className="col-7 text-xs md:text-base">
                <p>{customerData?.name}</p>
                <p className='overflow-x-auto'>{customerData?.email}</p>
                <p>{formatedDate(customerData?.createdAt)}</p>
                <p>{customerData?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerInquiryDetails
