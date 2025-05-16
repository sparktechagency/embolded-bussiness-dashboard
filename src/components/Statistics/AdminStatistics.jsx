import React from 'react';

const AdminStatistics = () => {
  return (
     <div className="border border-primary rounded-lg p-3">
          <div className="w-full rounded-xl flex flex-col gap-3">
            <div className="flex  justify-between items-center">
              <h2 className="text-2xl font-semibold">Statistics</h2>
              <h3 className='border border-primary px-2 py-1.5 select-none rounded'>Last 7 Days</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="border border-primary w-full rounded-xl p-4 ">
                  <div className=" font-medium text-2xl mb-2">Total Institution</div>
                  <div className="text-xl font-bold text-gray-800">50</div>
                </div>

                <div className="border border-primary w-full rounded-xl p-4 ">
                  <div className=" font-medium text-2xl mb-2">Total Department</div>
                  <div className="text-xl font-bold text-gray-800">300</div>
                </div>
              </div>

              <div className="border border-primary rounded-xl p-4 ">
                <div className=" font-medium text-2xl mb-2">Total App User</div>
                <div className="text-xl font-bold text-gray-800">1000</div>
              </div>

              <div className="border border-primary rounded-xl p-4 ">
                <div className=" font-medium text-2xl mb-2">Subscription Status</div>
                <div className="text-xl font-bold text-gray-800">7days Remaining</div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default AdminStatistics;