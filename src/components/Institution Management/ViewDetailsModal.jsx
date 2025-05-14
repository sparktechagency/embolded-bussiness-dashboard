import { Modal } from 'antd';
import React from 'react';

const ViewDetailsModal = ({
  isOpen,
  onClose,
  modalTitle = "Institution Information",
  imageSrc = "/images/viewDetails.png",
  imageAlt = "Institution image",
  sectionTitle = "Institution Information",
  details = [],
  width = 550
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={width}
      centered
    >
      <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
        {modalTitle}
      </h1>
      
      {imageSrc && (
        <div className="mb-4">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full rounded-lg"
          />
        </div>
      )}

      <div className="border border-primary rounded-lg p-6">
        <h2 className="text-xl font-bold text-teal-700 mb-6">
          {sectionTitle}
        </h2>

        <div className="space-y-4">
          {details.map((item, index) => (
            <div key={index}>
              <span className="font-bold">{item.label}:</span> {item.value}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ViewDetailsModal;