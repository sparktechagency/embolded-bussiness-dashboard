import { Pagination } from 'antd';
import { useState } from 'react';
import { useGetAllCredentialsQuery } from '../../features/LoginCredentials/LoginCredentialsApi';
import LoginCredentialTableBody from "./LoginCredentialTableBody";

const LoginCredentialTableHead = ({ columns, filterValue }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: userCredentials } = useGetAllCredentialsQuery({

    page: currentPage,
    role: filterValue === null || filterValue.label === "All Types" ? "" : filterValue?.value,
  });


  // Extract data and meta from response
  const data = userCredentials?.data?.data || [];
  const meta = userCredentials?.data?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1
  };

  // Handle page change
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
          {data.length > 0 ? (
            data.map((item, index) => (
              <LoginCredentialTableBody item={item} key={item._id} list={index + 1} />
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

export default LoginCredentialTableHead;