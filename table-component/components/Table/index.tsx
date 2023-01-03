import cn from "classnames";

// Local components
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import TableRows from "./TableRows";

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
};

export type CustomRendererType<T, K extends keyof T> = {
  key: K;
  renderer: (value: T[K], row: T) => React.ReactNode;
};

type CommonTableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  customRenderers?: Array<CustomRendererType<T, K>>;
  className?: string;
};

type TableWithActionsColumnProps<T> = {
  actionsColumn?: true;
  actionsColumnRenderer: (row: T) => JSX.Element;
};

type TableWithoutActionsColumnProps = {
  actionsColumn?: false;
  actionsColumnRenderer?: never;
};

type TableWithPaginationProps = {
  pagination?: true;
  paginationProps: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
};

type TableWithoutPaginationProps = {
  pagination?: false;
  paginationProps?: never;
};

type TableProps<T, K extends keyof T> = CommonTableProps<T, K> &
  (TableWithPaginationProps | TableWithoutPaginationProps) &
  (TableWithActionsColumnProps<T> | TableWithoutActionsColumnProps);

const Table = <T, K extends keyof T>({
  data,
  columns,
  customRenderers,
  className,
  actionsColumn,
  actionsColumnRenderer,
  pagination,
  paginationProps,
}: TableProps<T, K>): JSX.Element => {
  return (
    <>
      <div
        className={cn(
          className,
          "overflow-x-auto overflow-y-hidden bg-white rounded-3xl px-4 py-2 styled-scrollbar"
        )}
      >
        <table className="min-w-full">
          <TableHeader columns={columns} actionsColumn={actionsColumn} />
          <TableRows
            data={data}
            columns={columns}
            customRenderers={customRenderers}
            actionsColumn={actionsColumn}
            actionsColumnRenderer={actionsColumnRenderer}
          />
        </table>
      </div>
      {pagination && <TablePagination {...paginationProps} />}
    </>
  );
};

export default Table;
