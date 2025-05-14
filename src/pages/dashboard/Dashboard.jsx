import { Typography } from 'antd';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import AttendanceBarChart from '../../components/Admin/AttendanceBarChart';
import AttendanceChart from '../../components/Admin/AttendanceChart';
import AbsentTableHead from '../../components/Admin/AbsentTableHead';
import LateTableHead from '../../components/Admin/LateTableHead';


const { Title } = Typography;

const ParkingDashboard = () => {




  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</p> */}
          <p style={{ color: '#FF6384' }}>
            <strong>${payload[0].value.toLocaleString()}</strong>
          </p>
        </div>
      );
    }
    return null;
  };


  const AbSentTableHead = [
    "SL",
    "Employee ID",
    "Employee Name",
    "Institution",
    "Department",
    "Shift Schedule",
    "Day",
    "Account Status",
  ]

  const LateTableHeadCollumn = [
    "SL",
    "Employee ID",
    "Employee Name",
    "Institution",
    "Department",
    "Shift Schedule",
    "Late Min",
    "Account Status",
  ]

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AttendanceChart />
        <AttendanceBarChart />
        {/* Statistics Card */}
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

        {/* Today's Entry */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Today’s Absent</h2>

            </div>
            <div className='p-2'>
              <AbsentTableHead columns={AbSentTableHead} />
            </div>
          </div>
        </div>

        {/* Today's Exit */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="px-4 py-3  flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Today’s Late</h2>
            </div>
            <div className='p-2'>
              <LateTableHead columns={LateTableHeadCollumn} />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingDashboard;