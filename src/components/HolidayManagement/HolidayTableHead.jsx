import { Pagination, Spin } from 'antd';
import { useState } from 'react';
import { useGetAllHolidayQuery } from '../../features/holiday/holidayApi';
import HolidayTableBody from "./HolidayTableBody";


const HolidayTableHead = ({ columns, filterValue }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: HolidayData, isLoading } = useGetAllHolidayQuery({
    holidayType: filterValue === null || filterValue.label === "All Types" ? "" : filterValue?.label,
  });
  const Holiday = HolidayData?.data?.data || [];
  const paginationInfo = HolidayData?.data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg space-y-3">
        {/* Header */}
        <div className={`grid grid-cols-8 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? <div className="py-10 text-center"><Spin size='small' /></div> : Holiday.length > 0 ? (
            Holiday.map((item, index) => (
              <HolidayTableBody item={item} key={item._id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={paginationInfo.total}
            pageSize={paginationInfo.limit}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total) => `Total ${total} employees`}
          />
        </div>
      </div>
    </div>
  );
};

export default HolidayTableHead;