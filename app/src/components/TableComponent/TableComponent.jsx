import "./tablecomponent.css";

function TableComponent(props /* columns, data */) {
  const dataKeys = props.dataKeys;

  return (
    <>
      <div className="flex flex-row items-center space-x-2 ">
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              {props.columns.map((item, index) => {
                return (
                  <th key={index}>{item}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {props.data.map((val, key) => {
              return (
                <tr className={`requestelement`} key={key}>
                  {dataKeys.map(dataKey => {
                    return (
                      <td key={dataKey}>{val[dataKey]}</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableComponent;