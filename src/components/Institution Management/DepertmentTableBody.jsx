import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDeleteDepartmentMutation, useGetDepartmentByIdQuery, useUpdateDepartmentMutation, useUpdateDepartmentStatusMutation } from '../../features/instituteManagement/DepartmentManagementApi';
import DepartmentFormModal from "./DepartmentFormModal";
import DepartmentViewDetailsModal from './DepartmentViewDetailsModal';

const DepertmentTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [deleteDepartment, { isLoading: deleteLoading }] = useDeleteDepartmentMutation();
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateDepartmentStatusMutation();
  const { data, isLoading } = useGetDepartmentByIdQuery(selectedInstitutionId, { skip: !selectedInstitutionId });
  const [updateDepartment, { isLoading: updateDepartmentLoading }] = useUpdateDepartmentMutation();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = (id) => {
    setSelectedInstitutionId(id);
    setEditModalVisible(true);
  };

  const handleViewDetails = (id) => {
    setSelectedInstitutionId(id);
    setViewdetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);

  const handleConfirmDelete = async (id) => {
    console.log("Deleting institution with ID:", id);
    try {
      const response = await deleteDepartment(id);
      console.log("department deleted successfully:", response);
      message.success(response?.data.message);
      setRemoveModalVisible(false);
    } catch (error) {
      console.error("Failed to delete institution:", error);
      message.error("Failed to delete institution");
    }
  };

  const handleConfirmSwitch = async (id) => {
    const data = { status: switchStatus ? "INACTIVE" : "ACTIVE" };
    try {
      const response = await updateStatus({ data, id });
      message.success(response?.data.message);
      setSwitchStatus(!switchStatus);
      setSwitchModalVisible(false);
    } catch (error) {
      message.error("Failed to update institution status");
    }
  };

  const handleUpdateDepartment = async (values) => {
    try {
      const response = await updateDepartment({
        id: selectedInstitutionId,
        data: { departmentName: values.departmentName }
      });
      message.success(response?.data?.message);
      setEditModalVisible(false);
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update department");
    }
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid items-center grid-cols-6 gap-2 px-2 my-3 text-sm bg-gray-100 space-x-5 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3">{item?.institutionID?.institutionName}</div>
        <div className="flex items-center justify-center py-3">{item?.departmentName}</div>
        <div className="flex items-center justify-center py-3">{item?.totalEmployee}</div>
        <div className="flex items-center justify-center py-3">{item?.status}</div>
        <div className="flex items-center  border justify-center px-3 rounded border-primary">
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="text-amber-500 hover:text-amber-600"
            onClick={() => handleViewDetails(item._id)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-orange-500 hover:text-orange-600"
            onClick={() => handleEdit(item._id)}
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
              loading={deleteLoading}
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Department</p>
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

      <DepartmentViewDetailsModal
        isOpen={viewdetailsModalVisible}
        onClose={() => setViewdetailsModalVisible(false)}
        modalTitle="Department Information"
        data={data}
        isLoading={isLoading}
      />

      <DepartmentFormModal
        mode="edit"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        initialValues={data?.data}
        onSubmit={handleUpdateDepartment}
        updateLoading={updateDepartmentLoading}
        dataLoading={isLoading}
      />
    </>
  );
};

export default DepertmentTableBody;