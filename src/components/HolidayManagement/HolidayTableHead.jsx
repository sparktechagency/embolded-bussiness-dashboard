import React from "react";
import HolidayTableBody from "./HolidayTableBody";


const HolidayTableHead = ({ columns , data }) => {
  // Complete demo data with all required fields
 

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className={`grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-SurfacePrimary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-SurfacePrimary">
          {data.length > 0 ? (
            data.map((item , index) => (
              <HolidayTableBody item={item} key={item.id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default HolidayTableHead;