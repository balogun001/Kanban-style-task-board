import { Fragment, ReactNode } from 'react';
import {
  flexRender,
  Row,
  RowData,
  Table as ReactTable,
} from '@tanstack/react-table';
import Image from 'next/image';

import { BodyText } from './Text';

type TableProps<T extends RowData> = {
  table: ReactTable<T>;
  isLoading?: boolean;
  emptyState?: ReactNode;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
};

export const TableLoading = ({ colSpan }: { colSpan: number }) => (
  <>
    {[1, 2, 3, 4, 5].map((val) => (
      <Fragment key={val}>
        <tr className="bg-white">
          <td
            className="text-brand-textBlack w-max max-w-full px-4 py-6 text-left text-sm"
            colSpan={colSpan}
          />
        </tr>
        <tr className="bg-gray-50">
          <td
            className="text-brand-textBlack w-max max-w-full px-4 py-6 text-left text-sm"
            colSpan={colSpan}
          />
        </tr>
      </Fragment>
    ))}
  </>
);

export const EmptyTableState = ({ message }: { message?: string }) => (
  <div className="flex flex-col py-20 sm:py-44">
    <Image
      alt="image empty states"
      className="mx-auto h-32 w-32"
      height={32}
      src="/empty.svg"
      width={32}
    />
    <BodyText className="mt-3 text-center text-sm text-brand-orange-800">
      {message || 'No data available'}.
    </BodyText>
  </div>
);

export const Table = <T extends RowData>({
  table,
  isLoading,
  emptyState = <EmptyTableState />,
  renderSubComponent,
}: TableProps<T>) => {
  const isEmpty = table.options.data?.length === 0;
  const colSpan = table.options.columns.length;

  return (
    <div className="relative block w-full overflow-x-auto overflow-y-visible pb-20 align-middle">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup?.id}>
              {headerGroup?.headers?.map((header) => (
                <th
                  className="th border-b bg-gray-50 bg-opacity-75 p-4 text-left text-sm font-medium"
                  key={header?.id}
                  scope="col"
                >
                  {header?.isPlaceholder
                    ? null
                    : flexRender(
                        header?.column?.columnDef?.header,
                        header?.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {isLoading ? (
            <TableLoading colSpan={colSpan} />
          ) : isEmpty ? (
            <>
              <tr>
                <td
                  className="mx-auto w-full py-12 text-center"
                  colSpan={colSpan}
                >
                  {emptyState}
                </td>
              </tr>
            </>
          ) : (
            <>
              {table?.getRowModel()?.rows?.map((row) => (
                <>
                  <tr className="sm:even:bg-gray-50" key={row?.id}>
                    {row?.getVisibleCells()?.map((cell) => (
                      <td
                        className="text-brand-textBlack w-max max-w-full   overflow-visible p-4 text-left text-sm"
                        key={cell?.id}
                      >
                        {flexRender(
                          cell?.column?.columnDef?.cell,
                          cell?.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && renderSubComponent && (
                    <tr>
                      <td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
