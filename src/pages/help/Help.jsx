import { ConfigProvider, Col, Row, Input, Button, Collapse, Form, message } from 'antd';
import { useCreateContactMutation } from '../../features/help/helpApi';
const { TextArea } = Input;

const inputStyle = { height: "50px" };

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


const Help = () => {
  const [form] = Form.useForm();
  const [createContact,{isLoading}] = useCreateContactMutation();

  const onFinish =async (values) => {
    const data = {
      name:"pronab kumar",
      firstName: values.firstName,
      lastName:values.lastName,
      email:values.email,
      phone:values.phone,
      message:values.message
    }

    try {
          const response = await createContact(data).unwrap();
          // message.success(response?.message)
    } catch (error) {
          // message.error("message not send some problem")
    }
    // message.success('Message sent successfully!');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    // message.error('Failed:', errorInfo);
  };

  // const onChange = (key) => {
  //   message.success(key);
  // };

  return (
    <div className='w-full p-10'>
      <div className="border border-primary rounded-md px-10 py-20">
        <div className='basis-[70%]'>
          <div className='w-full mx-auto'>
            <h2 className='text-4xl font-bold'>Get In Touch</h2>
           <div className='py-5 flex flex-col gap-2'>
             <p className=' text-gray-600 text-sm'>Likewise, a range of activities enriches life, blending vigor with balance. The result is a </p>
           <p className=' text-sm text-gray-600'>lifestyle that’s not only dynamic but also deeply rewarding.</p>
           </div>
              <Form
                form={form}
                name="help_form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row gutter={[16, 24]} className='py-1'>
                  <Col span={12} className="gutter-row">
                    <Form.Item
                      name="firstName"
                      rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                      <Input size="large" style={inputStyle} placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="gutter-row">
                    <Form.Item
                      name="lastName"
                      rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                      <Input size="large" style={inputStyle} placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 24]} className='py-1'>
                  <Col span={12} className="gutter-row">
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' }
                      ]}
                    >
                      <Input size="large" style={inputStyle} placeholder="Email" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="gutter-row">
                    <Form.Item
                      name="phone"
                      rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                      <Input size="large" style={inputStyle} placeholder="Phone Number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className='py-1'>
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
                <div style={{ display: 'flex', justifyContent: 'center', padding: "0px 0px" }}>
                  <Button
                    loading={isLoading}
                    type="primary"
                    htmlType="submit"
                    className="w-4/12"
                    size='large'
                  >
                    Send message
                  </Button>
                </div>
              </Form>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Help;