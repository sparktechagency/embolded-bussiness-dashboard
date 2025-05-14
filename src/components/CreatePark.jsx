import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Upload, Checkbox, Button, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const CreatePark = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const uploadButton = (
    <div className="upload-button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // Function to handle input change and clear validation errors
  const handleInputChange = (fieldName) => {
    const fieldValue = form.getFieldValue(fieldName);
    if (fieldValue) {
      form.setFields([{
        name: fieldName,
        errors: [],
      }]);
    }
  };

  return (
    <div className="create-park-container border border-primary  rounded-lg shadow" style={{ margin: '0 auto', padding: '20px' , height:"90vh" , marginTop:"20px"}}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="parking-spot-form"
      >
        <Row gutter={[20, 16]}>
          <Col span={8}>
            <Form.Item
              name="parkingSpotName"
              label="Parking Spot Name"
              rules={[{ 
                required: true, 
                message: 'Parking spot name is required' 
              }]}
            >
              <Input 
                style={{padding:"10px"}}
                placeholder="Enter parking spot name" 
                onChange={() => handleInputChange('parkingSpotName')}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="parkingSpotType"
              label="Parking Spot Type"
              rules={[{ 
                required: true, 
                message: 'Please select a parking spot type' 
              }]}
            >
              <Select 
                style={{height:"43px"}}
                placeholder="Select spot type"
                onChange={() => handleInputChange('parkingSpotType')}
              >
                <Option value="business">Business</Option>
                <Option value="residential">Residential</Option>
                <Option value="public">Public</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="totalSlotAvailable"
              label="Total Slots Available"
              rules={[{ 
                required: true, 
                message: 'Please specify total available slots',
                type: 'number',
                min: 1,
              }]}
            >
              <Input 
                type="number" 
                style={{padding:"10px"}}
                placeholder="Enter available slots"
                min={1}
                onChange={() => handleInputChange('totalSlotAvailable')}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="location"
              label="Location Coordinates"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value?.latitude && !value?.longitude) {
                      return Promise.reject(new Error('Both latitude and longitude are required'));
                    }
                    if (!value?.latitude) {
                      return Promise.reject(new Error('Latitude is required'));
                    }
                    if (!value?.longitude) {
                      return Promise.reject(new Error('Longitude is required'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Group compact>
                <Form.Item
                  name={['location', 'latitude']}
                  noStyle
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      pattern: /^-?([1-8]?[1-9]|[1-9]0)\.\d{1,6}$/,
                      message: 'Invalid latitude format'
                    }
                  ]}
                >
                  <Input 
                    style={{ width: '50%', padding: "10px" }} 
                    placeholder="Latitude (e.g., 40.7128)"
                    onChange={() => {
                      const lat = form.getFieldValue(['location', 'latitude']);
                      const lng = form.getFieldValue(['location', 'longitude']);
                      if (lat && lng) {
                        form.validateFields(['location']);
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={['location', 'longitude']}
                  noStyle
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      pattern: /^-?((1[0-7]|[1-9])?\d(\.\d{1,6})?|180(\.0{1,6})?)$/,
                      message: 'Invalid longitude format'
                    }
                  ]}
                >
                  <Input 
                    style={{ width: '50%', padding: "10px" }} 
                    placeholder="Longitude (e.g., -74.0060)"
                    onChange={() => {
                      const lat = form.getFieldValue(['location', 'latitude']);
                      const lng = form.getFieldValue(['location', 'longitude']);
                      if (lat && lng) {
                        form.validateFields(['location']);
                      }
                    }}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="billingType"
              label="Pricing"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value?.dayPrice && !value?.weeklyPrice) {
                      return Promise.reject(new Error('At least one pricing option is required'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Group compact>
                <Form.Item
                  name={['billingType', 'dayPrice']}
                  noStyle
                  rules={[
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: 'Invalid price format'
                    }
                  ]}
                >
                  <Input 
                    style={{ width: '50%', padding: "10px" }} 
                    placeholder="Daily rate ($)" 
                    onChange={() => {
                      const dayPrice = form.getFieldValue(['billingType', 'dayPrice']);
                      const weeklyPrice = form.getFieldValue(['billingType', 'weeklyPrice']);
                      if (dayPrice || weeklyPrice) {
                        form.setFields([{
                          name: 'billingType',
                          errors: [],
                        }]);
                      }
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={['billingType', 'weeklyPrice']}
                  noStyle
                  rules={[
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: 'Invalid price format'
                    }
                  ]}
                >
                  <Input 
                    style={{ width: '50%', padding: "10px" }} 
                    placeholder="Weekly rate ($)" 
                    onChange={() => {
                      const dayPrice = form.getFieldValue(['billingType', 'dayPrice']);
                      const weeklyPrice = form.getFieldValue(['billingType', 'weeklyPrice']);
                      if (dayPrice || weeklyPrice) {
                        form.setFields([{
                          name: 'billingType',
                          errors: [],
                        }]);
                      }
                    }}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
  <Form.Item
    name="amenities"
    label="Amenities"
    style={{ height: "auto", minHeight: "80px" }} // Increased height here
    rules={[
      { 
        required: true,
        type: 'array',
        min: 1,
        message: 'Please select at least one amenity'
      }
    ]}
  >
    <Select 
      mode="multiple" 
      placeholder="Select available amenities (at least one required)"
      style={{ 
        width: '100%',
        height: '45px', // Allows the select to grow with content
        minHeight: '40px' // Minimum height
      }}
      dropdownStyle={{ zIndex: 2000 }} // Optional: ensures dropdown appears above other elements
      onChange={() => {
        const amenities = form.getFieldValue('amenities');
        if (amenities && amenities.length > 0) {
          form.setFields([{
            name: 'amenities',
            errors: [],
          }]);
        }
      }}
    >
      <Option value="cctv">CCTV Surveillance</Option>
      <Option value="security">24/7 Security</Option>
      <Option value="lighting">Adequate Lighting</Option>
      <Option value="ev">EV Charging</Option>
      <Option value="covered">Covered Parking</Option>
    </Select>
  </Form.Item>
</Col>

<Col span={24}>
  <Form.Item
    name="dates"
    label="Operating Dates & Times"
  >
    <Input.Group compact style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Item
        name={['dates', 'openDate']}
        noStyle
      >
        <DatePicker 
          style={{ width: '33%', height: '43px' }} 
          placeholder="Opening date" 
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
      <Form.Item
        name={['dates', 'closeDate']}
        noStyle
      >
        <DatePicker 
          style={{ width: '33%', height: '43px' }} 
          placeholder="Closing date" 
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
      <Form.Item
        name={['dates', 'bookingTime']}
        noStyle
      >
        <DatePicker.RangePicker 
          style={{ width: '34%', height: '43px' }} 
          placeholder={['Booking start', 'Booking end']} 
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
        />
      </Form.Item>
    </Input.Group>
  </Form.Item>
</Col>

          <Col span={12}>
            <Form.Item
            
              name="availabilityServiceDays"
              label="Availability"
              rules={[{ 
                required: true, 
                message: 'Please select at least one day' 
              }]}
            >
              <Checkbox.Group 
              style={{border:"1px solid #E8505B", padding:"14px", borderRadius:"10px"}}
                options={[
                  { label: 'Sunday', value: 'sunday' },
                  { label: 'Monday', value: 'monday' },
                  { label: 'Tuesday', value: 'tuesday' },
                  { label: 'Wednesday', value: 'wednesday' },
                  { label: 'Thursday', value: 'thursday' },
                  { label: 'Friday', value: 'friday' },
                  { label: 'Saturday', value: 'saturday' },
                ]}
                onChange={() => handleInputChange('availabilityServiceDays')}
              />
            </Form.Item>

            <Form.Item
              name="uploadPicture"
              label="Parking Spot Images"
            
              rules={[{ 
                required: true, 
                message: 'At least one image is required' 
              }]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e.fileList}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                accept="image/*"
                multiple
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ 
                required: true, 
                message: 'Please provide a description' 
              }]}
            >
              <TextArea 
                rows={4} 
                placeholder="Describe your parking spot (features, size, restrictions, etc.)" 
                showCount 
                maxLength={500}
                onChange={() => handleInputChange('description')}
              />
            </Form.Item>

            <Form.Item
              name="termsConditions"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) => 
                    value ? Promise.resolve() : Promise.reject('You must accept the terms and conditions')
                }
              ]}
            >
              <Checkbox>
                I accept the <a href="#">Terms & Conditions</a> and <a href="#">Parking Rules</a>
              </Checkbox>
            </Form.Item>
            
          </Col>

          <Col span={24}>
  <Form.Item>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button 
        type="primary" 
        htmlType="submit" 
        style={{ 
          height: '45px',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        Create New Parking Spot
      </Button>
    </div>
  </Form.Item>
</Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePark;