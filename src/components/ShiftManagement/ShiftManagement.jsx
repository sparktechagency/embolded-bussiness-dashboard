import { Button, message, Select } from 'antd';
import moment from 'moment'; // Import moment.js
import { useState } from 'react';
import { useGetAllShiftAndLeaveQuery } from '../../features/shiftAndLeave/ShiftAndLeave';
import { useAssignEmployeeShiftMutation, useCreateShiftMutation } from '../../features/shiftManagement/shiftApi';
import AssignShiftModal from './AssignEmployeeModal';
import NewShiftModal from './NewShiftModal';
import ShiftRequestModal from './ShiftRequestModal';
import ShiftTableHead from './ShiftTableHead';

const { Option } = Select;

function ShiftManagement() {
  const [createNewShift, { isLoading: createShiftLoading }] = useCreateShiftMutation();
  const [updateAssign, { isLoading: AssignEmployeeShiftLoading }] = useAssignEmployeeShiftMutation();
  const { data, isLoading } = useGetAllShiftAndLeaveQuery();

  const findLenght = () => {
    return data?.data?.data?.filter(item => item.status === 'PENDING')
  }

  // State for modals
  const [isNewShiftModalVisible, setIsNewShiftModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isAssignShiftModalVisible, setIsAssignShiftModalVisible] = useState(false);

  // Handle shift creation with proper moment.js validation
  const handleCreateHoliday = async (values) => {
    try {
      // Ensure startTime and endTime are moment objects
      const startTime = moment.isMoment(values?.startTime) ? values.startTime : moment(values?.startTime);
      const endTime = moment.isMoment(values?.endTime) ? values.endTime : moment(values?.endTime);

      // Validate that the times are valid
      if (!startTime.isValid() || !endTime.isValid()) {
        message.error("Please provide valid start and end times");
        return;
      }

      const shiftData = {
        shiftName: values?.name,
        shiftStartTime: startTime.format("HH:mm"),
        shiftEndTime: endTime.format("HH:mm")
      };

      const result = await createNewShift(shiftData);

      if (result.error) {
        message.error(result?.error?.data?.message || "Failed to create shift");
      } else {
        setIsNewShiftModalVisible(false);
        message.success(result?.data?.message || "Shift created successfully");
      }
    } catch (error) {
      console.error("Error creating shift:", error);
      message.error(error?.message || "Something went wrong while creating shift");
    }
  };

  const holidayColumns = [
    "SL",
    "Shift Name",
    "Shift Start Time",
    "Shift End Time",
    "Total User",
    "Status",
    "Action"
  ];

  const handleAssignShift = async (values) => {
    console.log(values);
    try {
      const response = await updateAssign(values);
      if (response.error) {
        message.error(response?.error?.data?.message || "Failed to assign shift");
      } else {
        message.success(response?.data?.message || "Shift assigned successfully");
        setIsAssignShiftModalVisible(false);
      }
    } catch (err) {
      console.error("Error assigning shift:", err);
      message.error(err?.message || "Something went wrong while assigning shift");
    }
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6 flex justify-end gap-3">
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsRequestModalVisible(true)}
        >
          Request ({findLenght()?.length || 0})
        </Button>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsNewShiftModalVisible(true)}
        >
          Create New Shift
        </Button>
        <Button
          type="primary"
          className="bg-[#336C79]"
          onClick={() => setIsAssignShiftModalVisible(true)}
        >
          Assign Employee Shift
        </Button>
      </div>

      <ShiftTableHead columns={holidayColumns} />

      <NewShiftModal
        mode="create"
        visible={isNewShiftModalVisible}
        onCancel={() => setIsNewShiftModalVisible(false)}
        onSubmit={handleCreateHoliday}
        loading={createShiftLoading}
      />

      <ShiftRequestModal
        visible={isRequestModalVisible}
        onCancel={() => setIsRequestModalVisible(false)}
      />

      <AssignShiftModal
        visible={isAssignShiftModalVisible}
        onSubmit={handleAssignShift}
        onCancel={() => setIsAssignShiftModalVisible(false)}
        loading={AssignEmployeeShiftLoading}
      />
    </div>
  );
}

export default ShiftManagement;