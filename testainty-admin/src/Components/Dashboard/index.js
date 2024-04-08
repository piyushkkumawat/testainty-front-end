import { useCallback, useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { searchCustomer, updateCustomer } from '../../Store/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import debounce from 'lodash.debounce';
import { BsPersonAdd } from 'react-icons/bs';
import { formatedDate } from '../../Utils/index';
import { toast } from 'react-toastify';
import SwitchButton from '../Common/SwitchButton';
import Loader from '../Loader';
import '../../App.css'


const Dashboard = () => {
  const users = useSelector((state) => state.user.customerListData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [userDataList, setUserDataList] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(state? state: 1)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const limit = 10

  useEffect(() => {
    setIsLoading(true)
    if (users && users.customers) {
      setUserDataList(users?.customers)
      setPageCount(users?.pages)
      setIsLoading(false)
    }
  }, [users])

  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate('/dashboard/updateCustomerForm/' + id)
  }

  const handleAddAdmin = (event, id) => {
    event.stopPropagation();
    navigate('/dashboard/addSuperAdminForm/' + id)
  }
  const handleRowClick = (data) => {
    const { _id } = data;
    navigate('/dashboard/customerDetails/' + _id, {state: offset});
  }

  const handleStatusChange = (event, data) => {
    if (data.status === 2) {
      toast.error('Kindly upgrade customer plan first.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const obj = {
        customerId: data._id,
        status: event.target.checked ? 1 : 0
      }
      const tempArrList = [...userDataList]
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
      setUserDataList(updatedTempArrList)
      dispatch(updateCustomer(obj))
    }

  }

  const columns = [
    { Header: 'Name', accessor: 'customerName' },
    { Header: 'Email', accessor: 'email' },
    {
      Header: 'Plan', accessor: 'plan', Cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          {row.original.plan ? row.original.plan : 'NA'}
        </div>
      )
    },
    {
      Header: 'Start Date', accessor: 'planStart',
      Cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          {formatedDate(row.original.planStart)}
        </div>
      )
    },
    {
      Header: 'Expire Date', accessor: 'planEnd',
      Cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          {formatedDate(row.original.planEnd)}
        </div>
      )
    },
    {
      Header: 'Status', accessor: 'status', disableSortBy: true,
      Cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()} className='flex justify-center items-center'>
          {/* <Switch onChange={(status) => handleStatusChange(row.original, status)} checked={row.original.status === 1 ? true : false} /> */}

          <SwitchButton data={row.original} status={row?.original?.status} handleStatusChange={handleStatusChange} />

          {/* <Switch onChange={(status) => handleStatusChange(row.original, status)} checked={row.original.status === 1 ? true : false} offColor={row.original.status === 2 ? "#4299e1" : "#7c7c7c"} /> */}
        </div>
      )
    },
    {
      Header: 'Action',
      accessor: 'action', disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex justify-center items-center ">
          <button onClick={(event) => handleEdit(event, row.original._id)} className="text-lg text-black"><FiEdit></FiEdit></button>
          {/* <div>
                        <button onClick={(event) => handleAddAdmin(event, row.original._id)} className="bg-[rgb(164,199,61)] hover:bg-[rgb(144,179,31)] px-2 py-1 text-sm rounded-md text-white relative left-3 btn-color ">+SuperAdmin</button>
                    </div> */}
          <div className="flex justify-center z-0">
            <BsPersonAdd className="text-xl text-primary cursor-pointer ml-2" onClick={(event) => handleAddAdmin(event, row.original._id)} title='+SuperAdmin'/>
            {/* <span className="absolute z-1000  mt-6 scale-0 rounded border-1 border-gray-400 bg-white p-1 text-xs text-black group-hover:scale-100">+SuperAdmin</span> */}
          </div>
        </div>
      ),
    },
  ];


  useEffect(() => {
    const debouncedGetData = debounce(() => {
      const obj = {
        offset: offset,
        limit: limit,
        query: ''
      }
      dispatch(searchCustomer(obj))
    }, 0); // Example debounce with 300ms delay

    debouncedGetData(); // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel(); // Cancel any pending API call on cleanup
    };
  }, [dispatch, offset]);

  const handleShowForm = () => {
    navigate('/dashboard/createCustomerForm')
  }

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchRes = useCallback(
    debounce(async (query) => {
      try {
        const obj = {
          offset: offset,
          limit: limit,
          query: query
        }
        dispatch(searchCustomer(obj))
      } catch (error) {
        console.error('Error performing search:', error);
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (search.length > 0 || search === '') {
      debouncedSearchRes(search);
    }
  }, [search, debouncedSearchRes]);

  if(isLoading){
      return (
        <Loader />
      )
  }

  return (
    <>
      <div className={`font p_five w-full main-bg ${userDataList?.length > 9 ? 'h-auto ': 'h-screen' }`}>
        {/* {isLoading ? (<div className="spinner-border text-primary absolute top-50 z-1" style={{ left: '50%' }}></div>) : (<></>)} */}
        <h3 className="text-base	 lg:text-xl xl:text-xl font-semibold mb-4 placeholder:text-sm">Customers</h3>
        <div className="flex justify-between items-center">
          <div>
            <input
              type="text"
              data-testid="search-input"
              placeholder="Search..."
              value={search}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md sm:mb-0 placeholder:text-xs sm:placeholder:text-sm"
              onChange={handleSearch}
            />
          </div>

          <div className="">
            {/* <button className="px-6 py-2 btn-color hover:bg-[rgb(144,179,31)] text-white rounded-md" onClick={handleShowForm}> */}
            <div className="flex justify-center sm:px-12">
              <img src='../assets/images/crt.png' data-testid="create-btn" className="w-20 cursor-pointer " onClick={handleShowForm} alt='' title='Create customer' />
              {/* <FaPlusCircle className="text-primary text-2xl lg:text-3xl cursor-pointer" data-testid="create-btn" onClick={handleShowForm} /> */}
              {/* <span className="absolute top-44 scale-0 rounded border-1 border-gray-400  p-1 text-xs text-black group-hover:scale-100">Create customer</span> */}
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={userDataList} handlePageClick={handlePageClick} pageCount={pageCount} handleRowClick={handleRowClick} offset={offset}/>
      </div>
    </>
  )
}

export default Dashboard