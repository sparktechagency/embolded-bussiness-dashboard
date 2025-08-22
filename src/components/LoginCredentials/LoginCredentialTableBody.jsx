import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCredentialsMutation, useUpdateCredentialStatusMutation } from '../../features/LoginCredentials/LoginCredentialsApi';


const LoginCredentialTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateCredentialStatusMutation();
  const [deleteCredential, { isLoading: deleteCredentialLoading }] = useDeleteCredentialsMutation();


  const router = useNavigate();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = (id) => {
    router(`/login-credentials/new-role/${id}`);
  };

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);



  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await deleteCredential(id);
      console.log(response)
      message.success(response.data.message);
    } catch (error) {
      console.log(error);
      message.error(error.data.message);
    }
    // Implement delete logic here
    setRemoveModalVisible(false);
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


    // Implement switch logic here

  };


  function convertDateTime(dateOrTime) {
    const date = new Date(dateOrTime);
    return date.toLocaleDateString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-7 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>

        <div className="flex items-center justify-center py-3 mr-3">
          {item.name.length > 10 && (<Tooltip title={item.name}><span>{item.name.slice(0, 10)}...</span></Tooltip>)}
          {item.name.length <= 10 && item.name}
        </div>

        <div className="flex items-center justify-center py-3 mr-3">
          {item.email.length > 10 && (<Tooltip title={item.email}><span>{item.email.slice(0, 10)}...</span></Tooltip>)}
          {item.email.length <= 10 && item.email}
        </div>

        <div className="flex items-center justify-center py-3 mr-3">
          {item.role.length > 15 && (<Tooltip title={item.role}><span>{item.role.slice(0, 15)}...</span></Tooltip>)}
          {item.role.length <= 15 && item.role}
        </div>
        <div className="flex items-center justify-center py-3">{convertDateTime(item.createdAt)}</div>
        <div className={`flex items-center justify-center ${item.status === "ACTIVE" ? "text-green-500 font-bold" : "text-red-500 font-medium"} py-3`}>{item.status}</div>
        <div className="flex items-center justify-center gap-2 border rounded border-primary py-1 px-2">
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
          <p className="text-base font-medium text-red-500 mb-6">Are you sure Remove this location</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              loading={deleteCredentialLoading}
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this location?</p>
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

    </>
  );
};

export default LoginCredentialTableBody;