import { Button, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllShiftAndLeaveQuery, useUpdateMultipulShiftAndLeaveMutation, useUpdateSingleShiftAndLeaveMutation } from '../../features/shiftAndLeave/ShiftAndLeave';

const ShiftRequestModal = ({ visible, onCancel }) => {
  const router = useNavigate();
  const { data, isLoading, refetch } = useGetAllShiftAndLeaveQuery();

  const [rejectAllModalVisible, setRejectAllModalVisible] = useState(false);
  const [approveAllModalVisible, setApproveAllModalVisible] = useState(false);
  const [updateSingleStatus, { isLoading: updateSingleStatusLoading }] = useUpdateSingleShiftAndLeaveMutation();
  const [updatingMultipul, { isLoading: updateMultipulUpdatingLoading }] = useUpdateMultipulShiftAndLeaveMutation();
  const [allIDS, setAllIDS] = useState([]);
  const [processingId, setProcessingId] = useState(null); // Track which single request is being processed

  useEffect(() => {
    if (data?.data?.data) {
      const ids = data.data.data.map(item => item._id);
      setAllIDS(ids);
    }
  }, [data?.data?.data]);

  // Format the API data to match your component's expected structure
  const formatRequestData = (apiData) => {
    if (!apiData) return [];

    return apiData.data?.data
      ?.filter(item => item.status === 'PENDING') // Only show PENDING requests
      ?.map(item => {
        const isVacation = item.requestType === 'VACATION';
        const date = new Date(isVacation ? item.vacationStartDate : item.requestedDate);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return {
          id: item._id,
          employeeName: item.userID?.name,
          date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          day: days[date.getDay()],
          department: item.userID?.departmentID || 'Not specified',
          shiftTime: `${new Date(item.currentShiftID?.shiftStartTime).toLocaleTimeString()} - ${new Date(item.currentShiftID?.shiftEndTime).toLocaleTimeString()}`,
          shiftType: item.currentShiftID?.shiftName,
          requestType: item.requestType === 'VACATION' ? 'Vacation' : 'Shift Change',
          reason: item.reason,
          status: item.status,
          rawData: item // Keep original data for reference
        };
      }) || [];
  };

  const requests = formatRequestData(data);

  const handleReject = async (id) => {
    setProcessingId(id);
    const data = { status: "REJECT" }
    try {
      const response = await updateSingleStatus({ id: id, data: data });
      refetch();
      message.success(response?.data?.message || "Request rejected successfully");
    } catch (error) {
      console.log(error.message);
      message.error(error?.message || "Failed to reject request");
    } finally {
      setProcessingId(null);
    }
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    const data = { status: "APPROVE" }
    try {
      const response = await updateSingleStatus({ id: id, data: data });
      refetch();
      message.success(response?.data?.message || "Request approved successfully");
    } catch (error) {
      console.log(error.message);
      message.error(error?.message || "Failed to approve request");
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectAll = () => {
    setRejectAllModalVisible(true);
  };

  const handleConfirmRejectAll = async () => {
    const status = "REJECT";
    const data = { requestIDs: allIDS, status: status }
    try {
      const response = await updatingMultipul(data);
      refetch();
      message.success(response?.data?.message || "All requests rejected successfully");
    } catch (error) {
      console.log(error);
      message.error(error?.message || "Failed to reject all requests");
    }
    setRejectAllModalVisible(false);
    onCancel();
  };

  const handleApproveAll = () => {
    setApproveAllModalVisible(true);
  };

  const handleConfirmApproveAll = async () => {
    const status = "APPROVE";
    const data = { requestIDs: allIDS, status: status }
    try {
      const response = await updatingMultipul(data);
      refetch();
      message.success(response?.data?.message || "All requests approved successfully");
    } catch (error) {
      console.log(error);
      message.error(error?.message || "Failed to approve all requests");
    }
    setApproveAllModalVisible(false);
    onCancel();
  };

  if (isLoading) {
    return (
      <Modal
        title={<div className="text-lg font-semibold">Loading...</div>}
        open={visible}
        onCancel={onCancel}
        width={500}
        footer={null}
        closeIcon={<div className="text-2xl text-gray-500">×</div>}
      >
        <div className="py-12 flex flex-col items-center justify-center">
          <p className="text-lg text-gray-500 mb-4">Loading requests...</p>
        </div>
      </Modal>
    );
  }

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
                  <div className={`w-3 h-3 rounded-full ${request.status === 'PENDING' ? 'bg-[#00087A]' : 'bg-red-500'
                    }`}></div>
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

                      <h3 className="text-lg font-semibold mb-2">
                        {request.requestType === 'Vacation' ? 'Vacation Dates' : 'Apply Shift'}
                      </h3>

                      {request.requestType === 'Vacation' ? (
                        <>
                          <p className="mb-1">From: {new Date(request.rawData.vacationStartDate).toLocaleDateString()}</p>
                          <p className="mb-1">To: {new Date(request.rawData.vacationEndDate).toLocaleDateString()}</p>
                          <p className="mb-3">Total Days: {request.rawData.totalDays}</p>
                        </>
                      ) : (
                        <>
                          <p className="mb-1">
                            {new Date(request.rawData.requestedShiftID.shiftStartTime).toLocaleTimeString()} -
                            {new Date(request.rawData.requestedShiftID.shiftEndTime).toLocaleTimeString()}
                          </p>
                          <p className="mb-3">{request.rawData.requestedShiftID.shiftName}</p>
                        </>
                      )}

                      <p className="mb-3">Reason: {request.reason}</p>

                      <div className="flex justify-between gap-2">
                        <Button
                          type="primary"
                          danger
                          className="w-1/2"
                          loading={processingId === request.id && updateSingleStatusLoading}
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          type="primary"
                          className="w-1/2 bg-[#336C79] hover:bg-teal-700"
                          loading={processingId === request.id && updateSingleStatusLoading}
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
                loading={updateMultipulUpdatingLoading}
              >
                Reject All
              </Button>
              <Button
                type="primary"
                className="w-1/3 bg-[#336C79] hover:bg-[#336C79]"
                onClick={handleApproveAll}
                loading={updateMultipulUpdatingLoading}
              >
                Approve All
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center">
            <p className="text-lg text-gray-500 mb-4">No pending requests available</p>
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
              disabled={updateMultipulUpdatingLoading}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmRejectAll}
              className="w-1/2 h-12 rounded-md border bg-red-500 text-white hover:border-red-500"
              size="large"
              loading={updateMultipulUpdatingLoading}
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
              disabled={updateMultipulUpdatingLoading}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmApproveAll}
              className="w-1/2 h-12 rounded-md bg-gradient-to-r from-[#336C79] to-[#2A9D8F] text-white hover:from-[#2A9D8F] hover:to-[#336C79]"
              size="large"
              loading={updateMultipulUpdatingLoading}
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