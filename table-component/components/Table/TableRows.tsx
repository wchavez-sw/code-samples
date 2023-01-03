import { ColumnDefinitionType, CustomRendererType } from "@components/Table";

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  customRenderers?: Array<CustomRendererType<T, K>>;
  actionsColumn?: boolean;
  actionsColumnRenderer?: (row: T) => JSX.Element;
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
  customRenderers,
  actionsColumn,
  actionsColumnRenderer,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => (
    <tr key={`row-${index}`}>
      {columns.map((column, index2) => {
        const customRender = customRenderers?.find(
          (cr) => cr.key === column.key
        );

        if (customRender) {
          return (
            <td className="px-4 py-4 text-xs md:text-sm" key={`cell-${index2}`}>
              {customRender.renderer(row[customRender.key], row)}
            </td>
          );
        }

        return (
          <td className="px-4 py-4 text-xs md:text-sm" key={`cell-${index2}`}>
            {row[column.key] as JSX.Element}
          </td>
        );
      })}

      {actionsColumn && (
        <td className="px-4 py-4 text-xs md:text-sm">
          {actionsColumnRenderer && actionsColumnRenderer(row)}
        </td>
      )}
    </tr>
  ));

  return <tbody>{rows}</tbody>;
};

export default TableRows;
