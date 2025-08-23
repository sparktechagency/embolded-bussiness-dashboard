import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, message, Grid } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDesignationQuery } from '../../features/Designation/designationApi';
import { useCreateEmployeeMutation, useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../features/EmployeeManagement/employeeManagementApi';
import { useGetAllDepartmentQuery } from '../../features/instituteManagement/DepartmentManagementApi';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';
import { useGetAllShiftQuery } from '../../features/shiftManagement/shiftApi';
import { baseURL } from '../../utils/BaseURL';

const { useBreakpoint } = Grid;

export default function NewEmploye() {
  const { id } = useParams();
  const router = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [selectedDays, setSelectedDays] = useState(['Sun']);
  const { data: institutionData, isLoading: instituteLoading } = useGetAllInstitutionsQuery();
  const { data: shiftData, isLoading: shiftLoading } = useGetAllShiftQuery();
  const { data: departmentData, isLoading: departmentLoading } = useGetAllDepartmentQuery();
  const { data: designationData, isLoading: designationLoading } = useGetDesignationQuery();
  const [createEmployee, { isLoading: createEmployeeLoading }] = useCreateEmployeeMutation();
  const { data: spesicData, isLoading, refetch: refetchEmployee } = useGetEmployeeByIdQuery(id, { skip: !id });
  const [updateEmployee, { isLoading: updateEmployeeLoading }] = useUpdateEmployeeMutation();

  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    role: '',
    institution: '',
    email: '',
    phone: '',
    shiftSchedule: ''
  });
  const [fileList, setFileList] = useState([]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Day mapping for full names
  const dayMapping = {
    'Sun': 'SUNDAY',
    'Mon': 'MONDAY',
    'Tue': 'TUESDAY',
    'Wed': 'WEDNESDAY',
    'Thu': 'THURSDAY',
    'Fri': 'FRIDAY',
    'Sat': 'SATURDAY'
  };

  // Reverse day mapping for edit mode
  const reverseDayMapping = {
    'SUNDAY': 'Sun',
    'MONDAY': 'Mon',
    'TUESDAY': 'Tue',
    'WEDNESDAY': 'Wed',
    'THURSDAY': 'Thu',
    'FRIDAY': 'Fri',
    'SATURDAY': 'Sat'
  };

  useEffect(() => {
    if (spesicData?.data && !isLoading) {
      const employeeData = spesicData.data;

      // Set form data
      setFormData({
        employeeId: employeeData.employeeID || '',
        employeeName: employeeData.name || '',
        department: employeeData.departmentID?.departmentName || '',
        role: '', // Will be set after designations are filtered
        institution: employeeData.institutionID?.institutionName || '',
        email: employeeData.email || '',
        phone: employeeData.phone || '',
        shiftSchedule: employeeData.shiftSchedule ?
          `${employeeData.shiftSchedule.shiftStartTime} - ${employeeData.shiftSchedule.shiftEndTime}` : ''
      });

      // Set institution ID for filtering
      if (employeeData.institutionID?._id) {
        setSelectedInstitutionId(employeeData.institutionID._id);
      }

      // Set weekend days
      if (employeeData.weekend && employeeData.weekend.length > 0) {
        const mappedDays = employeeData.weekend.map(day => reverseDayMapping[day]).filter(Boolean);
        setSelectedDays(mappedDays.length > 0 ? mappedDays : ['Sun']);
      }

      // Set profile image if exists
      if (employeeData?.createdBy?.profileImage) {
        setFileList([{
          uid: '-1',
          name: 'profile-image',
          status: 'done',
          url: baseURL + employeeData?.createdBy?.profileImage,
        }]);
      }
    }
  }, [spesicData, isLoading]);

  // useEffect to filter departments and designations when institution changes or data loads
  useEffect(() => {
    if (selectedInstitutionId && departmentData?.data?.data) {
      const filtered = departmentData.data.data.filter(
        dept => dept?.institutionID?._id === selectedInstitutionId
      );
      setFilteredDepartments(filtered);
    }

    if (selectedInstitutionId && designationData?.data?.data) {
      const filteredDesig = designationData.data.data.filter(
        designation => designation?.institutionID?._id === selectedInstitutionId
      );
      setFilteredDesignations(filteredDesig);

      // Set designation name after filtering (for edit mode)
      if (spesicData?.data?.designationID?.designationName) {
        const designationExists = filteredDesig.find(
          desig => desig.designationName === spesicData.data.designationID.designationName
        );
        if (designationExists) {
          setFormData(prev => ({
            ...prev,
            role: spesicData.data.designationID.designationName
          }));
        }
      }
    }
  }, [selectedInstitutionId, departmentData, designationData, spesicData]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleInstitutionChange = (value, option) => {
    setSelectedInstitutionId(option.key);
    handleChange('institution', value);

    // Reset department and designation when institution changes
    setFormData(prev => ({
      ...prev,
      institution: value,
      department: '',
      role: ''
    }));

    // Filter departments based on selected institution
    if (departmentData?.data?.data) {
      const filtered = departmentData.data.data.filter(
        dept => dept?.institutionID?._id === option?.key
      );
      setFilteredDepartments(filtered);
    }

    // Filter designations based on selected institution
    if (designationData?.data?.data) {
      const filteredDesig = designationData?.data?.data?.filter(
        designation => designation?.institutionID?._id === option?.key
      );
      setFilteredDesignations(filteredDesig);
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Comprehensive validation function
  const validateForm = () => {
    const errors = [];

    if (!formData.employeeId.trim()) {
      errors.push('Employee ID is required');
    }

    if (!formData.employeeName.trim()) {
      errors.push('Employee Name is required');
    }

    if (!formData.institution.trim()) {
      errors.push('Institution is required');
    }

    if (!formData.department.trim()) {
      errors.push('Department is required');
    }

    if (!formData.role.trim()) {
      errors.push('Designation is required');
    }

    if (!formData.phone.trim()) {
      errors.push('Phone number is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else {
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
      }
    }

    if (!formData.shiftSchedule) {
      errors.push('Shift Schedule is required');
    }

    if (selectedDays.length === 0) {
      errors.push('At least one weekend day must be selected');
    }

    if (fileList.length === 0 && !id) {
      errors.push('Profile picture is required');
    }

    return errors;
  };

  const handleSubmit = async () => {
    try {
      // Validate all required fields
      const validationErrors = validateForm();

      if (validationErrors.length > 0) {
        // Show first validation error
        message.error(validationErrors[0]);
        return;
      }

      // Convert selected days to full names
      const weekendFullNames = selectedDays.map(day => dayMapping[day]);

      // Find the selected institution, department, and designation IDs
      const selectedInstitution = institutionData?.data?.data?.find(
        inst => inst.institutionName === formData.institution
      );

      const selectedDepartment = filteredDepartments.find(
        dept => dept.departmentName === formData.department
      );

      const selectedDesignation = filteredDesignations.find(
        desig => desig.designationName === formData.role
      );

      const selectedShift = shiftData?.data?.data?.find(
        shift => `${shift.shiftStartTime} - ${shift.shiftEndTime}` === formData.shiftSchedule
      );

      // Prepare form data for API
      const apiFormData = new FormData();

      // Add basic fields
      apiFormData.append('employeeID', formData.employeeId);
      apiFormData.append('name', formData.employeeName);
      apiFormData.append('email', formData.email);
      apiFormData.append('phone', formData.phone);

      // Add IDs instead of names
      if (selectedInstitution) apiFormData.append('institutionID', selectedInstitution._id);
      if (selectedDepartment) apiFormData.append('departmentID', selectedDepartment._id);
      if (selectedDesignation) apiFormData.append('designationID', selectedDesignation._id);
      if (selectedShift) apiFormData.append('shiftSchedule', selectedShift._id);

      // Add weekend days as full names
      weekendFullNames.forEach(day => {
        apiFormData.append('weekend', day);
      });

      // Add profile image if uploaded (only if it's a new file)
      if (fileList.length > 0 && fileList[0].originFileObj) {
        apiFormData.append('profileImage', fileList[0].originFileObj);
      }

      let result;

      if (id) {
        // Update existing employee
        result = await updateEmployee({ id, formData: apiFormData }).unwrap();
        console.log('Employee updated successfully:', result);

        // Manually refetch the employee data after successful update
        await refetchEmployee();

      } else {
        // Create new employee
        result = await createEmployee(apiFormData).unwrap();
        console.log('Employee created successfully:', result);
      }

      router('/employee-management');
      message.success(result?.message || `Employee ${id ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Error creating/updating employee:', error);
      message.error(error?.data?.message || `Failed to ${id ? 'update' : 'create'} employee. Please try again.`);
    }
  };

  const uploadProps = {
    listType: "picture-card",
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must be smaller than 2MB!');
        return false;
      }
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        originFileObj: file,
      }]);
      return false; // Prevent automatic upload
    },
    fileList,
    accept: 'image/*',
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
      showDownloadIcon: false,
    }
  };

  function convertTime(dateOrTime) {
    const date = new Date(dateOrTime);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }

  // Show loading state while fetching employee data for edit
  if (id && isLoading) {
    return (
      <div className="w-full p-4 sm:p-6 flex justify-center items-center">
        <div>Loading employee data...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className={`w-full ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className={`flex justify-between items-center ${isMobile ? 'mb-4' : 'mb-6'}`}>
          <div className="flex items-center">
            <div onClick={() => window.history.back()} className="h-7 w-7 cursor-pointer rounded-sm flex items-center justify-center mr-2">
              <img src="/icons/PageBack.png" alt="" />
            </div>
            <h5 className={`m-0 font-medium ${isMobile ? 'text-base' : ''}`}>
              {id ? 'Edit Employee' : 'Add New Employee'}
            </h5>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-x-6 gap-y-6'} border p-4 sm:p-6 rounded-lg border-primary`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID*</label>
            <Input
              placeholder="Set Employee ID"
              value={formData.employeeId}
              onChange={(e) => handleChange('employeeId', e.target.value)}
              status={!formData.employeeId.trim() ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name*</label>
            <Input
              placeholder="Dr. John Doe"
              value={formData.employeeName}
              onChange={(e) => handleChange('employeeName', e.target.value)}
              status={!formData.employeeName.trim() ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Institution*</label>
            <Select
              className="w-full"
              placeholder="Select Institution"
              value={formData.institution || undefined}
              onChange={handleInstitutionChange}
              loading={instituteLoading}
              status={!formData.institution.trim() ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            >
              {institutionData?.data?.data?.map((institution) => (
                <Select.Option
                  key={institution._id}
                  value={institution.institutionName}
                >
                  {institution.institutionName}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Department*</label>
            <Select
              className="w-full"
              placeholder={selectedInstitutionId ? "Select Department" : "First select Institution"}
              value={formData.department || undefined}
              onChange={(value) => handleChange('department', value)}
              loading={departmentLoading}
              disabled={!selectedInstitutionId}
              status={!formData.department.trim() ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            >
              {filteredDepartments.map((department) => (
                <Select.Option
                  key={department._id}
                  value={department.departmentName}
                >
                  {department.departmentName}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Designation*</label>
            <Select
              className="w-full"
              placeholder={selectedInstitutionId ? "Select Designation" : "First select Institution"}
              value={formData.role || undefined}
              onChange={(value) => handleChange('role', value)}
              loading={designationLoading}
              disabled={!selectedInstitutionId}
              status={!formData.role.trim() ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            >
              {filteredDesignations.map((designation) => (
                <Select.Option
                  key={designation._id}
                  value={designation.designationName}
                >
                  {designation.designationName}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
            <Input
              placeholder="+123 456 7890"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              status={!formData.phone.trim() ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Shift Schedule*</label>
            <Select
              className="w-full"
              placeholder="Select Shift"
              value={formData.shiftSchedule || null}
              onChange={(value) => handleChange('shiftSchedule', value)}
              loading={shiftLoading}
              allowClear
              size={isMobile ? 'large' : 'middle'}
            >
              {shiftData?.data?.data?.map((shift) => (
                <Select.Option
                  key={shift._id}
                  value={`${shift.shiftStartTime} - ${shift.shiftEndTime}`}
                >
                  {convertTime(shift.shiftStartTime)} - {convertTime(shift.shiftEndTime)}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <Input
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              status={!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'error' : ''}
              size={isMobile ? 'large' : 'middle'}
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Weekend*</label>
            <div className={`flex flex-wrap gap-2 border rounded-lg p-[5px] ${selectedDays.length === 0 ? 'border-red-500' : ''}`}>
              {days.map(day => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`${isMobile ? 'w-10 h-7 text-xs' : 'w-12 h-8'} border rounded-md flex items-center justify-center ${selectedDays.includes(day)
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Picture*</label>
            <Upload {...uploadProps}>
              {fileList.length >= 1 ? null : (
                <div className="flex flex-col items-center">
                  <UploadOutlined className={isMobile ? "text-xl" : "text-2xl"} />
                  <div className={`${isMobile ? 'mt-1 text-xs' : 'mt-2'}`}>Upload</div>
                </div>
              )}
            </Upload>
          </div>

          <div className={`${isMobile ? 'col-span-1' : 'col-span-2'} flex justify-end items-end mt-4`}>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={id ? updateEmployeeLoading : createEmployeeLoading}
              className="bg-[#336C79] hover:bg-[#336C79]"
              size={isMobile ? 'large' : 'middle'}
              block={isMobile}
            >
              {id ? 'Update Employee' : 'Create New Employee'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}