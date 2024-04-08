import { useEffect, useState } from 'react';
import DataTable from '../Layouts/DataTable.js';
import { RiDeleteBin3Fill } from 'react-icons/ri/index.js';
import { BsFillCloudArrowUpFill } from 'react-icons/bs/index.js';
import InviteAdmin from '../Modal/InviteAdmin.js';
import { getAllTeams } from '../../Store/teamsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { BiSearch } from 'react-icons/bi/index.js';
import debounce from 'lodash.debounce';
import DeleteAssessment from '../Modal/DeleteAssessment.js';
import Breadcrumbs from '../Common/Breadcrumbs.js';
import { useTranslation } from 'react-i18next';
import { appConstants } from '../../Constants/app.constant.js';

const Teams = () => {
    const teamsData = useSelector((state) => state.teams);
    // const isLoading = teamsData.loading;
   
    const dispatch = useDispatch();
    const [pageCount, setPageCount] = useState(0);
    const [offset, setOffset] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [teamsList, setTeamsList] = useState([]);
    const [search, setSearch] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [userId, setUserId] = useState(null);
    const { t } = useTranslation();
    const limit = appConstants.LIMIT;
    // Fetch user data from localStorage
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(localStorage.getItem('userData')) : null;

    // Breadcrumb items
    const breadcrumbItems = [
        { label: t('dashboard'), url: '/dashboard' },
        { label: t('team'), url: '/teams' }
    ];

    useEffect(() => {
        // Update component state when teams data changes
        if (teamsData.getAllTeams) {
            setTeamsList(teamsData?.getAllTeams?.users);
            setPageCount(teamsData?.getAllTeams?.pages);
        }
    }, [teamsData?.getAllTeams]);

    useEffect(() => {
        const debouncedGetData = debounce(()=> {
            if (search.length >= 3 || search === '') {
                let obj = {
                    offset: offset,
                    limit: limit,
                    query: search
                };
                dispatch(getAllTeams(obj));
            }
        }, 300); // Example debounce with 300ms delay

        debouncedGetData(); // Initial call

        return () => {
            // Cleanup function
            // This will be called before the next effect is executed or when the component unmounts
            debouncedGetData.cancel(); // Cancel any pending API call on cleanup
        };
    }, [dispatch, offset, limit, search]);

    const handlePageClick = (page) => {
        // Handle pagination click
        setOffset(page.selected + 1);
    }

    const handleInviteLink = (event) => {
        // Handle click on invite link
        event.stopPropagation();
        setIsOpen(!isOpen);
    }

    const handleChange = (e) => {
        // Handle change in the search input
        setSearch(e.target.value);
    }

    const handleRowClick = () => {
        // Handle click on a table row
    }

    const handleDeleteTeams = (event, id) => {
        // Handle click on delete teams
        event.stopPropagation();
        setIsShow(true);
        setUserId(id);
    }

    const columns = [
        { Header: t('name'), accessor: 'firstName' },
        { Header: t('email'), accessor: 'email',
            Cell: ({ row }) => (
                   <div className='flex items-center justify-start'>{row.original?.email} </div>
            )
        },
        {
            Header: t('role'), accessor: 'role',
            Cell: ({ row }) => (
                // Display role information
                <div className='flex items-center justify-center'>{row.original?.rolearr?.roleName} </div>
            )
        },
        {
            Header: t('action'),
            accessor: 'inviteCandidates',
            disableSortBy: true,
            Cell: ({ row }) => {
                if (userData && userData.UserId && row.original?._id !== userData.UserId && userData.role?.roleName === 'SuperAdmin') {
                    // Display delete icon for SuperAdmin
                    return (
                        <div className='flex items-center justify-center'>
                        <RiDeleteBin3Fill
                            className="text-red-500 text-lg cursor-pointer"
                            onClick={(event) => handleDeleteTeams(event, row.original._id)}
                            title='Delete'
                        />
                      </div>
                    );
                } else {
                    // Return null if conditions are not met
                    return null;
                }
            },
        },
    ];

    // if(isLoading){
    //     return(
    //         <Loader />
    //     )
    // }
    return (
        <>
            <div className={`p_five bgc-color w-full
             ${teamsList?.length > 9 ? 'h-auto': 'screen-height'}`}>
                {/* Breadcrumbs */}
                <Breadcrumbs items={breadcrumbItems} />

                {/* Search and Invite */}
                <div className="flex flex-col justify-start items-start sm:justify-between sm:items-center xs:items-start xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row mt-4">
                    <div className="flex items-center border rounded-lg px-3 shadow-sm bg-white">
                        <div>
                            <BiSearch className="text-lg" />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder={t('search')}
                                data-testid="search-input"
                                value={search}
                                className="bg-white sm:w-64 px-3 py-1 mb-1 sm:mb-0 border-none focus:border-none focus:outline-none "
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center xs:mt-3 sm:mt-0" onClick={(event) => handleInviteLink(event)}>
                        <BsFillCloudArrowUpFill className="text-primary text-lg cursor-pointer mr-2" />
                        <span className="text-primary cursor-pointer" data-testid="inviteAdmin">{t('inviteAdmin')}</span>
                    </div>
                </div>

                {/* Loader or DataTable */}
                <DataTable columns={columns} data={teamsList} handlePageClick={handlePageClick} pageCount={pageCount} handleRowClick={handleRowClick} />

                {/* Modals */}
                <InviteAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
                <DeleteAssessment isOpen={isShow} setIsOpen={setIsShow} data={{ userId: userId }} />
            </div>
        </>
    )
}

export default Teams;
