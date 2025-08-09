import { useGetAbesntsQuery } from '../../features/dashboardOverView/dashboardApi';
import AbsentTableBody from "./AbsentTableBody";

const AbsentTableHead = ({ columns }) => {
  const { data: absent, isLoading } = useGetAbesntsQuery();

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className="grid grid-cols-7 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? (
            <div className="py-10 text-center">Loading...</div>
          ) : absent?.length > 0 ? (
            absent.map((item, index) => (
              <AbsentTableBody item={item} key={item._id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbsentTableHead;