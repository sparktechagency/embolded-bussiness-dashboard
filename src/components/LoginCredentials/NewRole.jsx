import { Button, Form, Input, Select } from 'antd';

const NewRole = () => {
  const [form] = Form.useForm();

  return (
    <section className="flex flex-col gap-3 mt-10 w-8/12">
      <div onClick={() => window.history.back()} className='w-8 h-8 cursor-pointer'>
        <img src="/icons/PageBack.png" alt="" />
      </div>
      <div className="flex gap-2 w-full">
        {/* Left Panel - Role Visualization */}
        <div className="w-1/3 overflow-hidden border border-primary rounded-lg">
          <div className=" w-full h-full " >
            {/* Vertical line */}
            {/* <button className='w-7/12  bg-primary py-2 mt-2 ml-5 '>Executive Role</button> */}
            <div className='w-full border h-full flex justify-center pt-10'>
              <Button type='primary' className='w-9/12 justify-center'>Executive Role</Button>
            </div>

          </div>
        </div>

        {/* Right Panel - User Form */}
        <div className="w-2/3 bg-white p-8 border border-primary rounded-lg">
          <Form
            form={form}
            layout="vertical"
            className="max-w-lg mx-auto mt-12"
          >
            <Form.Item
              label={<span className="text-base font-medium">User Name</span>}
              name="username"
              className="mb-6"
            >
              <Input placeholder="Enter staff name" className="py-2" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base font-medium">Email*</span>}
              name="email"
              className="mb-6"
              required
            >
              <Input placeholder="Enter staff email" className="py-2" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base font-medium">Password</span>}
              name="password"
              className="mb-6"
            >
              <Input.Password placeholder="Enter Password" className="py-2" />
            </Form.Item>

            <Form.Item
              label={<span className="text-base font-medium">Assign Role*</span>}
              name="role"
              className="mb-6"
              required
            >
              <Select placeholder="Assign Role" className="w-full">
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="executive">Executive</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="staff">Staff</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item className="flex justify-end mt-8 mb-0">
              <div className="space-x-3">
                <Button className="border-gray-300 text-gray-500 px-6">Cancel</Button>
                <Button type="primary" className=" text-white px-6 border-none">Save</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default NewRole;