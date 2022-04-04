import { FunctionComponent, useEffect, useState } from "react";
import Dropdown from "./Dropdown";

interface IProps {
  name: string;
  data?: any;
  filterOptions?: { label: string; value: string }[];
  onFilterChange?: (value: number) => void;
  columns: { label: string; key: string; onClick?: (value: any) => void }[];
  pageLength?: number;
}

const FilteredTable: FunctionComponent<IProps> = ({
  name,
  data,
  columns,
  filterOptions,
  pageLength = 10,
  onFilterChange,
}) => {
  const pages = Math.ceil(data.length / pageLength);

  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setPaginatedData(data.slice(pageLength * (page - 1), pageLength * page));
  }, [page, data]);

  const orderData = (key: string) => {
    setOrder(order === "asc" ? "desc" : "asc");

    setPaginatedData(
      paginatedData.sort((a, b) => {
        if (order === "asc") {
          return a[key] > b[key] ? 1 : -1;
        }
        return a[key] < b[key] ? 1 : -1;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-white rounded shadow-md p-4 font-light text-gray-700">
      <h1 className="font-bold">{name}</h1>
      {filterOptions && onFilterChange && (
        <Dropdown
          options={filterOptions}
          onChange={(key) => onFilterChange(key.value)}
        />
      )}
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                onClick={() => orderData(column.key)}
                className="text-left p-2 text-orange-500 cursor-pointer"
                key={column.key}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row: any, index) => {
            return (
              <tr className="py-2" key={index}>
                {columns.map((column, index) => (
                  <td
                    onClick={() =>
                      column.onClick && column.onClick(row[column.key])
                    }
                    key={index}
                    className={`p-2 border-b border-gray-100 ${
                      column.onClick
                        ? "cursor-pointer text-orange-500 hover:text-orange-700"
                        : ""
                    }`}
                  >
                    {row[column.key].toString()}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {data.length > pageLength && (
        <ul className="flex flex-row gap-1 w-full justify-center">
          {Array.from({ length: pages }).map((_, index) => (
            <li
              key={index}
              className="rounded-md shadow-md w-12 bg-orange-300 text-center text-white font-bold p-1 cursor-pointer hover:bg-orange-500"
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredTable;
