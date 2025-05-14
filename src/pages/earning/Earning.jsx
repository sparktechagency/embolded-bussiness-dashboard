import React from "react";
import EarningTableHead from "../../components/Earning/EarningTableHead";

const columns = [
  "Reservation ID",
  "User Name",
  "Vehicles Type",
  "Vehicles VIN",
  "Billing Type",
  "Date",
  "Total Price",
  "Admin Revenue",
  "Parking Slot"
];

const Earning = () => {
  return (
    <section className="mt-10">
      <EarningTableHead columns={columns} />
    </section>
  );
};

export default Earning;
