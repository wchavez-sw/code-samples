import { ColumnDefinitionType } from "@components/Table";

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
  actionsColumn?: boolean;
};

const TableHeader = <T, K extends keyof T>({
  columns,
  actionsColumn,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    return (
      <th
        className="px-4 py-4 text-left text-xs md:text-sm font-bold"
        key={`headCell-${index}`}
      >
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>
        {headers}
        {actionsColumn && (
          <th className="px-4 py-4 text-left text-xs md:text-sm font-bold"></th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
