import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewEmploye() {
  const router = useNavigate();
  const [selectedDays, setSelectedDays] = useState(['Sun']);
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: 'Dr. John Doe',
    department: 'Clinical',
    role: 'Doctor',
    institution: 'Brookwood Baptist Health',
    email: 'john.doe@example.com',
    phone: '+123 456 7890',
    shiftSchedule: '9:00 AM - 5:00 PM'
  });
  const [fileList, setFileList] = useState([]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    console.log('Form values:', {
      ...formData,
      weekendDays: selectedDays,
      profilePicture: fileList[0]
    });
    message.success('Employee created successfully!');
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      setFileList([file]);
      return false; // Prevent automatic upload
    },
    fileList,
    accept: 'image/*',
    maxCount: 1
  };

  return (
    <div className="">
      <div className="w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div onClick={()=>window.history.back()} className="h-7 w-7 cursor-pointer rounded-sm flex items-center justify-center mr-2">
              <img src="/icons/PageBack.png" alt="" />
            </div>
            <h5 className="m-0 font-medium">Add New Employee</h5>
          </div>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-3 gap-x-6 gap-y-6 border p-6 rounded-lg border-primary">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <Input
              placeholder="Set Employee ID"
              value={formData.employeeId}
              onChange={(e) => handleChange('employeeId', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name*</label>
            <Input
              placeholder="Dr. John Doe"
              value={formData.employeeName}
              onChange={(e) => handleChange('employeeName', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Department</label>
            <Select
              className="w-full"
              value={formData.department}
              onChange={(value) => handleChange('department', value)}
              options={[
                { value: 'Clinical', label: 'Clinical' },
                { value: 'Administrative', label: 'Administrative' },
                { value: 'Research', label: 'Research' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <Select
              className="w-full"
              value={formData.role}
              onChange={(value) => handleChange('role', value)}
              options={[
                { value: 'Doctor', label: 'Doctor' },
                { value: 'Nurse', label: 'Nurse' },
                { value: 'Technician', label: 'Technician' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input
              placeholder="+123 456 7890"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Shift Schedule</label>
            <Select
              className="w-full"
              value={formData.shiftSchedule}
              onChange={(value) => handleChange('shiftSchedule', value)}
              options={[
                { value: '9:00 AM - 5:00 PM', label: '9:00 AM - 5:00 PM' },
                { value: '3:00 PM - 11:00 PM', label: '3:00 PM - 11:00 PM' },
                { value: '11:00 PM - 7:00 AM', label: '11:00 PM - 7:00 AM' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Institution</label>
            <Select
              className="w-full"
              value={formData.institution}
              onChange={(value) => handleChange('institution', value)}
              options={[
                { value: 'Brookwood Baptist Health', label: 'Brookwood Baptist Health' },
                { value: 'Mercy Hospital', label: 'Mercy Hospital' },
                { value: "St. Luke's Medical Center", label: "St. Luke's Medical Center" }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Weekend</label>
            <div className="flex flex-wrap gap-2 border rounded-lg p-[5px]">
              {days.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`w-12 h-8 border rounded-md flex items-center justify-center ${selectedDays.includes(day)
                      ? 'bg-blue-100 border-blue-400 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-600'
                    }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Picture</label>
            <Upload {...uploadProps}>
              <div className="border border-dashed border-gray-300 rounded-md p-6 flex justify-center items-center cursor-pointer">
                <div className="text-center">
                  <UploadOutlined className="text-2xl text-gray-400" />
                  <p className="m-0 text-gray-500">Click or drag file to upload</p>
                </div>
              </div>
            </Upload>
          </div>

          <div className="col-span-2 flex justify-end items-end mt-4">
            <Button
              type="primary"
              onClick={handleSubmit}
              className="bg-[#336C79] hover:bg-[#336C79]"
            >
              Create New Employee
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}