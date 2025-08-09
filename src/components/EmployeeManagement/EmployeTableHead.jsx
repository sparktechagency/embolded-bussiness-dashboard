import { Pagination } from 'antd';
import { useState } from 'react';
import { useGetAllEmployeeQuery } from '../../features/EmployeeManagement/employeeManagementApi';
import EmployeTableBody from "./EmployeTableBody";

const EmployeTableHead = ({ columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: employeeData, isLoading } = useGetAllEmployeeQuery(currentPage);

  const employees = employeeData?.data?.data || [];
  const paginationInfo = employeeData?.data?.meta || {
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-2">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg space-y-3">
        {/* Header */}
        <div className={`grid grid-cols-11 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? "loading..." : employees.length > 0 ? (
            employees.map((item, index) => (
              <EmployeTableBody
                item={item}
                key={item._id}
                list={(currentPage - 1) * paginationInfo.limit + index + 1}
              />
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

export default EmployeTableHead;