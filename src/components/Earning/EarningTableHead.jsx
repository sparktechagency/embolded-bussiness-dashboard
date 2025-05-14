import React, { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";

import EarningTableBody from "./EarningTableBody";
import CustomLoading from "../CustomLoading";
import StatusFilter from "../StatusFilter";

const EarningTableHead = ({ columns }) => {
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
      ReservationID: "#123456",
      userName: "Alice Johnson",
      email: "alice@example.com",
      phoneNumber: "+1234567890",
      location: "New York",
      VehiclesType: "Car",
      VehiclesVIN: "123456789",
      BillingType: "Day",
      startDate: "Feb 28, 2025",
      endDate: "Mar 07, 2025",
      totalPrice: 250,
      paid: true,
      adminRevenue: 10,
      parkingSlot: 4,
      paymentMethod: "Credit Card",
      transactionId: "txn_123456",
      totalDays: 7,
      remainingDays: 3
    },
    {
      id: 2,
      ReservationID: "#789012",
      userName: "Bob Smith",
      email: "bob@example.com",
      phoneNumber: "+987654321",
      location: "Los Angeles",
      VehiclesType: "SUV",
      VehiclesVIN: "987654321",
      BillingType: "Week",
      startDate: "Mar 01, 2025",
      endDate: "Mar 08, 2025",
      totalPrice: 350,
      paid: true,
      adminRevenue: 15,
      parkingSlot: 2,
      paymentMethod: "PayPal",
      transactionId: "txn_789012",
      totalDays: 7,
      remainingDays: 5
    },
    {
      id: 3,
      ReservationID: "#345678",
      userName: "Charlie Brown",
      email: "charlie@example.com",
      phoneNumber: "+456789123",
      location: "Chicago",
      VehiclesType: "Truck",
      VehiclesVIN: "456789123",
      BillingType: "Month",
      startDate: "Feb 15, 2025",
      endDate: "Mar 15, 2025",
      totalPrice: 800,
      paid: false,
      adminRevenue: 40,
      parkingSlot: 7,
      paymentMethod: "Bank Transfer",
      transactionId: "txn_345678",
      totalDays: 28,
      remainingDays: 10
    },
    {
      id: 4,
      ReservationID: "#901234",
      userName: "Diana Prince",
      email: "diana@example.com",
      phoneNumber: "+321654987",
      location: "Seattle",
      VehiclesType: "Motorcycle",
      VehiclesVIN: "321654987",
      BillingType: "Day",
      startDate: "Mar 05, 2025",
      endDate: "Mar 06, 2025",
      totalPrice: 50,
      paid: true,
      adminRevenue: 5,
      parkingSlot: 1,
      paymentMethod: "Credit Card",
      transactionId: "txn_901234",
      totalDays: 1,
      remainingDays: 0
    }
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
        item.ReservationID.toLowerCase().includes(lowerCaseSearch) ||
        item.userName.toLowerCase().includes(lowerCaseSearch) ||
        item.VehiclesVIN.toLowerCase().includes(lowerCaseSearch)
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

  const monthOptions = [
    { value: "All", label: "All Months" },
    { value: "January" },
    { value: "February" },
    { value: "March" },
    { value: "April" },
    { value: "May" },
    { value: "June" },
    { value: "July" },
    { value: "August" },
    { value: "September" },
    { value: "October" },
    { value: "November" },
    { value: "December" },
  ];

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Search and Filter */}
        <div className="flex justify-end items-center">
          <div className="flex gap-4">
            <StatusFilter 
            status
              options={monthOptions}
              defaultValue="All"
              onChange={handleMonthChange}
              placeholder="Filter by Month"
              style={{ width: 200 }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">{column}</div>
          ))}
          <div className="col-span-2 py-3 font-semibold">Action</div>
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {demoData.length > 0 ? (
            demoData.map((item) => (
              <EarningTableBody item={item} key={item.id} />
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

export default EarningTableHead;