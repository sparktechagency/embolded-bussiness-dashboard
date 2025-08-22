import { Pagination, Spin } from 'antd';
import { useState } from 'react';
import { useGetAllDesignationQuery } from '../../features/Designation/designationApi';
import RoleTableBody from './RoleTableBody';

const RoleTableHead = ({ columns, institutions, departments, searchTerm }) => {
  console.log(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: designation, isLoading } = useGetAllDesignationQuery({
    page: currentPage,
    searchTerm: searchTerm,
  });

  const data = designation?.data?.data || [];
  const meta = designation?.data?.meta || {
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
        <div className={`grid grid-cols-7 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? <div className="py-10 text-center"><Spin size='small' /></div> : data?.length > 0 ? (
            data?.map((item, index) => (
              <RoleTableBody
                item={item}
                key={item._id}
                list={index + 1}
                institutions={institutions}
                departments={departments}
              />
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

export default RoleTableHead;