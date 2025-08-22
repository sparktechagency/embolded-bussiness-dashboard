// RequestTableBody.js
import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateSingleShiftAndLeaveMutation } from '../../../features/shiftAndLeave/ShiftAndLeave';

const RequestTableBody = ({ item, list, refetch }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  const [updateSingleStatus, { isLoading }] = useUpdateSingleShiftAndLeaveMutation();
  const router = useNavigate();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setRemoveModalVisible(false);
  };

  const handleApprove = () => {
    setApproveModalVisible(true);
  };

  const handleReject = () => {
    setRejectModalVisible(true);
  };

  const handleConfirmApprove = async () => {
    setProcessingId(item._id);
    try {
      await updateSingleStatus({
        id: item._id,
        data: { status: "APPROVE" }
      }).unwrap();
      refetch();
      setApproveModalVisible(false);
    } catch (error) {
      console.error("Failed to approve:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleConfirmReject = async () => {
    setProcessingId(item._id);
    try {
      await updateSingleStatus({
        id: item._id,
        data: { status: "REJECT" }
      }).unwrap();
      refetch();
      setRejectModalVisible(false);
    } catch (error) {
      console.error("Failed to reject:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    // Handle both time formats: HH:mm and full date strings
    if (timeString.includes('T') || timeString.length > 5) {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // If it's already in HH:mm format
      const date = new Date(`1970-01-01T${timeString}`);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVE':
        return 'bg-green-100';
      case 'REJECT':
        return 'bg-gray-200';
      case 'PENDING':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-10 items-center gap-2 px-2 my-3 text-sm rounded-lg whitespace-nowrap ${getStatusColor(item.status)}`}>
        <div className="flex items-center justify-center py-3">
          {formatDate(item.createdAt)}
        </div>
        <div className="flex items-center justify-center py-3">
          {item?.userID?.name || 'Unknown'}
        </div>
        <div className="flex items-center justify-center py-3">
          {item?.userID?.departmentID?.departmentName || 'N/A'}
        </div>
        <div className="flex items-center justify-center py-3">
          {item?.requestType || 'N/A'}
        </div>
        <div className="flex flex-col gap-1">
          {item?.requestType === 'VACATION' ? (
            <>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Start:</span>
                <span className="p-[2px] border border-primary rounded">
                  {formatDate(item?.vacationStartDate)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">End:</span>
                <span className="p-[2px] ml-[5px] border border-primary rounded">
                  {formatDate(item?.vacationEndDate)}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">N/A</div>
          )}
        </div>
        <div className="flex items-center justify-center py-3">
          {item?.totalDays || 'N/A'}
        </div>
        <div className="flex flex-col gap-1">
          {item?.currentShiftID ? (
            <>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Start:</span>
                <span className="p-[2px] border border-primary rounded">
                  {formatTime(item?.currentShiftID?.shiftStartTime)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">End:</span>
                <span className="p-[2px] ml-[6px] border border-primary rounded">
                  {formatTime(item?.currentShiftID?.shiftEndTime)}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">N/A</div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {item.requestType === 'SHIFT_CHANGE' && item?.requestedShiftID ? (
            <>
              <div className="flex items-center gap-1">
                <span className="font-semibold">Start:</span>
                <span className="p-[2px] border border-primary rounded">
                  {formatTime(item?.requestedShiftID?.shiftStartTime)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold">End:</span>
                <span className="p-[2px] ml-[7px] border border-primary rounded">
                  {formatTime(item?.requestedShiftID?.shiftEndTime)}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">N/A</div>
          )}
        </div>
        <div className="flex items-center justify-center py-3">
          <span className={`px-2 py-1 rounded ${item?.status === 'APPROVE' ? 'bg-green-200 text-green-800' :
            item?.status === 'REJECT' ? 'bg-gray-300 text-gray-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
            {item?.status || 'PENDING'}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 border rounded border-primary py-1 px-2">
          {item.status === 'PENDING' ? (
            <>
              <button
                onClick={handleReject}
                disabled={isLoading && processingId === item._id}
                className="bg-red-500 px-2.5 py-2 rounded text-xs text-white disabled:opacity-50"
              >
                {(isLoading && processingId === item._id) ? 'Processing...' : 'Reject'}
              </button>
              <button
                onClick={handleApprove}
                disabled={isLoading && processingId === item._id}
                className="bg-primary px-2.5 py-2 rounded text-xs text-white disabled:opacity-50"
              >
                {(isLoading && processingId === item._id) ? 'Processing...' : 'Approve'}
              </button>
            </>
          ) : (
            <span className="text-gray-500">Action completed</span>
          )}
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <Modal
        open={approveModalVisible}
        onCancel={() => setApproveModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-green-600 mb-6">
            Are you sure you want to approve this request?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setApproveModalVisible(false)}
              className="px-8 border-primary text-primary"
              disabled={isLoading && processingId === item._id}
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmApprove}
              className="px-8 bg-primary"
              loading={isLoading && processingId === item._id}
            >
              Yes, Approve
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject Confirmation Modal */}
      <Modal
        open={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-red-600 mb-6">
            Are you sure you want to reject this request?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRejectModalVisible(false)}
              className="px-8 border-primary text-primary"
              disabled={isLoading && processingId === item._id}
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmReject}
              className="px-8 bg-red-500"
              loading={isLoading && processingId === item._id}
            >
              Yes, Reject
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={removeModalVisible}
        onCancel={() => setRemoveModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-base font-medium text-red-500 mb-6">Are you sure Remove this Institution Account</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmDelete}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RequestTableBody;