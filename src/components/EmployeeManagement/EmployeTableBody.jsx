import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteEmployeeMutation, useUpdateEmplyeeStatusMutation } from '../../features/EmployeeManagement/employeeManagementApi';
// import ViewDetailsModal from "./ViewDetailsModal";
// import InstitutionFormModal from "./InstitutionFormModal";

const EmployeTableBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "Active");
  const [deleteEmployee, { isLoading: deleteLoading }] = useDeleteEmployeeMutation();
  const [updateStatus, { isLoading: updateStatusLoading }] = useUpdateEmplyeeStatusMutation();


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

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);

  const handleConfirmDelete = async (id) => {
    // Implement delete logic here
    try {
      const response = await deleteEmployee(id);
      if (response.success) {
        message.success(response.message || "Employee deleted successfully");
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete employee");
      console.log("Delete error:", error);

    }
    setRemoveModalVisible(false);
  };



  const handleConfirmSwitch = async (id) => {
    const newStatus = switchStatus ? "INACTIVE" : "ACTIVE";
    try {
      const response = await updateStatus({ data: { status: newStatus }, id: id })
      console.log("Switch response:", response);
    } catch (error) {
      console.log("Switch error:", error);
      message.error(error?.data?.message || "Failed to update employee status");
    }

    // Implement switch logic here
    setSwitchStatus(!switchStatus);
    setSwitchModalVisible(false);
  };

  function convertTime(dateOrTime) {
    const date = new Date(dateOrTime);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-11 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3">{item.name}</div>
        <div className="flex items-center justify-center py-3">{item?.institutionID?.institutionName}</div>
        <div className="flex items-center justify-center py-3">{item?.departmentID?.departmentName}</div>
        <div className="flex items-center justify-center py-3">{item?.role}</div>
        <div className="flex items-center justify-center py-3">{item?.email}</div>
        <div className="flex items-center justify-center py-3">{item?.phone}</div>

        <div className="flex items-center justify-center py-3">
          <Select
            className="w-full"
            defaultValue={item?.weekend?.[0]}
          >
            {item?.weekend?.map((day, index) => (
              <Select.Option
                key={index}
                value={day}
              >
                {day}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex items-center justify-center py-3">{convertTime(item?.shiftSchedule?.shiftStartTime)} - {convertTime(item?.shiftSchedule?.shiftEndTime)}</div>


        <div className="flex items-center justify-center py-3">{item.status}</div>
        <div className="flex items-center justify-center border rounded border-primary py-1 px-2">
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
            onClick={() => router(`/employee-management/add-new-Employee/${item._id}`)}
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
          <p className="text-base font-medium text-black mb-6">Are you sure Remove this Employee</p>
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
          <p className="text-lg font-medium mb-6">Are you sure Turn off this Employee</p>
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

export default EmployeTableBody;