import PropTypes from "prop-types";

import "./tablecomponent.css";

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  internships: PropTypes.array.isRequired,
  dataKeys: PropTypes.array.isRequired,
};

function TableComponent({ columns, internships, dataKeys }) {
  return (
    <>
      <div className="flex flex-row items-center space-x-2 ">
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              {columns.map((item) => {
                return <th key={item}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {internships.map((internship) => {
              return (
                <tr className="requestelement" key={internship.id}>
                  {dataKeys.map((dataKey) => {
                    return <td key={dataKey}>{internship[dataKey]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableComponent;
