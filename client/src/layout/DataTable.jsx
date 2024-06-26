import { useEffect, useState } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

import ArrowLeftIcon from '@/../public/icons/arrows/arrow-left-icon';
import ArrowRightIcon from '@/../public/icons/arrows/arrow-right-icon';

const DataTable = ({
  columns,
  data,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30],
}) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    gotoPage,
    setPageSize: setTablePageSize,
    state: { pageIndex, pageCount },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize },
    },
    useSortBy,
    usePagination,
  );

  const handleGoToItems = (items) => {
    const newPageSize = items;
    const newPageIndex = Math.floor((pageIndex * pageSize) / newPageSize);
    setTablePageSize(newPageSize);
    gotoPage(newPageIndex);
  };

  useEffect(() => {
    setTablePageSize(pageSize);
  }, [pageSize, setTablePageSize]);

  const pageButtons = [];
  for (let i = 0; i < pageCount; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => gotoPage(i)}
        className={`page-button ${pageIndex === i ? 'active' : ''}`}
      >
        {i + 1}
      </button>,
    );
  }

  return (
    <>
   <div className="table-responsive">
  <table {...getTableProps()} className="table table-borderless table-hover table-bordered">
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className="light-text-custom-color"
            >
              {column.render('Header')}
              <span>
                {column.isSorted
                  ? column.isSortedDesc
                    ? ' 🔽'
                    : ' 🔼'
                  : ''}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {
        prepareRow(row);
        return (
          <tr key={i} className="user alert-danger" {...row.getRowProps()}>
            {row.cells.map((cell, i) => (
              <td key={i} {...cell.getCellProps()} className="text-secondary">
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


      <div className="pagination bg-light d-flex justify-content-between py-4">
        <div>
          <span className="mx-2 light-text-custom-color ">
            Showing{' '}
            <strong>
              {pageIndex * pageSize + 1} to{' '}
              {Math.min((pageIndex + 1) * pageSize, data.length)} of{' '}
              {data.length}
            </strong>{' '}
            entries
          </span>
        </div>

        <div className="d-flex align-items-center gap-5">
          <div className="d-flex align-items-center">
            <span className="light-text-custom-color">
              Display:{' '}
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={pageSize}
                onChange={(e) => {
                  const items = e.target.value
                    ? Number(e.target.value)
                    : pageSizeOptions[0];
                  handleGoToItems(items);
                }}
                className="p-2 border border-secondary rounded-1"
              />
            </span>
          </div>

          <div className="d-flex align-items-center px-3">
            <button
              className="prev-button rounded-1 border-0"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ArrowLeftIcon />
            </button>

            <div className="mx-2">{pageButtons.length}</div>

            <button
              className="next-button rounded-1 border-0"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;