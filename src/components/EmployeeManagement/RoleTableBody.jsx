import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteDesignationMutation,
  useUpdateDesignationMutation,
  useUpdateDesignationStatusMutation
} from '../../features/Designation/designationApi';
import RoleManageModal from "./RoleManageModal";

const RoleTableBody = ({ item, list, institutions, departments }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "ACTIVE");

  const [deleteDesignation, { isLoading: isDeleting }] = useDeleteDesignationMutation();
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateDesignationStatusMutation();
  const [updateDesignation, { isLoading: updating }] = useUpdateDesignationMutation();

  const handleEdit = () => setEditModalVisible(true);

  const handleDelete = () => setRemoveModalVisible(true);

  const handleSwitchChange = (checked) => setSwitchModalVisible(true);

  const handleConfirmDelete = async (id) => {
    try {
      const result = await deleteDesignation(id);
      message.success(result.data.message || "Designation deleted successfully");
      setRemoveModalVisible(false);
    } catch (error) {
      message.error("Failed to delete designation");
    }
  };

  const handleConfirmSwitch = async (id) => {
    const data = { status: switchStatus ? "INACTIVE" : "ACTIVE" };
    try {
      const response = await updateStatus({ data, id });
      message.success(response?.data?.message);
      setSwitchStatus(!switchStatus);
      setSwitchModalVisible(false);
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const handleUpdateDesignation = async (values) => {
    try {
      const data = {
        designationName: values.departmentName,
        institutionID: values.institutionId,
        departmentID: values.departmentId
      };
      const response = await updateDesignation({ id: item._id, data });
      if (response.data?.success) {
        message.success(response.data.message);
        setEditModalVisible(false);
      }
    } catch (error) {
      message.error("Failed to update designation");
    }
  };

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);

  return (
    <>
      <div className={`grid items-center grid-cols-7 gap-2 px-2 my-3 text-sm bg-gray-100 space-x-5 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3">{item?.designationName}</div>
        <div className="flex items-center justify-center py-3">{item.institution}</div>
        <div className="flex items-center justify-center py-3">{item.department}</div>
        <div className="flex items-center justify-center py-3">{item.created}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
        <div className="flex items-center border justify-between px-3 rounded border-primary">
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
          <p className="text-base font-medium text-black mb-6">Are you sure Remove this Role</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              loading={isDeleting}
              type="primary"
              onClick={() => handleConfirmDelete(item._id)}
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Role</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setSwitchModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              loading={updateStatusLoading}
              type="primary"
              onClick={() => handleConfirmSwitch(item._id)}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <RoleManageModal
        mode="edit"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSubmit={handleUpdateDesignation}
        initialValues={{
          institution: item.institutionID?._id,
          department: item.departmentID?._id,
          departmentName: item.designationName,
          institutionId: item.institutionID?._id,
          departmentId: item.departmentID?._id
        }}
        institutions={institutions}
        departments={departments}
        creatingLoading={updating}
      />
    </>
  );
};

export default RoleTableBody;