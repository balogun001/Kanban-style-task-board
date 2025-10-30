'use client';
import React from 'react';
import { Pagination as ReactPaginate } from 'react-headless-pagination';
//import ReactPaginate from 'react-paginate';
import classNames from 'classnames';

type PaginationProps = {
  onPageChange: (selected: number) => void;
  pageCount: number;
  isLoading?: boolean;
  page: number;
};
export const Pagination = ({
  pageCount,
  onPageChange,
  page,

  isLoading,
}: PaginationProps) => {
  if (pageCount < 2 || isLoading) return null;

  return (
    <ReactPaginate
      className="flex"
      currentPage={page - 1}
      edgePageCount={2}
      middlePagesSiblingCount={2}
      setCurrentPage={(selectedPage) => onPageChange(selectedPage + 1)}
      totalPages={pageCount}
      truncableClassName=""
      truncableText="..."
    >
      <ReactPaginate.PrevButton className="!text-brand-blue flex aspect-square w-8 cursor-pointer  items-center justify-center rounded text-sm">
        {'<'}
      </ReactPaginate.PrevButton>

      <nav className="flex flex-grow justify-center">
        <ul className="flex items-center">
          <ReactPaginate.PageButton
            activeClassName="border !text-brand-blue  border-brand-blue"
            className="flex aspect-square w-8 cursor-pointer  items-center justify-center rounded text-sm text-gray-300"
            inactiveClassName=""
          />
        </ul>
      </nav>

      <ReactPaginate.NextButton className="!text-brand-blue flex aspect-square w-8 cursor-pointer  items-center justify-center rounded text-sm">
        {'>'}
      </ReactPaginate.NextButton>
    </ReactPaginate>
  );
};
