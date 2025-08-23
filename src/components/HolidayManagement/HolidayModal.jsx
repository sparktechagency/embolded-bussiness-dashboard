import { CalendarOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useGetAllInstitutionsQuery } from '../../features/instituteManagement/instituteManagementApi';

const { Option } = Select;

const HolidayModal = ({
  mode = 'create',
  visible,
  onCancel,
  onSubmit,
  initialValues = {},
  createLoading,
  loading
}) => {
  const [form] = Form.useForm();
  const { data: institutes, isLoading: institutesLoading } = useGetAllInstitutionsQuery();

  // Function to convert date string to dayjs object
  const convertToDayjs = (dateString) => {
    if (!dateString) return null;

    // If it's already a dayjs object, return as is
    if (dayjs.isDayjs(dateString)) return dateString;

    // Convert ISO string or any date string to dayjs
    return dayjs(dateString);
  };

  useEffect(() => {
    if (visible) {
      if (mode === 'edit' && initialValues) {
        console.log("Setting form values for edit mode:", initialValues);

        form.setFieldsValue({
          instituteName: initialValues.instituteName,
          type: initialValues.type,
          name: initialValues.name,
          startDate: convertToDayjs(initialValues.startDate),
          endDate: convertToDayjs(initialValues.endDate)
        });
      } else if (mode === 'create') {
        form.resetFields();
      }
    }
  }, [mode, visible, initialValues, form]);

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log("Form values before submission:", values);

        // Format dates for API
        const formattedValues = {
          ...values,
          startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
          endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null
        };

        console.log("Formatted values being sent:", formattedValues);
        onSubmit(formattedValues);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const modalTitle = mode === 'create' ? 'Create New Holiday' : 'Edit Holiday';

  // Get institutes data with proper fallback
  const institutesData = institutes?.data?.data || [];

  return (
    <Modal
      title={<span style={{ fontWeight: "bold", color: "#336C79" }}>{modalTitle}</span>}
      open={visible}
      onCancel={handleCancel}
      footer={(
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            style={{ fontSize: '16px', marginRight: 8, padding: '0 30px', height: '40px' }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            style={{
              fontSize: '16px',
              padding: '0 40px',
              height: '40px',
              backgroundColor: '#336C79',
              borderColor: '#336C79'
            }}
            onClick={handleSubmit}
            loading={createLoading || loading}
            disabled={createLoading || loading}
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </div>
      )}
      closable={true}
      width={500}
      maskClosable={!createLoading}
      destroyOnClose={true}
    >
      {
        institutesLoading ? <div className='h-[300px] flex justify-center items-center'><Spin size='small' /></div> : <>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              type: "GOVERNMENT",
              instituteName: undefined,
              name: "",
              startDate: null,
              endDate: null
            }}
          >
            <Form.Item
              name="instituteName"
              label={<span style={{ fontWeight: "bold" }}>Select Institute</span>}
              rules={[{ required: true, message: 'Please select institute!' }]}
            >
              <Select
                placeholder={institutesLoading ? "Loading institutes..." : "Select institute"}
                size="large"
                loading={institutesLoading}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option?.children?.toLowerCase().includes(input.toLowerCase())
                }
                notFoundContent={institutesLoading ? "Loading..." : "No institutes found"}
              >
                {institutesData.map(item => (
                  <Option key={item._id} value={item._id}>
                    {item.institutionName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="type"
              label={<span style={{ fontWeight: "bold" }}>Holiday Type</span>}
              rules={[{ required: true, message: 'Please select holiday type!' }]}
            >
              <Select placeholder="Select holiday type" size="large" allowClear>
                <Option value="OFFICE">OFFICE</Option>
                <Option value="GOVERNMENT">GOVERNMENT</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="name"
              label={<span style={{ fontWeight: "bold" }}>Holiday Name</span>}
              rules={[
                { required: true, message: 'Please input holiday name!' },
                { min: 2, message: 'Holiday name must be at least 2 characters!' }
              ]}
            >
              <Input placeholder="Write Holiday Name" size="large" />
            </Form.Item>

            <Form.Item label={<span style={{ fontWeight: "bold" }}>Select Date</span>}>
              <Form.Item
                name="startDate"
                style={{ marginBottom: 16 }}
                rules={[{ required: true, message: 'Please select start date!' }]}
              >
                <DatePicker
                  placeholder="Start Date"
                  style={{ width: '100%' }}
                  size="large"
                  suffixIcon={<CalendarOutlined />}
                  format="YYYY-MM-DD"
                  disabledDate={current => current && current < dayjs().startOf('day')}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
                />
              </Form.Item>

              <Form.Item
                name="endDate"
                rules={[
                  { required: true, message: 'Please select end date!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const startDate = getFieldValue('startDate');
                      if (!value || !startDate) return Promise.resolve();
                      if (value.isBefore(startDate)) {
                        return Promise.reject(new Error('End date must be after or equal to start date!'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker
                  placeholder="End Date"
                  style={{ width: '100%' }}
                  size="large"
                  suffixIcon={<CalendarOutlined />}
                  format="YYYY-MM-DD"
                  disabledDate={current => {
                    const startDate = form.getFieldValue('startDate');
                    return startDate ? current && current < startDate : current && current < dayjs().startOf('day');
                  }}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
                />
              </Form.Item>
            </Form.Item>
          </Form>
        </>
      }
    </Modal>
  );
};

export default HolidayModal;