import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Link, useLocation, useNavigate } from "react-router-dom";

import StatusFilter from "../StatusFilter";
import ParkingManagementTableBody from "./ParkingManagementTableBody";



const ParkingManagementTableHead = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search") || "";
  
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 1);
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Complete demo data with all required fields
  const demoData = useMemo(() => [
    {
      id: 1,
      SpotName: "Easy Park Spot ",
      location:"Las-Vegas",
      totalParkingSlot:22,
      AvailableSlot:2,
      bookedSlot:18,
      billingType:["DAY", "Week"],
      totalPrice:[25, 100],
      status:"active"
    },
    {
        id: 2,
        SpotName: "Easy Park Spot ",
        location:"Las-Vegas",
        totalParkingSlot:22,
        AvailableSlot:2,
        bookedSlot:18,
        billingType:["DAY", "Week"],
        totalPrice:[25, 100],
        status:"active"
      },
      {
        id: 3,
        SpotName: "Easy Park Spot ",
        location:"Las-Vegas",
        totalParkingSlot:22,
        AvailableSlot:2,
        bookedSlot:18,
        billingType:["DAY", "Week"],
        totalPrice:[25, 100],
        status:"active"
      },
      {
        id: 4,
        SpotName: "Easy Park Spot ",
        location:"Las-Vegas",
        totalParkingSlot:22,
        AvailableSlot:2,
        bookedSlot:18,
        billingType:["DAY", "Week"],
        totalPrice:[25, 100],
        status:"active"
      },
  ], []);

  // Items per page and pagination calculation
  const itemsPerPage = 10;

  // Filter data based on search value and month filter
  const filteredData = useMemo(() => {
    let result = [...demoData];
    
    // Apply search filter
    if (searchValue) {
      const lowerCaseSearch = searchValue.toLowerCase();
      result = result.filter(item => 
        item.SpotName.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply month filter
    if (selectedMonth !== "All") {
      result = result.filter(item => 
        item.startDate.includes(selectedMonth) || 
        item.endDate.includes(selectedMonth)
      );
    }
    
    return result;
  }, [demoData, searchValue, selectedMonth]);

  // Calculate pagination based on filtered data
  const totalDemoItems = filteredData.length;
  const totalPages = Math.ceil(totalDemoItems / itemsPerPage);

  // Paginate the filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  // Debounce search handling with cleanup
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      queryParams.set("search", value);
      if (value === "") {
        queryParams.delete("search");
      }
      queryParams.set("page", "1");
      navigate(`?${queryParams.toString()}`, { replace: true });
    }, 500),
    [navigate, queryParams]
  );

  // Clean up debounce on unmount
  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [debouncedSearch]);

  // Update URL when page changes
  // useEffect(() => {
  //   setIsFetching(true);
  //   queryParams.set("page", currentPage);
  //   navigate(`?${queryParams.toString()}`, { replace: true });

  //   const timer = setTimeout(() => setIsFetching(false), 300);
  //   return () => clearTimeout(timer);
  // }, [currentPage, navigate, queryParams]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to generate pagination buttons dynamically
  const renderPaginationButtons = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) pages.push(1, "...");

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...", totalPages);
    }

    return pages;
  };

  const statusFilter = [
    { value: "All", label: "All Months" },
    { value: "Waiting" },
    { value: "Ongoing" },
    { value: "Completed" },
    { value: "Returned" },
    { value: "Late Returned" }
  ];

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Search and Filter */}
        <div className="flex justify-end items-center gap-3">
          <div className="flex gap-4">
            <StatusFilter 
              status
              options={statusFilter}
              defaultValue="All"
              onChange={handleMonthChange}
              placeholder="Status Filter"
              style={{ width: 200 }}
            />
          </div>
          <Link
              to="/create-new-park"
              className="px-7 py-2 font-semibold text-white rounded-md bg-primary"
            >
              Create New Parking spot
            </Link>
        </div>

        {/* Header */}
        <div className="grid grid-cols-12 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
          <div className="col-span-3 py-3 font-semibold">Action</div>
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {demoData.length > 0 ? (
            demoData.map((item) => (
              <ParkingManagementTableBody item={item} key={item.id} list={item.length + 1 } />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-4">
            <button
              className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
              disabled={currentPage === 1 || isFetching}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>

            {renderPaginationButtons().map((button, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 border rounded ${button === currentPage ? "bg-primary text-white" : "hover:bg-gray-200"} ${isFetching ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (button !== "...") handlePageChange(button);
                }}
                disabled={isFetching || button === "..."}
              >
                {button}
              </button>
            ))}

            <button
              className={`px-4 py-2 mx-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
              disabled={currentPage === totalPages || isFetching}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingManagementTableHead;