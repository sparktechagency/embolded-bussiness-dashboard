import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const EarningTableBody = ({ item }) => {
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

  return (
    <>
      {/* Table Row */}
      <div className="grid items-center grid-cols-10 gap-2 px-2 my-3 text-sm bg-gray-100 rounded-lg whitespace-nowrap mx-2">
        <div className="flex items-center justify-center py-3">{item.reservationID}</div>
        <div className="flex items-center justify-center py-3">{item.userName}</div>
        <div className="flex items-center justify-center py-3">{item.vehiclesType}</div>
        <div className="flex items-center justify-center py-3">{item.vecicles}</div>
        <div className="flex items-center justify-center py-3">{item.parkingPlan}</div>
        <div className="flex items-center justify-center py-3">{item.checkinTime}</div>
        <div className="flex flex-col items-center justify-center py-3">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Start Date:</span>
            <span className="p-[2px] border border-primary rounded">
              {formatDate(item.startDate)}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="font-semibold text-start">End Date:</span>
            <span className="p-[2px] border border-primary rounded">
              {formatDate(item.endDate)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-3">
          <span className="mb-1">${item.price}</span>
          <span className={`ml-2 py-1 rounded bg-primary px-4 text-white`}>
            {item.paid ? "Paid" : "Pending"}
          </span>
        </div>
        <div className="flex items-center justify-center py-3">{item.slot}</div>
        <div className="flex items-center justify-center py-2 border-primary rounded border">{item.status}</div>

      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {isViewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl md:max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleModalClose}
                className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
                aria-label="Close modal"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>

              <h2 className="mb-4 text-xl font-bold text-center text-primary">Booking Information</h2>

              <div className="px-3 py-4 space-y-3 border rounded-md border-primary">
                {/* User Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">User Information</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">User Name:</span> {item.userName}</p>
                    <p className="text-sm"><span className="font-medium">Email:</span> {item.email}</p>
                    <p className="text-sm"><span className="font-medium">Location:</span> {item.location}</p>
                    <p className="text-sm"><span className="font-medium">Phone Number:</span> {item.phoneNumber}</p>
                  </div>
                </div>

                {/* Booking Details Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Booking Details</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">Parking Spot:</span> {item.parkingSlot}</p>
                    <p className="text-sm"><span className="font-medium">Location:</span> {item.location}</p>
                    <p className="text-sm"><span className="font-medium">Vehicle:</span> {item.VehiclesType}</p>
                    <p className="text-sm"><span className="font-medium">Booking Start:</span> {formatDate(item.startDate)}</p>
                    <p className="text-sm"><span className="font-medium">Booking End:</span> {formatDate(item.endDate)}</p>
                    <p className="text-sm"><span className="font-medium">Total Days:</span> {item.totalDays}</p>
                    <p className="text-sm"><span className="font-medium">Remaining Days:</span> {item.remainingDays}</p>
                    <p className="text-sm"><span className="font-medium">Parking Slot:</span> {item.parkingSlot}</p>
                  </div>
                </div>

                {/* Payment Information Section */}
                <div>
                  <h3 className="mb-2 text-base font-semibold text-primary">Payment Information</h3>
                  <div className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md">
                    <p className="text-sm"><span className="font-medium">Total Amount:</span> ${item.totalPrice}</p>
                    <p className="text-sm"><span className="font-medium">Payment By:</span> {item.paymentMethod}</p>
                    <p className="text-sm"><span className="font-medium">Transaction ID:</span> {item.transactionId}</p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded ${item.paid ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                        {item.paid ? "Paid" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EarningTableBody;