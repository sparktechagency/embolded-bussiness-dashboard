import React, { useState } from 'react';
import { Modal, Button, Form, Input, Tooltip, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const ParkingRules = () => {
  const [rules, setRules] = useState([
    { id: 1, text: 'Price dropped! Save on your favorite items.' },
    { id: 2, text: 'Price dropped! Save on your favorite items.' },
    { id: 3, text: 'Price dropped! Save on your favorite items.' },
    { id: 4, text: 'Price dropped! Save on your favorite items.' },
    { id: 5, text: 'Price dropped! Save on your favorite items.' },
    { id: 6, text: 'Price dropped! Save on your favorite items.' },
    { id: 7, text: 'Price dropped! Save on your favorite items.' },
  ]);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [currentRule, setCurrentRule] = useState(null);
  const [form] = Form.useForm();

  // Edit rule functions
  const showEditModal = (rule) => {
    setCurrentRule(rule);
    form.setFieldsValue({ ruleText: rule.text });
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleEditSubmit = () => {
    form.validateFields().then(values => {
      const updatedRules = rules.map(rule => 
        rule.id === currentRule.id ? { ...rule, text: values.ruleText } : rule
      );
      setRules(updatedRules);
      setIsEditModalVisible(false);
      message.success('Rule updated successfully');
      form.resetFields();
    });
  };

  // Delete rule functions
  const showDeleteModal = (rule) => {
    setCurrentRule(rule);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteConfirm = () => {
    const updatedRules = rules.filter(rule => rule.id !== currentRule.id);
    setRules(updatedRules);
    setIsDeleteModalVisible(false);
    message.success('Rule deleted successfully');
  };

  // Create new rule functions
  const showCreateModal = () => {
    setIsCreateModalVisible(true);
    form.resetFields();
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleCreateSubmit = () => {
    form.validateFields().then(values => {
      const newRule = {
        id: Math.max(...rules.map(rule => rule.id), 0) + 1,
        text: values.ruleText
      };
      setRules([...rules, newRule]);
      setIsCreateModalVisible(false);
      message.success('New rule created successfully');
      form.resetFields();
    });
  };

  return (
    <div className="p-4">
      {/* Header with Create New Offer button */}
      <div className="flex justify-end mb-4">
        <Button 
          type="primary" 
          className="bg-primary hover:bg-primary border-primary text-white"
          onClick={showCreateModal}
        >
          Create New Offer
        </Button>
      </div>

      {/* Parking Rules Section */}
      <div className="bg-primary text-white p-2 text-lg font-medium">
        Parking Rules
      </div>

      {/* Rules List */}
      <div className="border border-gray-200">
        {rules.map((rule, index) => (
          <div 
            key={rule.id} 
            className="flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center mr-3">
                {rule.id}
              </div>
              <span>{rule.text}</span>
            </div>
            <div className="flex space-x-2">
              <Tooltip title="Edit">
                <Button 
                  icon={<EditOutlined />} 
                  onClick={() => showEditModal(rule)}
                  className="border-gray-300"
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button 
                  icon={<DeleteOutlined />} 
                  onClick={() => showDeleteModal(rule)}
                  className="border-gray-300 text-red-500"
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Parking Rules"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleEditSubmit}
            className="bg-primary hover:bg-primary border-primary w-full"
          >
            Save
          </Button>
        ]}
        closable={true}
        closeIcon={<span className="text-black">×</span>}
        width={500}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="flex justify-center mb-6">
            <div className="relative w-3/4">
              <div className="bg-red-100 p-8 rounded flex justify-center items-center border border-gray-200">
                <div className="relative">
                  <div className="bg-white p-8 rounded shadow-md border border-gray-200">
                    <div className="bg-red-100 p-4 rounded flex flex-col justify-center items-center text-center">
                      <div className="mb-2">😕</div>
                      <div className="text-gray-600">NO DATA</div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -mt-3 -mr-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center">
                      <span className="text-white">🔍</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Form.Item
            name="ruleText"
            rules={[{ required: true, message: 'Please input the rule text!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div>
            <ExclamationCircleOutlined className="text-red-500 mr-2" />
            Confirm Delete
          </div>
        }
        open={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            Cancel
          </Button>,
          <Button 
            key="delete" 
            type="primary" 
            danger 
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        ]}
      >
        <p>Are you sure you want to delete this rule?</p>
        {currentRule && <p className="italic">{currentRule.text}</p>}
      </Modal>

      {/* Create New Rule Modal */}
      <Modal
        title="Parking Rules"
        open={isCreateModalVisible}
        onCancel={handleCreateCancel}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleCreateSubmit}
            className="bg-primary hover:bg-primary border-primary w-full"
          >
            Save
          </Button>
        ]}
        closable={true}
        closeIcon={<span className="text-black">×</span>}
        width={500}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="flex justify-center mb-6">
            <div className="relative w-3/4">
              <div className="bg-red-100 p-8 rounded flex justify-center items-center border border-gray-200">
                <div className="relative">
                  <div className="bg-white p-8 rounded shadow-md border border-gray-200">
                    <div className="bg-red-100 p-4 rounded flex flex-col justify-center items-center text-center">
                      <div className="mb-2">😕</div>
                      <div className="text-gray-600">NO DATA</div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -mt-3 -mr-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center">
                      <span className="text-white">🔍</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Form.Item
            name="ruleText"
            rules={[{ required: true, message: 'Please input the rule text!' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter your new parking rule here..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ParkingRules;