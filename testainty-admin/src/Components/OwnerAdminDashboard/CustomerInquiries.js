import { useCallback, useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable';
import { useDispatch, useSelector } from 'react-redux';
// import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocation, useNavigate } from 'react-router-dom';
// import DeleteModal from "../Modal/DeleteModal";
import debounce from 'lodash.debounce';
import { customerInquiries } from '../../Store/userSlice';
// import Switch from "react-switch";
import { MdOutlineCancel } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { formatedDate } from '../../Utils';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeleteModal from '../Modal/DeleteModal';
import Loader from '../Loader';

const CustomerInquiries = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation()
  const [customersList, setCustomersList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(state? state : 1)
  const [isShow, setIsShow] = useState(false)
  const [inquiryId, setInquiryId] = useState(null)
  const [search, setSearch] = useState('')
  const customerInquiry = useSelector((state) => state.user)
  const limit = 10
  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  console.log('state', state)
  console.log('offset', offset)

  useEffect(() => {
    setLoading(true)
    const obj = {
      limit,
      offset,
      query: search
    }
    const debouncedGetData = debounce(() => {

      dispatch(customerInquiries(obj))
    }, 0); // Example debounce with 300ms delay

    debouncedGetData(); // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel(); // Cancel any pending API call on cleanup
    };


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset])

  useEffect(() => {
    if (customerInquiry && customerInquiry.customerInquiryData && customerInquiry.customerInquiryData.customers) {
      setCustomersList(customerInquiry.customerInquiryData.customers)
      setPageCount(customerInquiry.customerInquiryData.pages)
      setLoading(false)
    }

  }, [customerInquiry.customerInquiryData])

  const handleRowClick = (data) => {
    const { _id } = data;
    navigate('/customerInquiries/CustomerInquiryDetails/' + _id, {state: offset})
  }


  const handleDelete = (event, inquiryId) => {
    event.stopPropagation();
    setInquiryId(inquiryId)
    setIsShow(!isShow)
  }

  const columns = [
    {
      Header: 'Name', accessor: 'name',
      Cell: ({ row }) => (
        <>
          <span className="no-underline cursor-pointer">{row.original.name}</span>
        </>
      ),
    },
    {
      Header: 'Email', accessor: 'email',
      Cell: ({ row }) => (
        <>
          <span className="no-underline cursor-pointer">{row.original.email}</span>
        </>
      ),
    },
    {
      Header: 'Date', accessor: 'createdAt',
      Cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          {formatedDate(row.original.createdAt)}
        </div>
      ),
    },

    {
      Header: 'Verified', accessor: 'verified',disableSortBy: true,
      Cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          <div className="mx-0 group sm:px-1" onClick={(event) => event.stopPropagation()}>
            {row.values?.verified === 1 ? (<AiFillCheckCircle className="text-success text-lg" />) : (<MdOutlineCancel className="text-danger text-lg" />)}
            <span className="absolute z-10 top-75 scale-0 rounded border-1 bg-light border-gray-400 p-1 text-xs text-black group-hover:scale-100">{row.values?.verified === 1 ? 'Verified' : 'Unverified'}</span>
          </div>

        </div>
      ),
    },
    {
      Header: 'Action', accessor: '',disableSortBy: true,
      Cell: ({ row }) => (
          <div className="flex justify-center items-center">
            <RiDeleteBin6Line onClick={(event) => handleDelete(event, row.original._id)} className=" cursor-pointer text-red-600" />
          </div>
      ),
    },
       
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchRes = useCallback(
    debounce(async (query) => {
      try {
        const obj = {
          offset: offset,
          limit: 10,
          query: query
        }
        dispatch(customerInquiries(obj))
      } catch (error) {
        console.error('Error performing search:', error);
      }
    }, 0),
    []
  );

  useEffect(() => {
    if (search !== '') {
      searchRes(search)
    }else{
      searchRes('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  if(loading){
    return (
      <Loader />
    )
  }

  return (
    <>
      <div className={`p_five main-bg h-screen ${customersList?.length > 9 ? 'h-auto ': 'h-screen' }`}>
        <h3 className="text-base lg:text-xl xl:text-xl font-semibold mb-4 font">Inquiries</h3>
        <div className="flex sm:flex-row justify-between items-start w-full">
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
        </div>
        <DataTable columns={columns} data={customersList} handlePageClick={handlePageClick} pageCount={pageCount} handleRowClick={handleRowClick} offset={offset} />
        <DeleteModal isOpen={isShow} setIsOpen={setIsShow} data={{ inquiryId: inquiryId }} />
      </div>
    </>
  )
}

export default CustomerInquiries;