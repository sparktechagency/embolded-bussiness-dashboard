import { Button, message, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShiftRequestModal = ({ visible, onCancel }) => {
  const router = useNavigate();
  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: "Dr. John Doe",
      date: "April 21, 2025",
      day: "Monday",
      department: "Clinical Department",
      shiftTime: "9:00 AM - 5:15 PM",
      shiftType: "Morning",
      requestType: "Vacation",
      reason: "Your Current Reason for changes the shift"
    },
    {
      id: 2,
      employeeName: "Dr. John Doe",
      date: "April 21, 2025",
      day: "Monday",
      department: "Clinical Department",
      shiftTime: "9:00 AM - 5:15 PM",
      shiftType: "Morning",
      requestType: "Vacation",
      reason: "Your Current Reason for changes the shift"
    }
  ]);
  const [rejectAllModalVisible, setRejectAllModalVisible] = useState(false);
  const [approveAllModalVisible, setApproveAllModalVisible] = useState(false);

  const handleReject = (id) => {
    setRequests(requests.filter(request => request.id !== id));
    message.success('Request rejected successfully');
  };

  const handleApprove = (id) => {
    setRequests(requests.filter(request => request.id !== id));
    message.success('Request approved successfully');
  };

  const handleRejectAll = () => {
    setRejectAllModalVisible(true);
  };

  const handleConfirmRejectAll = () => {
    setRequests([]);
    message.success('All requests rejected');
    setRejectAllModalVisible(false);
    onCancel();
  };

  const handleApproveAll = () => {
    setApproveAllModalVisible(true);
  };

  const handleConfirmApproveAll = () => {
    setRequests([]);
    message.success('All requests approved');
    setApproveAllModalVisible(false);
    onCancel();
  };

  return (
    <>
      <Modal
        title={<div className="text-lg font-semibold">Today (<span className="text-purple-700">0{requests.length}</span>)</div>}
        open={visible}
        onCancel={onCancel}
        width={500}
        footer={null}
        closeIcon={<div className="text-2xl text-gray-500">×</div>}
      >
        {requests.length > 0 ? (
          <>
            <div className="flex flex-col space-y-4 max-h-[600px] overflow-y-auto pb-4">
              {requests.map((request) => (
                <div key={request.id} className='flex items-start justify-between gap-3'>
                  <div className='w-3 h-3 rounded-full bg-[#00087A]'></div>
                  <div className="border w-full border-gray-200 rounded-lg p-4 bg-white">

                    <h2 className="text-lg font-semibold mb-2">Current Shift</h2>

                    <div className="mb-2">
                      <p className="mb-1">Employee Name: {request.employeeName}</p>

                      <div className="flex justify-between mb-1">
                        <p>{request.date}</p>
                        <p className="font-medium">{request.day}</p>
                      </div>

                      <p className="mb-1">{request.department}</p>

                      <div className="flex justify-between mb-1">
                        <p>{request.shiftTime}</p>
                        <p className="font-medium">{request.shiftType}</p>
                      </div>

                      <p className="mb-3">Request Type: {request.requestType}</p>

                      <h3 className="text-lg font-semibold mb-2">Apply Shift</h3>

                      <p className="mb-1">{request.shiftTime}</p>

                      <p className="mb-3">{request.reason}</p>

                      <div className="flex justify-between gap-2">
                        <Button
                          type="primary"
                          danger
                          className="w-1/2"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          type="primary"
                          className="w-1/2 bg-[#336C79] hover:bg-teal-700"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold">1h</h3>
                </div>
              ))}
            </div>

            <div className="flex justify-between gap-2 mt-4 pt-4 border-t border-gray-200">
              <Button
                onClick={() => router('/shift-management/all-shifts-request')}
                type="default"
                className="w-1/3 bg-[#336C79] text-white hover:bg-teal-700"
              >
                View All
              </Button>
              <Button
                type="primary"
                danger
                className="w-1/3"
                onClick={handleRejectAll}
              >
                Reject All
              </Button>
              <Button
                type="primary"
                className="w-1/3 bg-[#336C79] hover:bg-[#336C79]"
                onClick={handleApproveAll}
              >
                Approve All
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center">
            <p className="text-lg text-gray-500 mb-4">No requests available</p>
            <Button
              onClick={() => router('/shift-management/all-shifts-request')}
              type="default"
              className="bg-[#336C79] text-white hover:bg-teal-700"
            >
              View All Requests
            </Button>
          </div>
        )}
      </Modal>

      {/* Reject All Confirmation Modal */}
      <Modal
        open={rejectAllModalVisible}
        onCancel={() => setRejectAllModalVisible(false)}
        footer={null}
        width={400}
        closeIcon={false}
        centered
        className="rounded-lg"
      >
        <div className="py-4 px-2">
          <h3 className="text-center text-xl font-semibold mb-8">
            Are you sure Reject<br />All Request
          </h3>
          <div className="flex justify-between gap-4">
            <Button
              onClick={() => setRejectAllModalVisible(false)}
              className="w-1/2 h-12 rounded-md border border-[#336C79] text-[#336C79] hover:border-[#336C79] hover:text-[#336C79]"
              size="large"
            >
              No
            </Button>
            <Button
              onClick={handleConfirmRejectAll}
              className="w-1/2 h-12 rounded-md border bg-red-500 text-white hover:border-red-500"
              size="large"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Approve All Confirmation Modal */}
      <Modal
        open={approveAllModalVisible}
        onCancel={() => setApproveAllModalVisible(false)}
        footer={null}
        width={400}
        centered
        closeIcon={false}
        className="rounded-lg"
      >
        <div className="py-4 px-2">
          <h3 className="text-center text-xl font-semibold mb-8">
            Are you sure Approve<br />All Request
          </h3>
          <div className="flex justify-between gap-4">
            <Button
              onClick={() => setApproveAllModalVisible(false)}
              className="w-1/2 h-12 rounded-md border-2 border-[#336C79] text-[#336C79] hover:border-[#336C79] hover:text-[#336C79]"
              size="large"
            >
              No
            </Button>
            <Button
              onClick={handleConfirmApproveAll}
              className="w-1/2 h-12 rounded-md bg-gradient-to-r from-[#336C79] to-[#2A9D8F] text-white hover:from-[#2A9D8F] hover:to-[#336C79]"
              size="large"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShiftRequestModal;