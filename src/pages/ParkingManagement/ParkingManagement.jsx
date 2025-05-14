import React from 'react';
import ParkingManagementTableHead from '../../components/ParkingManagement/ParkingManagementTableHead';


const columns = [
    "SL",
    "Spot Name",
    "Location",
    "Total Slot",
    "Available Slot",
    "Booked Slot",
    "Billing Type",
    "Total Price",
    "Status"
  ];

const ParkingManagement = () => {
    return (
        <section className="mt-10">
      <ParkingManagementTableHead columns={columns} />
    </section>
    );
};

export default ParkingManagement;