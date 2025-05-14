import { useState, useMemo } from "react";
import { Button } from "antd";
import StatusFilter from "../StatusFilter";
import ParkingSpotDetailsModal from "./ParkingSpotDetailsModal"; // Import the new modal component

const ParkingManagementTableBody = ({ item }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (dateString.includes(",")) {
      return dateString;
    }
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleDateString("en-GB", {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isCompleted = useMemo(() => {
    try {
      const endDate = new Date(item.endDate.replace(/(\w{3}) (\d{2}), (\d{4})/, "$1 $2, $3"));
      return endDate <= new Date();
    } catch {
      return true;
    }
  }, [item.endDate]);

  const showViewModal = () => {
    setIsViewModalOpen(true);
  };

  const handleModalClose = () => {
    setIsViewModalOpen(false);
  };

  // Create the parking spot data object to pass to the modal
  const parkingSpotData = {
    name: item.SpotName,
    location: item.location,
    totalSlots: item.totalParkingSlot,
    pricePerDay: parseFloat(item.totalPrice[0] || 25.00),
    pricePerWeek: parseFloat(item.totalPrice[1] || 100.00),
    openDate: "March 25, 2025", // You might want to get this from your item
    closeDate: "March 25, 2029", // You might want to get this from your item
    amenities: item.billingType || ["Business"],
    description: ""
  };

  const status = [{value:"Waiting"},{value:"Ongoing"},{value:"Completed"},{value:"Returned"},{value:"Late Returned"}];

  return (
    <>
      {/* Table Row */}
      <div className="grid items-center grid-cols-12 gap-2 px-2 my-3 text-sm bg-gray-100 mx-2 rounded-lg whitespace-nowrap">
        <div className="flex items-center justify-center py-3">{item.id}</div>
        <div className="flex items-center justify-center py-3">{item.SpotName}</div>
        <div className="flex items-center justify-center py-3">{item.location}</div>
        <div className="flex items-center justify-center py-3">{item.totalParkingSlot}</div>
        <div className="flex items-center justify-center py-3">{item.AvailableSlot}</div>
        <div className="flex items-center justify-center py-3">{item.bookedSlot}</div>
        <div className="flex flex-col items-center justify-center py-3">
          <div className="flex flex-col items-center gap-2">
            {item.billingType.map((value, index) => (
              <span 
                key={index} 
                className="font-semibold rounded text-sm w-full text-center"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-3">
          <div className="flex flex-col items-center gap-2">
            {item.totalPrice.map((value, index) => (
              <span 
                key={index} 
                className="rounded text-sm w-full text-center"
              >
                ${value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center py-3">
          <button className="bg-primary font-semibold px-4 py-1 rounded text-textSecondary">
            {item.status}
          </button>
        </div>
        <div className="flex items-center justify-center col-span-3 gap-2 px-1.5 mx-5 py-1 border rounded border-SurfacePrimary">
          <button
            onClick={showViewModal}
            className="w-full p-2 border border-primary transition duration-200 rounded text-textPrimary"
          >
            View Details
          </button>
          <span className="w-full p-2 text-center transition duration-200 border rounded text-textPrimary border-primary">
            {"Ongoing"}
          </span>
          <StatusFilter options={status} placeholder="Update Status" status={false} />
        </div>
      </div>

      {/* New Ant Design Modal */}
      <ParkingSpotDetailsModal 
        isOpen={isViewModalOpen} 
        onClose={handleModalClose} 
        parkingSpot={parkingSpotData}
      />
    </>
  );
};

export default ParkingManagementTableBody;