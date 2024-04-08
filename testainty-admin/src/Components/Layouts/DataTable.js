import { GoSortAsc, GoSortDesc } from 'react-icons/go/index.js'
import ReactPaginate from 'react-paginate'
import { useTable, usePagination, useSortBy } from 'react-table'
import '../../App.css'

const DataTable = ({
  columns,
  data,
  handlePageClick,
  pageCount,
  handleRowClick,
  offset,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        autoResetPage: false, // Don't auto reset the page
        initialState: { pageIndex: 0 },
      },
      useSortBy,
      usePagination
    )

  return (
    <div className="mt-4 font shadow-md rounded-lg bg-white overflow-x-auto overflow-y-hidden">
      <table
        {...getTableProps()}
        className="w-full border-collapse border border-gray-300 table-auto"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-100"
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 py-2 text-left font-semibold t-headings text-gray-800"
                >
                  <div
                    className={`flex ${
                      index === 0 || column.render('Header') === 'Email'
                        ? 'justify-start items-start'
                        : 'justify-center items-center'
                    }`}
                  >
                    <div>{column.render('Header')}</div>
                    <div className="ml-2 mt-1">
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
          {data?.length ? (
            page.map((row) => {
              prepareRow(row)
              return (
                <tr
                  key={row.id}
                  {...row.getRowProps()}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={`${row.id}-${cell.column.id}`}
                        {...cell.getCellProps()}
                        className="px-3 py-2 text-xs sm:text-xs lg:text-sm md:text-sm xl:text-sm 2xl:text-sm border-t border-gray-300"
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
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
        <div className="flex justify-end w-full">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center mt-4 mr-4"
            pageClassName="px-3 py-2 text-blue-600"
            activeClassName="btn-color hover:bg-[rgb(144,179,31)] text-white"
            disabledClassName="opacity-50 cursor-not-allowed"
            previousClassName="mr-2 border px-3 py-2"
            nextClassName="ml-2 border px-3 py-2"
            breakClassName="mx-2"
            forcePage={offset - 1}
          />
        </div>
      )}
    </div>
  )
}

export default DataTable
