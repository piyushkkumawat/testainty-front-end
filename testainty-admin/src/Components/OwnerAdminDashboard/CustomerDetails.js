import { useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable';
import { useDispatch } from 'react-redux';
import { updateSuperAdmin } from '../../Store/userSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiConstants } from '../../Constants/api.constant';
import { commonService } from '../../Services/common.services';
import DataNotFound from '../404/DataNotFound';
import { formatedDate } from '../../Utils';
import debounce from 'lodash.debounce';
import SwitchButton from '../Common/SwitchButton';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import '../../App.css'


const CustomerDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null)
  const [superAdminList, setSuperAdminList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(1)
  const [isError, setIsError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const limit = 10;
  const handleStatusChange = (event, data) => {
    const obj = {
      userId: data._id,
      status: event.target.checked
    }
    const tempArrList = [...superAdminList]
    const updatedTempArrList = tempArrList.map(customerData => {
      if (customerData._id === data._id) {
        if (event.target.checked) {
          return { ...customerData, status: 1 };
        } else {
          return { ...customerData, status: 0 };
        }
      }
      return customerData;
    });
    setSuperAdminList(updatedTempArrList)
    dispatch(updateSuperAdmin(obj))
  }

  const columns = [
    { Header: 'Name', accessor: 'firstName' },
    { Header: 'Email', accessor: 'email' },
    {
      Header: 'Joining date', accessor: 'activated_on',
      Cell: ({ row }) => (
        <div className='flex justify-center items-center'>{formatedDate(row.original?.activated_on)}</div>
      )
    },
    {
      Header: 'Status', accessor: 'status',
      Cell: ({ row }) => (
        <div className='flex justify-center items-center' onClick={(e) => e.stopPropagation()}>
          {/* <Switch onChange={(status) => handleStatusChange(row.original, status)} checked={row.original.status === 1 ? true : false} /> */}
          <SwitchButton data={row.original} status={row?.original?.status} handleStatusChange={handleStatusChange} />
        </div>
      )
    },
  ];

  useEffect(() => {
    setIsLoading(true)
    const obj = {
      customerId: id,
      offset: offset,
      limit: limit
    };

    const getData = async () => {
      try {
        const response = await commonService.withToken(apiConstants.GET_SUPERADMIN_BYCID, obj);

        if (response?.data) {
          setCustomerData(response?.data?.customerData);
          setSuperAdminList(response?.data?.superadmins);
          setPageCount(response?.data?.pages)
          setIsLoading(false)
        }
        if (!response?.data?.status) {
          setIsError(response?.data?.message);
        }
        return response;
      } catch (error) {
        // Handle error
        setIsError('Error fetching data');
      }
    };

    const debouncedGetData = debounce(getData, 0); // Example debounce with 300ms delay

    debouncedGetData(); // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel(); // Cancel any pending API call on cleanup
    };
  }, [id, offset]);


  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleRowClick = () => { }

  const handleBackClick = () => {
    navigate('/dashboard', {state: state})
  }

  return (
    <>
      <div className={`main-bg p_five font ${superAdminList?.length > 9 ? 'h-auto': 'h-screen'}`}>
        {isLoading ? (<div className="spinner-border text-primary absolute top-50 z-1" style={{ left: '50%' }}></div>) : (<></>)}

        {isError ? (<DataNotFound />)
          :
          <>
           <IoArrowBackCircleOutline className='mb-2 text-3xl cursor-pointer' onClick={handleBackClick}/>
            <h3 className="text-sm lg:text-xl xl:text-xl font-bold mb-4 font ">Customer Details</h3>
            <div className='flex flex-col md:flex-row mt-4 rounded bg-white shadow-md'>
              <div className='w-full md:w-1/2 px-3 pt-3'>
                <div className='row '>
                  <div className='col-4 font-semibold text-xs md:text-base'>
                    <p>Name :</p>
                    <p>Email :</p>
                    <p>Plan :</p>
                  </div>
                  <div className='col-8 text-xs md:text-base'>
                    <p>{customerData?.customerName}</p>
                    <p>{customerData?.email}</p>
                    <p>{customerData?.plan}</p>
                  </div>
                </div>
              </div>

              <div className='w-full md:w-1/2  px-3 pt-3'>
                <div className='row'>
                  <div className='col-4 font-semibold text-xs md:text-base'>
                    <p>Organisation Id:</p>
                    <p>Start Date :</p>
                    <p>Expire Date :</p>
                  </div>
                  <div className='col-8 text-xs md:text-base'>
                     <p>{customerData?.orgId}</p>
                    <p>{formatedDate(customerData?.planStart)}</p>
                    <p>{formatedDate(customerData?.planEnd)}</p>
                  </div>
                </div>
              </div>
            </div>


            {/* 
                        <div className="grid grid-cols-2 gap-2 mx-auto mt-4 justify-start items-start">
                            <div className="mb-2 ">
                                <label className="block text-xs sm:text-sm xl:text-lg font-medium text-gray-700">Customer Name:</label>
                                <p className="mt-1 block w-full text-xs sm:text-sm xl:text-lg">
                                    {customerData?.customerName}
                                </p>
                            </div>

                            <div className="mb-2">
                                <label className="block text-xs sm:text-sm xl:text-lg font-medium text-gray-700">Email:</label>
                                <p className="mt-1 block w-full text-xs sm:text-sm xl:text-lg">
                                    {customerData?.email}
                                </p>
                            </div>

                            <div className="mb-2">
                                <label className="block text-xs sm:text-sm xl:text-lg font-medium text-gray-700">Plan:</label>
                                <p className="mt-1 block w-full text-xs sm:text-sm xl:text-lg">
                                    {customerData?.plan}
                                </p>
                            </div>

                            <div className="mb-2">
                                <label className="block text-xs sm:text-sm xl:text-lg font-medium text-gray-700">Start Date:</label>
                                <p className="mt-1 block w-full text-xs sm:text-sm xl:text-lg ">
                                    {customerData?.planStart}
                                </p>
                            </div>

                            <div className="mb-2">
                                <label className="block text-xs sm:text-sm xl:text-lg font-medium text-gray-700">Expire Date:</label>
                                <p className="mt-1 block w-full text-xs sm:text-sm xl:text-lg ">
                                    {customerData?.planEnd}
                                </p>
                            </div>
                        </div> */}
            <h5 className="text-sm lg:text-xl xl:text-xl font-semibold mt-4">Super Admins</h5>
            <DataTable columns={columns} data={superAdminList} pageCount={pageCount} handlePageClick={handlePageClick} handleRowClick={handleRowClick} offset={offset}/>
          </>
        }
      </div>
    </>
  )
}

export default CustomerDetails


