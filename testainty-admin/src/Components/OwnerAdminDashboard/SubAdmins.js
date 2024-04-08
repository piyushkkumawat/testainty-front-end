import { useCallback, useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { getSubAdmins } from '../../Store/userSlice';
import { Link } from 'react-router-dom';
import DeleteModal from '../Modal/DeleteModal';
import debounce from 'lodash.debounce';
import Loader from '../Loader';
import '../../App.css'

const SubAdmins = () => {
  const dispatch = useDispatch()
  const [subAdminsList, setSubAdminsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(1)
  const [isShow, setIsShow] = useState(false)
  const [search, setSearch] = useState('')
  const [subAdminId, setSubAdminId] = useState(null)
  const subAdmins = useSelector((state) => state.user)
  const limit = 10
    
  useEffect(() => {
    if (subAdmins && subAdmins.subAdminsData && subAdmins.subAdminsData.subadmins) {
      setSubAdminsList(subAdmins.subAdminsData.subadmins)
      setPageCount(subAdmins.subAdminsData.pages)
      setLoading(false)
    }

  }, [subAdmins])

  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }


  useEffect(() => {
    setLoading(true)
    const debouncedGetData = debounce(() => {
      const obj = {
        limit,
        offset,
        search
      }
      dispatch(getSubAdmins(obj))
    }, 0); // Example debounce with 300ms delay

    debouncedGetData(); // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel(); // Cancel any pending API call on cleanup
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, offset]);

  const handleRowClick = () => {
    // const { _id } = data;
    // navigate('/questionBank/questionsDetails/' + _id)
  }


  const handleDelete = (event, subAdminId) => {
    event.stopPropagation();
    setSubAdminId(subAdminId)
    setIsShow(!isShow)
  }

  const columns = [
    {
      Header: 'Name', accessor: 'firstName',
      Cell: ({ row }) => (
        <>
          <span className="no-underline cursor-pointer">{row.original.firstName + ' ' + row.original.lastName}</span>
        </>
      ),
    },
    // { Header: 'Role Type', accessor: 'role' },
    {
      Header: 'Email', accessor: 'email',
      Cell: ({ row }) => (
        <>
          <span className="no-underline cursor-pointer">{row.original.email}</span>
        </>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action', disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <RiDeleteBin6Line onClick={(event) => handleDelete(event, row.original._id)} className="cursor-pointer text-red-600" />

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
        dispatch(getSubAdmins(obj))
      } catch (error) {
        console.error('Error performing search:', error);
      }
    }, 500),
    []
  );

    
  useEffect(() => {
    if (search !== '') {
      searchRes(search)
    }else{
      searchRes('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search])

  if(loading){
    return (
      <Loader />
    )
  }


  return (
    <>
      <div className={`p_five main-bg ${subAdminsList?.length > 9 ? 'h-auto': 'h-screen' }`}>
        <h3 className="text-base lg:text-xl xl:text-xl font-semibold mb-4 font">Authors</h3>
              
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
          <div className="flex justify-center sm:px-12 ">
            <Link to="/subAdmins/addSubAdmins" data-testid="create-btn"> <img src="../assets/images/crt.png" className="w-20" alt='' title='+ Create Author' /></Link>
            {/* <span className="absolute top-10 scale-0 rounded border-1 border-gray-400  p-1 text-xs text-black group-hover:scale-100">+ Create Author</span> */}
          </div>
          {/* <div className="mx-0 group flex justify-center sm:px-12">
                        <Link to="/subAdmins/addSubAdmins">
                        <img src="../assets/images/crt.png" className="w-20"/>
                            </Link>
                        <span className="absolute top-24 scale-0 rounded border-1 border-gray-400 p-1 text-xs text-black group-hover:scale-100">+ Sub Admins</span>
                    </div> */}
          {/* <div className="ml-auto px-4">
                        <div>
                            <Link to="/questionBank/addQuestionBank"><button className=" text-sm p-2 btn-color hover:bg-[rgb(144,179,31)] text-white rounded-md">+ Add Question Bank</button></Link>
                        </div>
                    </div> */}
        </div>

        <DataTable columns={columns} data={subAdminsList} handlePageClick={handlePageClick} pageCount={pageCount} handleRowClick={handleRowClick} offset={offset}/>
        <DeleteModal isOpen={isShow} setIsOpen={setIsShow} data={{ subAdminId: subAdminId }} />
      </div>
    </>
  )
}

export default SubAdmins;