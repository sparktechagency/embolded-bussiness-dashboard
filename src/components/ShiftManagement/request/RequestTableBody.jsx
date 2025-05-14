import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Switch } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ViewDetailsModal from "./ViewDetailsModal";
// import InstitutionFormModal from "./InstitutionFormModal";

const RequestTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");


  const router = useNavigate();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = (value) => {
    setEditModalVisible(true);
  };

  const handleViewDetails = () => {
        router("/employee-management/details")
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    setRemoveModalVisible(false);
  };

  const handleConfirmSwitch = () => {
    // Implement switch logic here
    setSwitchStatus(!switchStatus);
    setSwitchModalVisible(false);
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-10 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{item.date}</div>
        <div className="flex items-center justify-center py-3">{item.employeeName}</div>
        <div className="flex items-center justify-center py-3">{item.department}</div>
        <div className="flex items-center justify-center py-3">{item.requestType}</div>
        <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
            <span className="font-semibold">Start Date:</span>
            <span className="p-[2px] border border-primary rounded">
              {item.vacationDate.startDate}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">End Date:</span>
            <span className="p-[2px] ml-[5px] border border-primary rounded">
              {item.vacationDate.endDate}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center py-3">{item.days}</div>
        <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
            <span className="font-semibold">Start Date:</span>
            <span className="p-[2px] border border-primary rounded">
              {item.currentShift.startTime}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">End Date:</span>
            <span className="p-[2px] ml-[6px] border border-primary rounded">
              {item.currentShift.endTime}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
            <span className="font-semibold">Start Date:</span>
            <span className="p-[2px] border border-primary rounded">
              {item.applyShift.startTime}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">End Date:</span>
            <span className="p-[2px] ml-[7px] border border-primary rounded">
              {item.applyShift.endTime}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
        <div className="flex items-center justify-center gap-2 border rounded border-primary py-1 px-2">
         <button className="bg-red-500 px-2.5 py-2 rounded text-xs text-white ">Reject</button>
          <button className="bg-primary px-2.5 py-2 rounded text-xs text-white ">Approve</button>
        </div>
      </div>
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

      {/* Switch Confirmation Modal */}
      <Modal
        open={switchModalVisible}
        onCancel={() => setSwitchModalVisible(false)}
        footer={null}
        closable={false}
        width={350}
        centered
      >
        <div className="text-center py-4">
          <p className="text-lg font-medium mb-6">Are you sure Turn off this location</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setSwitchModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleConfirmSwitch}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* <NewShiftModal mode="edit" visible={editModalVisible} onCancel={() => setEditModalVisible(false)} /> */}
      
    </>
  );
};

export default RequestTableBody;