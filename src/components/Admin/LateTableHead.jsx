import React from "react";
import LateTableBody from "./LateTableBody";

const LateTableHead = ({ columns }) => {
  // Complete demo data with all required fields
  const data = [
    {
      id: 1,
      EmployeeId: "124564",
      EmployeeName: "Dr. John Doe",
      Institution: "Brookwood Baptist Health",
      Department: "Spark tech",
      ShiftSchedule: "9:00 AM - 5:00 PM",
      Day:  "30min",
      status: "Active"
    },
    {
      id: 2,
      EmployeeId: "124564",
      EmployeeName: "Dr. John Doe",
      Institution: "Brookwood Baptist Health",
      Department: "Spark tech",
      ShiftSchedule: "9:00 AM - 5:00 PM",
      Day: "30min",
      status: "Active"
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className="grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {data.length > 0 ? (
            data.map((item , index) => (
              <LateTableBody item={item} key={item.id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default LateTableHead;