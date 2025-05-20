import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Switch } from "antd";
import { useState } from "react";
import ViewDetailsModal from "./ViewDetailsModal";
import InstitutionFormModal from "./InstitutionFormModal";
import DepartmentFormModal from "./DepartmentFormModal";

const DepertmentTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = (value) => {
    setEditModalVisible(true);
  };

  const handleViewDetails = () => {
    setViewdetailsModalVisible(true);
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
      <div className={`grid items-center grid-cols-6 gap-2 px-2 my-3 text-sm bg-gray-100 space-x-5 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3">{item.institution}</div>
        <div className="flex items-center justify-center py-3">{item.name}</div>
        <div className="flex items-center justify-center py-3">{item.totalEmployee}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
        <div className="flex items-center  border justify-center px-3 rounded border-primary">
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="text-amber-500 hover:text-amber-600"
            onClick={handleViewDetails}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-orange-500 hover:text-orange-600"
            onClick={handleEdit}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="text-red-500 hover:text-red-600"
            onClick={handleDelete}
          />
          <Switch
            checked={switchStatus}
            size="small"
            className="ml-2"
            onChange={handleSwitchChange}
          />
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
          <p className="text-base font-medium text-black mb-6">Are you sure Remove this Department</p>
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Department</p>
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


      <ViewDetailsModal isOpen={viewdetailsModalVisible} onClose={() => setViewdetailsModalVisible(false)} modalTitle="Department Information"
        imageAlt="Hospital building" sectionTitle="Department Information"
        details={[
          { label: "Institution Name", value: "Brookwood Baptist Health " },
          { label: "Department Name", value: "Spark tech" },
          { label: "Total Employee", value: "200" },
          { label: "Status", value: "active" },
        ]} />


      <DepartmentFormModal mode="edit" visible={editModalVisible} onCancel={() => setEditModalVisible(false)} /> {/* initialValues={institution} */}



    </>
  );
};

export default DepertmentTableBody;