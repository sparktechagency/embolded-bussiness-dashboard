import { Button, Form, Input, Select } from 'antd';

const NewRole = () => {
  const [form] = Form.useForm();

  return (
    <section className="flex flex-col gap-3 mt-10">
      <div onClick={() => window.history.back()} className='w-8 h-8 cursor-pointer'>
        <img src="/icons/PageBack.png" alt="" />
      </div>
    <div className="flex gap-2 w-full">
      {/* Left Panel - Role Visualization */}
      <div className="w-1/3 bg-blue-100 relative overflow-hidden border border-gray-300 rounded-lg">
        <div className="absolute w-full h-full bg-blue-100" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 10px, transparent 10px, transparent 20px)" }}>
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-400"></div>

          {/* Node at top */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2 w-8 h-8 bg-blue-500 flex items-center justify-center text-white rounded-md">
            45
          </div>

          {/* Node at left */}
          <div className="absolute left-12 top-1/4 w-8 h-8 bg-blue-500 flex items-center justify-center text-white rounded-md">
            83
          </div>

          {/* Node at right */}
          <div className="absolute right-10 top-1/4 w-8 h-8 bg-blue-500 flex items-center justify-center text-white rounded-md">
            31
          </div>

          {/* Node at bottom */}
          <div className="absolute left-1/2 bottom-12 -translate-x-1/2 w-8 h-8 bg-blue-500 flex items-center justify-center text-white rounded-md">
            55
          </div>

          {/* Executive Role Box */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/4 bg-teal-500 text-white py-3 px-8 rounded-md shadow-lg w-40 text-center">
            Executive Role
          </div>
        </div>
      </div>

      {/* Right Panel - User Form */}
      <div className="w-2/3 bg-white p-8 border border-gray-300 rounded-lg">
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
              <Button type="primary" className="bg-teal-500 text-white px-6 border-none">Save</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
    </section>
  );
};

export default NewRole;