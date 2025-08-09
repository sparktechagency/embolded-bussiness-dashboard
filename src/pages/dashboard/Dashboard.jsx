import AbsentTableHead from '../../components/Admin/AbsentTableHead';
import AttendanceBarChart from '../../components/Admin/AttendanceBarChart';
import AttendanceChart from '../../components/Admin/AttendanceChart';
import LateTableHead from '../../components/Admin/LateTableHead';
import AdminStatistics from '../../components/Statistics/AdminStatistics';
import DepartmentStatistics from '../../components/Statistics/DepartmentStatistics';


const ParkingDashboard = () => {
  const role = localStorage.getItem("role");


  // useEffect(() => {
  //    const role = localStorage.getItem("role");
  //    if(!role){
  //      window.location.href = "/auth/login";
  //    }
  // }, [role])



  const AbSentTableHead = [
    "SL",
    "Employee ID",
    "Employee Name",
    "Institution",
    "Department",
    "Shift Schedule",
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

        {role === "BUSINESS_OWNER" ? <AdminStatistics /> : <DepartmentStatistics />}

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