import RequestTableBody from "./RequestTableBody";


const RequestTableHead = ({ columns, data }) => {
  // Complete demo data with all required fields


  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className={`grid grid-cols-10 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {data.length > 0 ? (
            data.map((item, index) => (
              <RequestTableBody item={item} key={item.id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button className="bg-red-500 px-3 py-2 rounded text-xs  text-white ">Reject All</button>
          <button className="bg-primary px-3 py-2 rounded text-xs text-white ">Approve All</button>
        </div>
      </div>
    </div>
  );
};

export default RequestTableHead;