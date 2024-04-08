import { useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getSkills } from '../../Store/userSlice';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import DeleteModal from '../Modal/DeleteModal';
import debounce from 'lodash.debounce';
import Loader from '../Loader';
import '../../App.css'

const Skills = () => {
  const dispatch = useDispatch()
  const [skill, setSkill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0)
  const [offset, setOffset] = useState(1)
  const [skillId, setSkillId] = useState(null)
  const [isShow, setIsShow] = useState(false)
  const listOfSkills = useSelector((state) => state.user.skills)
  const limit = 10
    
  useEffect(() => {
    const debouncedGetData = debounce(() => {
      const obj = {
        offset: offset,
        limit: limit
      }
      dispatch(getSkills(obj))
    }, 0); // Example debounce with 300ms delay

    debouncedGetData(); // Initial call

    return () => {
      // Cleanup function
      // This will be called before the next effect is executed or when the component unmounts
      debouncedGetData.cancel(); // Cancel any pending API call on cleanup
    };
  }, [dispatch, offset]);


  useEffect(() => {
    setLoading(true);
    if (listOfSkills && listOfSkills.skills) {
      const data = listOfSkills?.skills;
      setSkill(data);
      setPageCount(listOfSkills.pages)
      setLoading(false);
    }else{
      setLoading(false);
    }
  }, [listOfSkills])


  const handlePageClick = (page) => {
    setOffset(page.selected + 1)
  }

  const handleRowClick = () => { }

  const handleDelete = (skillId) => {
    setSkillId(skillId)
    setIsShow(!isShow)
  }


  const columns = [
    { Header: 'Name', accessor: 'skillName' },
    {
      Header: 'Action',
      accessor: 'action', disableSortBy: true,
      Cell: ({ row }) => (
        <div className="flex justify-center items-center">
          {/* <button className=" py-1 rounded-md text-black "><FiEdit ></FiEdit></button> */}
          <button className=" px-3 py-1 rounded-md text-red-600"><RiDeleteBin6Line onClick={() => handleDelete(row.original._id)} /></button>
        </div>
      ),
    },
  ]

  if(loading){
    return(
      <Loader />
    )
  }
  return (
    <>
      <div className={`p_five main-bg font ${skill?.length > 9 ? 'h-auto': 'h-screen' }`}>
        <div className="flex justify-between">
          <h3 className="text-base lg:text-xl xl:text-xl font-semibold ">Skills</h3>
          <div>
            <div className="flex justify-center sm:px-12 ">
              <Link to="/skills/createSkills"> <img src="../assets/images/crt.png" className="w-20" alt='' title='Create Skill' /></Link>
              {/* <span className="absolute top-10 scale-0 rounded border-1 border-gray-400  p-1 text-xs text-black group-hover:scale-100">Create Skill</span> */}
            </div>
            {/* <Link to="/skills/createSkills">
                            <button className=" text-sm p-2 btn-color hover:bg-[rgb(144,179,31)] text-white rounded-md">Create Skills</button>
                            </Link> */}
          </div>
        </div>
        <DataTable columns={columns} data={skill} handlePageClick={handlePageClick} pageCount={pageCount} handleRowClick={handleRowClick} offset={offset}/>
        <DeleteModal isOpen={isShow} setIsOpen={setIsShow} data={{ skillId: skillId }} />
      </div>
    </>
  )
}

export default Skills;





