import { FaAngleLeft, FaAngleRight } from 'react-icons/fa/index.js';
import { GoSortAsc, GoSortDesc } from 'react-icons/go/index.js';
import ReactPaginate from 'react-paginate';
import { useTable, usePagination, useSortBy } from 'react-table';

const DataTable = ({ columns, data, handlePageClick, pageCount, handleRowClick, isLoading, offset }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false, // Don't auto reset the page
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      {isLoading? (
        <>
           <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600 absolute top-48 z-1 flex justify-center items-center" style={{ left: '50%' }} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">loading</span>
        </>
      ) : ( <div className="mt-4 font shadow-md rounded-lg bg-white overflow-x-auto overflow-y-hidden ">
    
      <table {...getTableProps()} className="w-full border-collapse border border-gray-300 table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map((column, index) => (
                <th key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 py-2 text-left font-semibold text-gray-800 t-headings"
                 
                >
                  <div className={`flex ${index === 0 || column.render('Header') === 'Email' ? 'justify-start items-start' : 'justify-center items-center'}`}>
                    <div>{column.render('Header')}</div>
                    <div className='ml-2 mt-1'>
                      {!column.disableSortBy && (
                        <span>
                          {column.isSorted ? <GoSortAsc /> : <GoSortDesc />}
                        </span>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(row.original)}>
                  {row.cells.map((cell) => {
                    return (
                      <td key={`${row.id}-${cell.column.id}`} {...cell.getCellProps()} className="px-3 py-2 text-xs sm:text-xs lg:text-sm md:text-sm xl:text-sm 2xl:text-sm border-t border-gray-300">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                <p className="text-gray-800 text-xs sm:text-xs lg:text-base md:text-sm xl:text-base 2xl:text-base">
                  No records found.
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pageCount > 1 && (
        <div className="flex items-end justify-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FaAngleRight className='text-[rgb(0,157,255)]' />}
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
            forcePage={offset-1} 

          />
        </div>
      )}
    </div>)}
   
    </>
  );
};

export default DataTable;
