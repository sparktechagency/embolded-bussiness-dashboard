// RequestTableHead.js
import { Button, Modal, Pagination } from 'antd';
import { useState } from 'react';
import { useGetAllShiftAndLeaveQuery, useUpdateMultipulShiftAndLeaveMutation } from '../../../features/shiftAndLeave/ShiftAndLeave';
import RequestTableBody from "./RequestTableBody";

const RequestTableHead = ({ columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [approveAllModalVisible, setApproveAllModalVisible] = useState(false);
  const [rejectAllModalVisible, setRejectAllModalVisible] = useState(false);

  const { data: requestData, isLoading, refetch } = useGetAllShiftAndLeaveQuery(currentPage);
  const [updateMultipleStatus, { isLoading: isBulkLoading }] = useUpdateMultipulShiftAndLeaveMutation();

  const data = requestData?.data?.data || [];
  const meta = requestData?.data?.meta || {
    total: 0,
    limit: 10,
    page: 1,
    totalPage: 1
  };

  // Get all pending request IDs
  const pendingRequestIds = data
    .filter(item => item.status === 'PENDING')
    .map(item => item._id);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApproveAll = () => {
    if (pendingRequestIds.length > 0) {
      setApproveAllModalVisible(true);
    }
  };

  const handleRejectAll = () => {
    if (pendingRequestIds.length > 0) {
      setRejectAllModalVisible(true);
    }
  };

  const handleConfirmApproveAll = async () => {
    try {
      await updateMultipleStatus({
        requestIDs: pendingRequestIds,
        status: "APPROVE"
      }).unwrap();
      refetch();
      setApproveAllModalVisible(false);
    } catch (error) {
      console.error("Failed to approve all:", error);
    }
  };

  const handleConfirmRejectAll = async () => {
    try {
      await updateMultipleStatus({
        requestIDs: pendingRequestIds,
        status: "REJECT"
      }).unwrap();
      refetch();
      setRejectAllModalVisible(false);
    } catch (error) {
      console.error("Failed to reject all:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1200px] w-full bg-transparent rounded-lg shadow-md space-y-3">
        {/* Header */}
        <div className={`grid grid-cols-10 text-center border-2 border-opacity-50 rounded-lg bg-surfacePrimary px-2 border-primary`}>
          {columns.map((column, index) => (
            <div key={index} className="py-3 font-semibold text-center">
              {column}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="border-2 border-opacity-50 rounded-lg bg-surfacePrimary border-primary">
          {isLoading ? "Loading..." : data.length > 0 ? (
            data.map((item, index) => (
              <RequestTableBody
                item={item}
                key={item._id}
                list={index + 1}
                refetch={refetch}
              />
            ))
          ) : (
            <h3 className="py-10 text-center">No Data Available</h3>
          )}
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleRejectAll}
            disabled={pendingRequestIds.length === 0 || isBulkLoading}
            className="bg-red-500 px-3 py-2 rounded text-xs text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBulkLoading ? 'Processing...' : `Reject All (${pendingRequestIds.length})`}
          </button>
          <button
            onClick={handleApproveAll}
            disabled={pendingRequestIds.length === 0 || isBulkLoading}
            className="bg-primary px-3 py-2 rounded text-xs text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBulkLoading ? 'Processing...' : `Approve All (${pendingRequestIds.length})`}
          </button>
        </div>

        {/* Pagination */}
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

      {/* Approve All Confirmation Modal */}
      <Modal
        open={approveAllModalVisible}
        onCancel={() => setApproveAllModalVisible(false)}
        footer={null}
        closable={false}
        width={400}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-green-600 mb-6">
            Are you sure you want to approve all {pendingRequestIds.length} pending requests?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setApproveAllModalVisible(false)}
              className="px-8 border-primary text-primary"
              disabled={isBulkLoading}
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmApproveAll}
              className="px-8 bg-primary"
              loading={isBulkLoading}
            >
              Yes, Approve All
            </Button>
          </div>
        </div>
      </Modal>

      {/* Reject All Confirmation Modal */}
      <Modal
        open={rejectAllModalVisible}
        onCancel={() => setRejectAllModalVisible(false)}
        footer={null}
        closable={false}
        width={400}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium text-red-600 mb-6">
            Are you sure you want to reject all {pendingRequestIds.length} pending requests?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRejectAllModalVisible(false)}
              className="px-8 border-primary text-primary"
              disabled={isBulkLoading}
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmRejectAll}
              className="px-8 bg-red-500"
              loading={isBulkLoading}
            >
              Yes, Reject All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RequestTableHead;