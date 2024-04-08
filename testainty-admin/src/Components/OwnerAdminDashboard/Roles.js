import { useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../Store/commonSlice';
import debounce from 'lodash.debounce';


const Roles = () => {
  const dispatch = useDispatch()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const pageCount = 0
  const listOfRoles = useSelector((state) => state.roles)

  const handleRowClick = () => {}

  useEffect(() => {
    const debouncedGetData = debounce(() => {
      dispatch(getRole());
    }, 0); 

    debouncedGetData(); // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel(); // Cancel any pending API call on cleanup
    };
  }, [dispatch]);

    
  useEffect(() => {
    setLoading(true)
    if (listOfRoles && listOfRoles.data && listOfRoles.data.data) {
      const data = listOfRoles.data.data;
      setRoles(data)
      setLoading(false)
    }
  }, [listOfRoles])

  const columns = [
    { Header: 'Name', accessor: 'roleName' },
    { Header: 'Type', accessor: 'roleType' },
    // {
    //     Header: 'Action',
    //     accessor: 'action',
    //     Cell: () => (
    //        <>
    //         <button className="px-3 py-1 rounded-md text-black"><RiDeleteBin6Line></RiDeleteBin6Line></button>
    //        </>
    //     ),
    // },
  ];

  return (
    <>
      <div className={`px-4 md:p-6 font py-5 ${roles?.length > 9 ? 'h-auto main-bg': '' }`}>
        {loading? (<div className="spinner-border text-primary absolute top-50 z-1" data-testid="loader" style={{left: '50%'}}></div>):( <></>)}
        <h3 className="text-sm lg:text-xl xl:text-xl font-semibold mb-4">Role List</h3>
        <DataTable columns={columns} data={roles} handleRowClick={handleRowClick} pageCount={pageCount} />
      </div>
    </>
  )
}

export default Roles;