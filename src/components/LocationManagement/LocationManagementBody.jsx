import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';
import { useDeleteLocationMutation, useGetLocationByIdQuery, useUpdateLocationMutation } from '../../features/location/locationApi';
import LocationModal from "./LocationModal";

const LocationManagementBody = ({ item, list }) => {
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewdetailsModalVisible, setViewdetailsModalVisible] = useState(false);
  const [switchModalVisible, setSwitchModalVisible] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(item.status === "ACTIVE");
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const [deleteLocation, { isLoading: deleteLoading }] = useDeleteLocationMutation();
  const [updateStatusLocation, { isLoading: statusUpdatingLoading }] = useUpdateLocationMutation();
  const [updateLocation, { isLoading: updateLoading }] = useUpdateLocationMutation();

  // Only fetch location data when edit modal is open and we have a selected location
  const {
    data: singleLocation,
    isLoading: singleLocationLoading,
    refetch: refetchLocation
  } = useGetLocationByIdQuery(selectedLocationId, {
    skip: !selectedLocationId || !editModalVisible
  });

  const { data: institutionData, isLoading: instituteLoading } = useGetAllInstitutionsQuery();

  const router = useNavigate();

  const handleDelete = () => {
    setRemoveModalVisible(true);
  };

  const handleEdit = (id) => {
    setSelectedLocationId(id);
    setEditModalVisible(true);
  };

  const handleViewDetails = () => {
    router("/employee-management/details");
  };

  const handleSwitchChange = (checked) => {
    setSwitchModalVisible(true);
  };

  useEffect(() => {
    setSwitchStatus(item.status === "ACTIVE");
  }, [item.status]);

  const handleConfirmDelete = async (id) => {
    try {
      const response = await deleteLocation(id).unwrap();
      message.success(response.message || "Location deleted successfully");
      setRemoveModalVisible(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete Location");
      console.log("Delete error:", error);
    }
  };

  const handleConfirmSwitch = async (id) => {
    const newStatus = switchStatus ? "INACTIVE" : "ACTIVE";
    try {
      const response = await updateStatusLocation({
        data: { status: newStatus },
        id: id
      }).unwrap();

      console.log("Switch response:", response);
      message.success(`Location status updated to ${newStatus}`);
      setSwitchStatus(!switchStatus);
      setSwitchModalVisible(false);
    } catch (error) {
      console.log("Switch error:", error);
      message.error(error?.data?.message || "Failed to update location status");
    }
  };

  const handleUpdateLocation = async (values) => {
    try {
      // Map form values to API payload format
      const updatePayload = {
        locationName: values.name,
        institutionID: values.institutionId,
        latitude: String(values.latitude),
        longitude: String(values.longitude),
        wifiSSID: values.ssid,
        wifiIPAddress: values.ipAddress,
        radius: parseInt(values.radius)
      };

      console.log('Updating location with payload:', updatePayload);
      console.log('Location ID:', selectedLocationId);

      // Call the API with the location ID and update data
      const response = await updateLocation({
        id: selectedLocationId,
        data: updatePayload
      }).unwrap();

      console.log('Update API Response:', response);

      // Handle successful update
      if (response.success) {
        message.success(response.message || 'Location updated successfully');
        setEditModalVisible(false);
        setSelectedLocationId(null);
        // You might want to refetch the locations list here or update parent state
      } else {
        message.error('Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);

      // Handle different types of errors
      if (error.data && error.data.message) {
        message.error(error.data.message);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error('An error occurred while updating the location');
      }
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setSelectedLocationId(null);
  };

  // Format the single location data for the form
  const getFormattedLocationData = () => {
    if (!singleLocation?.data) return {};

    const locationData = singleLocation.data;
    return {
      name: locationData.locationName,
      institutionId: locationData.institutionID,
      latitude: parseFloat(locationData.latitude),
      longitude: parseFloat(locationData.longitude),
      ssid: locationData.wifiSSID,
      ipAddress: locationData.wifiIPAddress,
      radius: parseInt(locationData.radius)
    };
  };

  return (
    <>
      {/* Table Row */}
      <div className={`grid grid-cols-9 items-center gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap`}>
        <div className="flex items-center justify-center py-3">{list}</div>
        <div className="flex items-center justify-center py-3 mr-3">{item.locationName}</div>
        <div className="flex items-center justify-center py-3 ml-4">{item.latitude}</div>
        <div className="flex items-center justify-center py-3">{item.longitude}</div>
        <div className="flex items-center justify-center py-3">{item.wifiSSID}</div>
        <div className="flex items-center justify-center py-3">{item.wifiIPAddress}</div>
        <div className="flex items-center justify-center py-3">{item.radius}</div>
        <div className="flex items-center justify-center py-3">{item.status}</div>
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
          <p className="text-base font-medium text-black mb-6">Are you sure you want to remove this location?</p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setRemoveModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              loading={deleteLoading}
              disabled={deleteLoading}
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
          <p className="text-lg font-medium mb-6">
            Are you sure you want to {switchStatus ? 'deactivate' : 'activate'} this location?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setSwitchModalVisible(false)}
              className="px-8 border-primary text-primary"
            >
              No
            </Button>
            <Button
              loading={statusUpdatingLoading}
              disabled={statusUpdatingLoading}
              type="primary"
              onClick={() => handleConfirmSwitch(item._id)}
              className="px-8 bg-primary"
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Location Modal */}
      <LocationModal
        mode="edit"
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        onSubmit={handleUpdateLocation}
        initialValues={getFormattedLocationData()}
        loading={updateLoading}
        institutionData={institutionData}
        instituteLoading={instituteLoading}
      />
    </>
  );
};

export default LocationManagementBody;