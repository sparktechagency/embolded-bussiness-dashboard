import { Button, Col, Form, Input, message, Row } from 'antd';
import { useCreateContactsMutation } from '../../features/contact/contactApi';

const { TextArea } = Input;

const inputStyle = { height: "50px" };

const Help = () => {
  const [form] = Form.useForm();
  const [createContact, { isLoading }] = useCreateContactsMutation();

  const onFinish = async (values) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      subject: "Hello world",
      message: values.message,
    };

    try {
      const response = await createContact(data).unwrap();
      message.success(response?.message);
    } catch (error) {
      message.error("Message not sent. Some problem occurred.");
    } finally {
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="">
      <div className="border border-primary rounded-md px-2 py-5 sm:px-8 sm:py-14 md:px-10 md:py-20 sm:max-w-6xl  w-full">
        <div className="w-full mx-auto  sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">Get In Touch</h2>
          <div className="py-5 flex flex-col gap-2 text-center sm:text-left">
            <p className="text-gray-600 text-sm">
              Likewise, a range of activities enriches life, blending vigor with balance. The result is a
            </p>
            <p className="text-sm text-gray-600">
              lifestyle that’s not only dynamic but also deeply rewarding.
            </p>
          </div>

          <Form
            form={form}
            name="help_form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* First Name & Last Name */}
            <Row gutter={[16, 24]} className="py-1">
              <Col xs={24} sm={12}>
                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                  <Input size="large" style={inputStyle} placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                  <Input size="large" style={inputStyle} placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>

            {/* Email & Phone */}
            <Row gutter={[16, 24]} className="py-1">
              <Col xs={24} sm={12}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' },
                  ]}
                >
                  <Input size="large" style={inputStyle} placeholder="Email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="phone"
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input size="large" style={inputStyle} placeholder="Phone Number" />
                </Form.Item>
              </Col>
            </Row>

            {/* Message */}
            <Row className="py-1">
              <Col span={24}>
                <Form.Item
                  name="message"
                  rules={[{ required: true, message: 'Please input your message!' }]}
                >
                  <TextArea
                    showCount
                    maxLength={100}
                    placeholder="Your message"
                    style={{
                      height: 200,
                      resize: 'none',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="flex justify-center py-2">
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12"
                size="large"
              >
                Send message
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Help;