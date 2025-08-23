import { Button, Form, Input, message, Select, Spin } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCredentialsMutation, useGetPerticularCredentialsQuery, useUpdateCredentialsMutation } from '../../features/LoginCredentials/LoginCredentialsApi';

const NewRole = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [createRole, { isLoading }] = useCreateCredentialsMutation();
  const { data, isLoading: GetDataLoading } = useGetPerticularCredentialsQuery(id, { skip: !id });
  const [updateLoginCredentials, { isLoading: updatingLoading }] = useUpdateCredentialsMutation();
  const router = useNavigate();

  useEffect(() => {
    if (id && data?.data) {
      form.setFieldsValue({
        username: data.data.name,
        email: data.data.email,
        role: data.data.role
      });
    }
  }, [id, data, form]);

  const onFinish = async (values) => {
    try {
      if (id) {
        // Update existing user
        const updateData = {
          name: values.username,
          email: values.email,
          role: values?.role
        };
        const response = await updateLoginCredentials({ data: updateData, id }).unwrap();
        message.success(response.data.message || 'User updated successfully');
      } else {
        // Create new user
        const createData = {
          name: values.username,
          email: values.email,
          password: values.password,
          role: values?.role
        };
        const response = await createRole(createData).unwrap();
        message.success(response.data.message || 'User created successfully');
      }
      router("/login-credentials");
      form.resetFields();
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  return (
    <section className="flex flex-col gap-4 mt-4 mx-4 md:mx-8 lg:mt-8 lg:max-w-5xl xl:max-w-6xl">
      <div onClick={() => window.history.back()} className='w-8 h-8 cursor-pointer'>
        <img src="/icons/PageBack.png" alt="Go back" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Left Panel - Role Visualization */}
        <div className="w-full lg:w-1/3 overflow-hidden border border-blue-500 rounded-lg">
          <div className="w-full h-full flex justify-center items-start py-8 md:py-12">
            <Button type='primary' className='w-4/5 md:w-3/5 lg:w-4/5 justify-center'>Executive Role</Button>
          </div>
        </div>

        {/* Right Panel - User Form */}
        <div className="w-full lg:w-2/3 bg-white p-4  border border-blue-500 rounded-lg">
          {
            GetDataLoading ?
              <div className='h-48 flex justify-center items-center'>
                <Spin size='small' />
              </div> :
              <>
                <Form
                  form={form}
                  layout="vertical"
                  className="mt-4 md:mt-6 lg:mt-8 mx-auto max-w-lg"
                  onFinish={onFinish}
                >
                  <Form.Item
                    label={<span className="text-base font-medium">User Name</span>}
                    name="username"
                    className="mb-4 md:mb-6"
                    rules={[{ required: true, message: 'Please input user name!' }]}
                  >
                    <Input placeholder="Enter staff name" className="py-2" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-base font-medium">Email*</span>}
                    name="email"
                    className="mb-4 md:mb-6"
                    rules={[
                      { required: true, message: 'Please input email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input placeholder="Enter staff email" className="py-2" />
                  </Form.Item>

                  {!id && (
                    <Form.Item
                      label={<span className="text-base font-medium">Password</span>}
                      name="password"
                      className="mb-4 md:mb-6"
                      rules={[
                        { required: true, message: 'Please input password!' },
                        { min: 8, message: 'Password must be at least 8 characters!' }
                      ]}
                    >
                      <Input.Password placeholder="Enter Password" className="py-2" />
                    </Form.Item>
                  )}

                  <Form.Item
                    label={<span className="text-base font-medium">Assign Role*</span>}
                    name="role"
                    className="mb-4 md:mb-6"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                  >
                    <Select placeholder="Assign Role" className="w-full">
                      <Select.Option value="HR">HR</Select.Option>
                      <Select.Option value="DEPARTMENT_MANAGER">DEPARTMENT MANAGER</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item className="flex justify-end mt-6 md:mt-8 mb-0">
                    <div className="flex gap-3 w-full xs:w-auto">
                      <Button
                        className="border-gray-300 text-gray-500 px-4 xs:px-6 order-2 xs:order-1 w-full xs:w-auto"
                        onClick={() => form.resetFields()}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        className="text-white px-4 xs:px-6 border-none order-1 xs:order-2 w-full xs:w-auto"
                        htmlType="submit"
                        loading={isLoading || updatingLoading}
                      >
                        {id ? 'Update' : 'Save'}
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </>
          }
        </div>
      </div>
    </section>
  );
};

export default NewRole;