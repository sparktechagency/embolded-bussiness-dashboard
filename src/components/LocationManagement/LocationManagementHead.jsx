import { Pagination, Spin } from 'antd';
import { useState } from 'react';
import { useGetAllLocationQuery } from '../../features/location/locationApi';
import LocationManagementBody from "./LocationManagementBody";

const LocationManagementHead = ({ columns, status, selectedInstitution }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: allLocation, isLoading } = useGetAllLocationQuery({
    page: currentPage,
    institutionName: selectedInstitution === null || selectedInstitution.label === "All Institutions" ? "" : selectedInstitution?.label,
    status: status === null || status.label === "Select Status" ? "" : status?.value
  });

  const employees = allLocation?.data?.data || [];
  const paginationInfo = allLocation?.data?.meta || {
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
      {/* Inner container (forces horizontal scroll on small screen) */}
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg space-y-3">

        {/* Header */}
        <div className="grid grid-cols-9 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary">
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center whitespace-nowrap">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? (
            <div className="py-10 text-center"><Spin size='small' /></div>
          ) : employees?.length > 0 ? (
            employees.map((item, index) => (
              <LocationManagementBody item={item} key={item.id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>

        {/* Pagination */}
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


export default LocationManagementHead;