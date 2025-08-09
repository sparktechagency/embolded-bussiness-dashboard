import { Modal } from 'antd';
import { baseURL } from '../../utils/BaseURL';

const ViewDetailsModal = ({
  isOpen,
  onClose,
  modalTitle = "Institution Information",
  imageSrc = "/images/viewDetails.png",
  imageAlt = "Institution image",
  sectionTitle = "Institution Information",
  details = [],
  width = 550,
  data
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
            src={data?.data?.logo ? `${baseURL + data?.data?.logo}` : imageSrc}
            alt={imageAlt}
            className="w-full rounded-lg"
          />
        </div>
      )}

      <div className="border border-primary rounded-lg p-6">
        <h2 className="text-xl font-bold text-teal-700 mb-6">
          {sectionTitle}
        </h2>

        <div className='flex flex-col space-y-4'>
          <div className="space-y-4"><span className="font-medium">institutionName : </span>{data?.data?.institutionName || "N/A"}</div>
          <div className="space-y-4"><span className="font-medium">Email : </span>{data?.data?.email || "N/A"}</div>
          <div className="space-y-4"><span className="font-medium">address : </span>{data?.data?.address || "N/A"}</div>
          <div className="space-y-4"><span className="font-medium">institution Website Link : </span>{data?.data?.institutionWebsiteLink || "N/A"}</div>
          <div className="space-y-4"><span className="font-medium">Phone Number : </span>{data?.data?.phoneNumber || "N/A"}</div>
          <div className="space-y-4"><span className="font-medium">Established Year : </span>{data?.data?.establishedYear || "N/A"}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewDetailsModal;