import { Pagination, Spin } from 'antd';
import { useState } from 'react';
import { useGetAllDepartmentQuery } from '../../features/instituteManagement/DepartmentManagementApi';
import DepertmentTableBody from "./DepertmentTableBody";


const DepertmentTableHead = ({ columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: departmentData, isLoading } = useGetAllDepartmentQuery(currentPage);
  const data = departmentData?.data?.data || [];
  const meta = departmentData?.data?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };




  return (
    <div className="">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg space-y-3">
        {/* Header */}
        <div className={`grid grid-cols-6 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
          {/* <h3 className="py-3 font-semibold text-center col-span-2">Action</h3> */}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? (
            <div className="py-10 text-center"><Spin size='small' /></div>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <DepertmentTableBody item={item} key={item.id} list={index + 1} />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <Pagination
            current={meta.page}
            total={meta.total}
            pageSize={meta.limit}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total) => `Total ${total} items`}
          />
        </div>
      </div>
    </div>
  );
};

export default DepertmentTableHead;