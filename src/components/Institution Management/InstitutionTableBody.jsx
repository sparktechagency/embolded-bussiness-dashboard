import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDeleteInstitueMutation, useGetInstitutionsByIdQuery, useUpdateInstitueMutation, useUpdateInstitueStatusMutation } from '../../features/instituteManagement/instituteManagementApi';
import InstitutionFormModal from "./InstitutionFormModal";
import ViewDetailsModal from "./ViewDetailsModal";

const InstitutionTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [deleteInstitution, { isLoading: deleteLoading }] = useDeleteInstitueMutation();
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateInstitueStatusMutation();
  const { data, isLoading } = useGetInstitutionsByIdQuery(selectedInstitutionId, { skip: !selectedInstitutionId });
  const [updateInstitution, { isLoading: updateInstitutionLoading }] = useUpdateInstitueMutation();

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
      const response = await deleteInstitution(id);
      console.log("Institution deleted successfully:", response);
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
      setSwitchStatus(!switchStatus); // This will now properly toggle the state
      setSwitchModalVisible(false);
    } catch (error) {
      message.error("Failed to update institution status");
    }
  };

  const handleUpdateInstitution = async (values) => {
    try {
      const formData = new FormData();

      // Append all fields to formData
      formData.append('institutionName', values.name);
      formData.append('address', values.address);
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phone);
      formData.append('institutionWebsiteLink', values.website);
      formData.append('establishedYear', values.establishedYear);

      // Append logo file if it exists and is new
      if (values.logo && values.logo[0]?.originFileObj) {
        formData.append('logo', values.logo[0].originFileObj);
      }

      const response = await updateInstitution({
        id: selectedInstitutionId,
        data: formData
      });

      message.success(response?.data?.message);
      setEditModalVisible(false);
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update institution");
    }
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-10 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3 mr-3">{item.institutionName}</div>
        <div className="flex items-center justify-center py-3 ml-4">{item.email}</div>
        <div className="flex items-center justify-center py-3">{item.phoneNumber}</div>
        <div className="flex items-center justify-center py-3">{item.establishedYear}</div>
        <div className="flex items-center justify-center py-3">{item.address}</div>
        <div className="flex items-center justify-center py-3">{item.totalDepartment}</div>
        <div className="flex items-center justify-center py-3">{item.totalEmployee}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
        <div className="flex items-center justify-center border rounded border-primary py-1 px-2">
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
          <p className="text-base font-medium text-black mb-6">Are you sure Remove this Institution Account</p>
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Institution Account?</p>
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

      <ViewDetailsModal
        isOpen={viewdetailsModalVisible}
        onClose={() => setViewdetailsModalVisible(false)}
        modalTitle="Institution Information"
        data={data}
      />

      <InstitutionFormModal
        mode="edit"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        initialValues={data?.data}
        onSubmit={handleUpdateInstitution}
        loading={updateInstitutionLoading}
      />
    </>
  );
};

export default InstitutionTableBody;