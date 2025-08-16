import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Switch } from "antd";
import moment from 'moment'; // Add this import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteHolidayMutation, useUpdateDHolidayStatusMutation, useUpdateHolidayMutation } from '../../features/holiday/holidayApi';
import HolidayModal from "./HolidayModal";

const HolidayTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "ACTIVE");
  const [deleteHoiliday, { isLoading: deleteLoading }] = useDeleteHolidayMutation();
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateDHolidayStatusMutation();
  const [updateHoliday, { isLoading: updatingLoading }] = useUpdateHolidayMutation();

  const router = useNavigate();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);

  const handleConfirmDelete = async (id) => {
    try {
      const response = await deleteHoiliday(id);
      message.success(response.data?.message || "Holiday deleted successfully");
      setRemoveModalVisible(false);
    } catch (error) {
      console.log("Delete error:", error);
      message.error(error?.data?.message || "Failed to delete Holiday");
    }
  };

  const handleConfirmSwitch = async (id) => {
    const newStatus = switchStatus ? "INACTIVE" : "ACTIVE";
    try {
      const response = await updateStatus({ data: { status: newStatus }, id: id });
      setSwitchStatus(!switchStatus);
      setSwitchModalVisible(false);
      message.success("Status updated successfully");
    } catch (error) {
      message.error(error?.data?.message || "Failed to update status");
    }
  };

  const handleUpdateHoliday = async (values) => {
    try {
      const response = await updateHoliday({
        id: item._id,
        data: {
          ...values,
          instituteId: values.instituteName, // Map to your API expected field
          startDate: values.startDate.format('YYYY-MM-DD'),
          endDate: values.endDate.format('YYYY-MM-DD')
        }
      });
      message.success(response.data?.message || "Holiday updated successfully");
      setEditModalVisible(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to update holiday");
    }
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
      <div className={`grid grid-cols-8 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3 mr-3">{item.holidayType}</div>
        <div className="flex items-center justify-center py-3 ml-4">{item.name}</div>
        <div className="flex items-center justify-center py-3">{convertDateTime(item.startDate)}</div>
        <div className="flex items-center justify-center py-3">{convertDateTime(item.endDate)}</div>
        <div className="flex items-center justify-center py-3">{item.totalDay}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
        <div className="flex items-center justify-center gap-5 border rounded border-primary py-1 px-2">
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
          <p className="text-base font-medium text-black mb-6">Are you sure Remove this Holiday</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              type="primary"
              loading={deleteLoading}
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Holiday</p>
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

      {/* Edit Holiday Modal */}
      <HolidayModal
        mode="edit"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSubmit={handleUpdateHoliday}
        initialValues={{
          instituteName: item?.institutionID?._id, // Assuming your API returns instituteId
          type: item.holidayType,
          name: item.name,
          startDate: item.startDate ? moment(item.startDate) : null,
          endDate: item.endDate ? moment(item.endDate) : null
        }}
        loading={updatingLoading}
      />
    </>
  );
};

export default HolidayTableBody;