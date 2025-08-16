import { Modal, Spin } from 'antd';
import { baseURL } from '../../utils/BaseURL';

const DepartmentViewDetailsModal = ({
  isOpen,
  onClose,
  modalTitle = "Institution Information",
  imageSrc = "/images/viewDetails.png",
  imageAlt = "Institution image",
  sectionTitle = "Institution Information",
  details = [],
  width = 550,
  data,
  isLoading
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={width}
      centered
    >
      {
        isLoading ? <Spin size='small' className='flex justify-center items-center' /> : (
          <>
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">
              {modalTitle}
            </h1>

            

            <div className="border border-primary rounded-lg p-6">
              <h2 className="text-xl font-bold text-teal-700 mb-6">
                {sectionTitle}
              </h2>

              <div className='flex flex-col space-y-4'>
                <div className="space-y-4"><span className="font-medium">Department Name : </span>{data?.data?.departmentName || "N/A"}</div>
                <div className="space-y-4"><span className="font-medium">Institute Name : </span>{data?.data?.institutionID?.institutionName || "N/A"}</div>
              </div>
            </div>
          </>
        )
      }
    </Modal>
  );
};

export default DepartmentViewDetailsModal;