import PropTypes from "prop-types";

import Status from "../BasicComponents/Status/Status";
import "./tablecomponent.css";

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  internships: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
};

function TableComponent({ columns, internships, dataKeys }) {
  return (
    <>
      <div className="items-center space-x-2 ">
        <table className="table-auto w-full text-center ">
          <tr>
            {columns.map((item) => {
              return (
                <th className="" key={item}>
                  {item}
                </th>
              );
            })}
          </tr>

          {internships.map((internship) => {
            return (
              <tr className="border" key={internship.id}>
                <td>2020</td>
                <td className="flex items-center justify-center">
                  <Status status={true} type="demande" />
                </td>
                <td>2020</td>
                <td>2020</td>
                <td>2020</td>
                <td>2020</td>
                <td>2020</td>
                {/* {dataKeys.map((dataKey) => (
                  <td className="bg-blue-200 flex items-center justify-center" key={dataKey}>
                    {internship[dataKey]}
                  </td>
                ))} */}
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default TableComponent;
