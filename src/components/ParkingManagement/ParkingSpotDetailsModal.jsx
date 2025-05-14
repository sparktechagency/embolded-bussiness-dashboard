import { useState } from "react";
import { Modal, Button, Form, Input, Tag } from "antd";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";

const ParkingSpotDetailsModal = ({ isOpen, onClose, parkingSpot }) => {
  // Default parking spot data if none is provided
  const defaultSpot = {
    name: "Easy Park Spot",
    location: "Las Vegas",
    totalSlots: 20,
    pricePerDay: 25.00,
    pricePerWeek: 100.00,
    openDate: "March 25, 2025",
    closeDate: "March 25, 2029",
    amenities: ["Business"],
    description: ""
  };

  // Use provided data or defaults
  const spotData = parkingSpot || defaultSpot;
  
  // State for description field
  const [description, setDescription] = useState(spotData.description);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={<CloseCircleOutlined />}
      title={
        <div className="text-center text-xl font-semibold text-gray-800">
          View Details
        </div>
      }
      centered
    >
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Left column - Image/Icon placeholder */}
        <div className="flex-1 border rounded-md p-4 bg-gray-50 flex items-center justify-center min-h-64">
          <div className="text-5xl text-gray-400">
            {/* Placeholder icon - you can replace with an actual image component */}
            <span role="img" aria-label="Parking icon" className="text-4xl">
              🅿️
            </span>
          </div>
        </div>

        {/* Right column - Parking information */}
        <div className="flex-1">
          <div className="border rounded-md p-4 bg-gray-50">
            <h3 className="text-lg font-medium text-rose-500 mb-3">
              Parking Information
            </h3>
            
            <div className="space-y-2">
              <p><span className="font-medium">Parking Spot Name: </span>{spotData.name}</p>
              <p><span className="font-medium">Location: </span>{spotData.location}</p>
              <p><span className="font-medium">Total Parking Slot: </span>{spotData.totalSlots}</p>
              <p><span className="font-medium">Per Day Price: </span>${spotData.pricePerDay.toFixed(2)}</p>
              <p><span className="font-medium">Per Week Price: </span>${spotData.pricePerWeek.toFixed(2)}</p>
              <p><span className="font-medium">Open Date: </span>{spotData.openDate}</p>
              <p><span className="font-medium">Close Date: </span>{spotData.closeDate}</p>
              
              <div>
                <span className="font-medium">Amenities: </span>
                {spotData.amenities.map((amenity, index) => (
                  <Tag key={index} color="red" className="ml-1">
                    {amenity}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description textarea */}
      <div className="mt-4">
        <Input.TextArea 
          placeholder="Write your parking spot Description"
          className="w-full p-3 border rounded-md"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Edit button */}
      <div className="mt-4 flex justify-center">
        <Button 
          type="primary" 
          size="large"
          className="bg-rose-500 hover:bg-rose-600 border-rose-500 w-full md:w-1/2"
        //   icon={<EditOutlined />}
        >
          Edit
        </Button>
      </div>
    </Modal>
  );
};

export default ParkingSpotDetailsModal;