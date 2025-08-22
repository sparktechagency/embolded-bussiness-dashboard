import { CalendarOutlined, ClockCircleOutlined, EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Descriptions, message, Modal, Switch, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateShiftMutation, useUpdateShiftStatusMutation } from '../../features/shiftManagement/shiftApi';
import NewShiftModal from "./NewShiftModal";

const ShiftTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");
  const [updateStatus, { isLoading }] = useUpdateShiftStatusMutation();
  const [updateShift, { isLoading: updateShiftingLoading }] = useUpdateShiftMutation();

  const router = useNavigate();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleViewDetails = () => {
    setViewdetailsModalVisible(true);
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setRemoveModalVisible(false);
  };

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);

  const handleConfirmSwitch = async (id) => {
    const newStatus = switchStatus ? "INACTIVE" : "ACTIVE";
    try {
      const response = await updateStatus({ data: { status: newStatus }, id: id })
      console.log("Switch response:", response);
      setSwitchStatus(!switchStatus);
      setSwitchModalVisible(false);
    } catch (error) {
      console.log("Switch error:", error);
      message.error(error?.data?.message || "Failed to update employee status");
    }
  };

  function convertTime(dateOrTime) {
    const date = new Date(dateOrTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  }


  const handleUpdateShift = async (values) => {
    try {
      const response = await updateShift({
        id: item._id,
        data: {
          shiftName: values.name,
          shiftStartTime: convertTime(values.startTime),
          shiftEndTime: convertTime(values.endTime)
        }
      });
      message.success(response.data?.message || "Shift updated successfully");
      setEditModalVisible(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to update shift");
    }
  };

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    return moment(dateString).format('hh:mm A');
  };

  // Helper function to calculate shift duration
  const calculateShiftDuration = (startTime, endTime) => {
    const start = moment(startTime);
    const end = moment(endTime);
    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-7 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3 mr-3">{item?.shiftName}</div>
        <div className="flex items-center justify-center py-3 ml-4">{convertTime(item?.shiftStartTime)}</div>
        <div className="flex items-center justify-center py-3">{convertTime(item?.shiftEndTime)}</div>
        <div className="flex items-center justify-center py-3">{item?.totalEmployee}</div>
        <div className={`flex items-center justify-center ${item.status === "ACTIVE" ? "text-green-500 font-bold" : "text-red-500 font-medium"} py-3`}>{item.status}</div>
        <div className="flex items-center justify-center gap-5 border rounded border-primary py-1 px-2">
          <Button
            type="text"
            icon={<EditOutlined />}
            className="text-orange-500 hover:text-orange-600"
            onClick={handleEdit}
          />
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="text-amber-500 hover:text-amber-600"
            onClick={handleViewDetails}
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
              loading={isLoading}
              type="primary"
              onClick={() => handleConfirmSwitch(item._id)}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Shift Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <ClockCircleOutlined className="text-blue-500" />
            <span className="text-lg font-semibold">Shift Details</span>
          </div>
        }
        open={viewdetailsModalVisible}
        onCancel={() => setViewdetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewdetailsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
        centered
      >
        <div className="py-4">
          {/* Shift Basic Information */}
          <div className="mb-6">
            <Descriptions
              title="Basic Information"
              bordered
              column={2}
              size="middle"
            >
              <Descriptions.Item label="Shift Name" span={2}>
                <span className="font-medium text-lg">{item?.shiftName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={item?.status === 'ACTIVE' ? 'green' : 'red'}>
                  {item?.status}
                </Tag>
              </Descriptions.Item>


            </Descriptions>
          </div>

          {/* Time Information */}
          <div className="mb-6">
            <Descriptions
              title="Time Schedule"
              bordered
              column={1}
              size="middle"
            >
              <Descriptions.Item label="Start Time">
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-green-500" />
                  <span className="font-medium">{formatDateTime(item?.shiftStartTime)}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="End Time">
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-red-500" />
                  <span className="font-medium">{formatDateTime(item?.shiftEndTime)}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Duration">
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined className="text-blue-500" />
                  <span className="font-medium text-blue-600">
                    {calculateShiftDuration(item?.shiftStartTime, item?.shiftEndTime)}
                  </span>
                </div>
              </Descriptions.Item>
            </Descriptions>
          </div>

          {/* Created By Information */}
          {item?.createdBy && (
            <div className="mb-6">
              <Descriptions
                title="Created By"
                bordered
                column={2}
                size="middle"
              >
                <Descriptions.Item label="Creator" span={2}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      size={40}
                      src={item?.createdBy?.profileImage}
                      icon={<UserOutlined />}
                    />
                    <div>
                      <div className="font-medium">{item?.createdBy?.name}</div>
                      <div className="text-gray-500 text-sm">{item?.createdBy?.email}</div>
                    </div>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                  <Tag color="blue">{item?.createdBy?.role?.replace('_', ' ')}</Tag>
                </Descriptions.Item>
              </Descriptions>
            </div>
          )}


        </div>
      </Modal>

      <NewShiftModal
        mode="edit"
        visible={editModalVisible}
        initialValues={{
          name: item.shiftName,
          startTime: item.shiftStartTime,
          endTime: item.shiftEndTime
        }}
        onSubmit={handleUpdateShift}
        loading={updateShiftingLoading}
        onCancel={() => setEditModalVisible(false)}
      />
    </>
  );
};

export default ShiftTableBody;