import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ViewDetailsModal from "./ViewDetailsModal";
// import InstitutionFormModal from "./InstitutionFormModal";

const AllUserTableBody = ({ item, list }) => {
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
    router("/employee-management/details")
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
      <div className={`grid grid-cols-8 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3 mr-3">{item.employeName}</div>
        <div className="flex items-center justify-center py-3 ml-4">{item.institution}</div>
        <div className="flex items-center justify-center py-3">{item.department}</div>
        <div className="flex items-center justify-center py-3">{item.checkIn}</div>
        <div className="flex items-center justify-center py-3">{item.checkOut}</div>
        <div className="flex items-center justify-center py-3">{item.totalWorkingTime}</div>
        <div className={`flex items-center justify-center py-3 ${item.status === "Absent" ? "text-red-500" : "text-green-500"}`}> {item.status}</div>
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
          <p className="text-base font-medium text-black mb-6">Are you sure Remove this Employee</p>
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Employee</p>
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


      {/* <ViewDetailsModal isOpen={viewdetailsModalVisible} onClose={() => setViewdetailsModalVisible(false)} modalTitle="Hospital Details"
        imageAlt="Hospital building"
        details={[
          { label: "Name", value: "City General Hospital" },
          { label: "Phone Number", value: "+1234567890" },
          { label: "Email", value: "contact@cityhospital.com" },
          { label: "Address", value: "123 Medical Drive, Health City" },
          { label: "Status", value: "Active" }
        ]} />


      <InstitutionFormModal mode="edit" visible={editModalVisible} onCancel={() => setEditModalVisible(false)}    /> initialValues={institution} */}



    </>
  );
};

export default AllUserTableBody;