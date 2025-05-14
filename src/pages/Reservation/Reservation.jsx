import React from 'react';
import ReservationTableHead from '../../components/Reservation/ReservationTableHead';



const columns = [
    "Reservation ID",
    "User Name",
    "Vehicles Type",
    "Vehicles VIN",
    "Billing Type",
    "Check-in Time",
    "Date",
    "Total Price",
    "Parking Slot"
  ];

const Reservation = () => {
    return (
    <section className="mt-10">
      <ReservationTableHead columns={columns} />
    </section>
    );
};

export default Reservation;