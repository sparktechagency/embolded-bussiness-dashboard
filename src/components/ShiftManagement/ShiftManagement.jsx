// src/components/ShiftManagement/ShiftManagement.jsx
import { Button, message, Select } from 'antd';
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

  // সঠিক স্পেলিং: findLength
  const findLength = () => {
    return data?.data?.data?.filter(item => item.status === 'PENDING') || [];
  };

  // Modals visibility
  const [isNewShiftModalVisible, setIsNewShiftModalVisible] = useState(false);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isAssignShiftModalVisible, setIsAssignShiftModalVisible] = useState(false);

  // Handle shift creation
  const handleCreateHoliday = async (values) => {
    try {
      const shiftData = {
        shiftName: values?.name,
        shiftStartTime: values.startTime,
        shiftEndTime: values.endTime
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
      message.error(error?.message || "Something went wrong");
    }




  };

  const handleAssignShift = async (values) => {
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
      message.error(err?.message || "Something went wrong");
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

  return (
    <div className="sm:p-6 p-2 bg-gray-50 w-screen sm:w-full overflow-hidden">
      <div className="mb-6 sm:flex sm:justify-end justify-between gap-3">
        {/* Request Modal Trigger */}
        <Button
          type="primary"
          className="bg-[#336C79] w-full sm:w-auto mb-2 sm:mb-0"
          onClick={() => setIsRequestModalVisible(true)}
        >
          Request ({findLength().length || 0})
        </Button>

        {/* Create New Shift Modal Trigger */}
        <Button
          type="primary"
          className="bg-[#336C79] w-full sm:w-auto mb-2 sm:mb-0"
          onClick={() => setIsNewShiftModalVisible(true)}
        >
          Create New Shift
        </Button>

        {/* Assign Shift Modal Trigger */}
        <Button
          type="primary"
          className="bg-[#336C79] w-full sm:w-auto"
          onClick={() => setIsAssignShiftModalVisible(true)}
        >
          Assign Employee Shift
        </Button>
      </div>

      <div className='sm:overflow-hidden overflow-x-auto'>
        <ShiftTableHead columns={holidayColumns} />
      </div>

      {/* Modals */}
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