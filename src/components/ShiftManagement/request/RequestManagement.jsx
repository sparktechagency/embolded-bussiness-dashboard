// RequestManagement.js
import RequestTableHead from './RequestTableHead';

function RequestManagement() {
  const holidayColumns = [
    "Date",
    "Employee Name",
    "Department",
    "Request Type",
    "Vacation Date",
    "Days",
    "Current Shift",
    "Apply Shift",
    "Status",
    "Action"
  ];

  return (
    <div className="flex flex-col gap-7">
      <div onClick={() => window.history.back()} className='w-8 h-8 cursor-pointer'>
        <img src="/icons/PageBack.png" alt="" />
      </div>
      <RequestTableHead columns={holidayColumns} />
    </div>
  );
}

export default RequestManagement;