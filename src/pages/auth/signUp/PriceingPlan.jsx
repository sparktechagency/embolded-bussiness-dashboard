import { Button, Card, Form, Input, message, Modal, Typography } from 'antd';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCreateCheckOutMutation, useGetAllPlanQuery } from '../../../features/plan/planApi';
import { useGetProfileQuery } from '../../../features/settings/settingApi';

const { Title, Text } = Typography;

// Custom check icon component
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

// Feature item component
const FeatureItem = ({ children }) => (
  <div className="flex items-center mb-3">
    <CheckIcon />
    <span className="ml-2 text-gray-600">{children}</span>
  </div>
);

// Plan Purchase Modal
const PlanPurchaseModal = ({ visible, onClose, selectedPlan }) => {
  const [form] = Form.useForm();
  const [totalEmployees, setTotalEmployees] = useState(1);
  const [createCheckOut, { isLoading }] = useCreateCheckOutMutation();
  const router = useNavigate();

  if (!selectedPlan) return null;

  const calculateTotal = () => {
    return (selectedPlan.pricePerEmployee * totalEmployees).toFixed(2);
  };

  const handleBuy = async (values) => {
    try {
      // Here you would integrate with your payment/purchase API
      const purchaseData = {
        packageId: selectedPlan._id,
        totalEmployees: parseInt(values.totalEmployees),
      };

      const response = await createCheckOut(purchaseData).unwrap();
      console.log("Purchase Response:", response);
      if (response.success) {
        window.location.href = response.data.url; // Redirect to payment page
      }

      // Simulate API call
      message.success(response.data.message || `Successfully initiated purchase for ${selectedPlan.title} plan!`);
      // onClose();
      // form.resetFields();
    } catch (error) {
      console.error("Purchase Error:", error);
      message.error(error?.data?.message || "An error occurred while processing your purchase.");
    }
  };

  const handleEmployeeChange = (value) => {
    const numValue = parseInt(value) || 1;
    setTotalEmployees(Math.max(1, numValue));
  };

  return (
    <Modal
      title="Complete Your Purchase"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      <div className="py-4">
        {/* Plan Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full mr-4">
              <img src={selectedPlan.icon} alt={selectedPlan.title} className="w-8 h-8" />
            </div>
            <div>
              <Title level={4} className="mb-1">{selectedPlan.title}</Title>
              <Text className="text-gray-600">
                ${selectedPlan.pricePerEmployee}/employee • {
                  selectedPlan.billingCycle === 'YEAR'
                    ? selectedPlan.discount
                      ? `Billed yearly with ${selectedPlan.discountValue} months free`
                      : 'Billed annually'
                    : 'Billed monthly'
                }
              </Text>
            </div>
          </div>

          {/* Plan Features */}
          <div className="border-t pt-4">
            <Text strong className="block mb-3">Plan includes:</Text>
            <div className="grid grid-cols-1 gap-2">
              {selectedPlan.features.slice(0, 3).map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
              {selectedPlan.features.length > 3 && (
                <Text className="text-gray-500 ml-7">
                  +{selectedPlan.features.length - 3} more features
                </Text>
              )}
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleBuy}
          initialValues={{ totalEmployees: 1 }}
        >
          <Form.Item
            label="Total Number of Employees"
            name="totalEmployees"
            rules={[
              { required: true, message: 'Please enter the number of employees' },
            ]}
          >
            <Input
              type="number"
              placeholder="Enter total employees"
              size="large"
              onChange={(e) => handleEmployeeChange(e.target.value)}
              className="w-full"
            />
          </Form.Item>

          {/* Pricing Breakdown */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <Text>Price per employee:</Text>
              <Text strong>${selectedPlan.pricePerEmployee}</Text>
            </div>
            <div className="flex justify-between items-center mb-2">
              <Text>Number of employees:</Text>
              <Text strong>{totalEmployees}</Text>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <Text strong className="text-lg">Total Amount:</Text>
                <Text strong className="text-xl text-primary">
                  ${calculateTotal()}
                  <span className="text-sm text-gray-500 ml-1">
                    /{selectedPlan.billingCycle === 'YEAR' ? 'year' : 'month'}
                  </span>
                </Text>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              size="large"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Form.Item className="mb-0 flex-1">
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="bg-primary"
              >
                Buy Now - ${calculateTotal()}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

// Plan card component
const PlanCard = ({
  icon,
  title,
  price,
  billingCycle,
  discount,
  discountValue,
  description,
  features,
  onGetStarted,
  planData
}) => {
  // Determine the billing text based on the billing cycle
  const billingText = billingCycle === 'YEAR'
    ? discount
      ? `Billed yearly with ${discountValue} months free`
      : 'Billed annually'
    : 'Billed monthly';

  return (
    <Card className="w-full h-full flex flex-col rounded-xl">
      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4">
          <img src={icon} alt={title} />
        </div>
        <Text className="font-medium text-lg text-primary">{title}</Text>
        <div className="mt-2 mb-1">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-xl text-gray-500">/employee</span>
        </div>
        <Text className="text-gray-500 mb-4">{billingText}</Text>
      </div>

      <div className="flex-grow mb-4">
        <Text className="text-gray-600">{description}</Text>
      </div>

      <div className="flex-grow">
        {features.map((feature, index) => (
          <FeatureItem key={index}>{feature}</FeatureItem>
        ))}
      </div>

      <Button
        type="primary"
        size="large"
        block
        className="mt-4"
        onClick={() => onGetStarted(planData)}
      >
        Get started
      </Button>
    </Card>
  );
};

const PricingPlans = () => {
  const { data, isLoading, error } = useGetAllPlanQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { data: profileData } = useGetProfileQuery();

  if (profileData?.data?.isSubscribed) {
    return <Navigate to="/" replace />;
  }




  // Default features for each plan type
  const planFeatures = {
    UNIONIZED: [
      "Union workforce management",
      "Collective bargaining tools",
      "Labor contract management",
      "Union reporting and analytics",
      "Dedicated union support"
    ],
    NON_UNIONIZED: [
      "Basic workforce management",
      "Employee communication tools",
      "Standard reporting",
      "Up to 50 employees",
      "Basic email support"
    ]
  };

  // Map API data to plan format
  const mapApiDataToPlans = (apiData) => {
    if (!apiData || !apiData.data) return [];

    return apiData.data.map(plan => {
      // Determine icon based on plan type
      const icon = plan.isUnionized
        ? "/icons/priceplan/plan2.png"
        : "/icons/priceplan/plan1.png";

      // Format title
      const title = plan.planName
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      // Get appropriate features
      const features = plan.isUnionized
        ? planFeatures.UNIONIZED
        : planFeatures.NON_UNIONIZED;

      return {
        ...plan,
        icon,
        title,
        price: plan.pricePerEmployee,
        features
      };
    });
  };

  const handleGetStarted = (planData) => {
    setSelectedPlan(planData);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedPlan(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading plans...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Error loading plans. Please try again later.</div>
      </div>
    );
  }

  // Get plans from API
  const plans = data && data.success ? mapApiDataToPlans(data) : [];

  return (
    <div className="min-h-screen flex flex-col justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 text-sm font-medium text-white bg-primary rounded-full mb-4">
            Pricing plans
          </div>
          <Title level={2} className="text-4xl font-bold mb-4">Plans for all sizes</Title>
          <Text className="text-xl text-gray-500">
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </Text>
        </div>

        {/* Plans grid */}
        <div className="w-10/12 mx-auto">
          {plans.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={plan._id || index} className="flex">
                  <PlanCard
                    {...plan}
                    onGetStarted={handleGetStarted}
                    planData={plan}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <Text>No plans available at the moment.</Text>
            </div>
          )}
        </div>
      </div>

      {/* Purchase Modal */}
      <PlanPurchaseModal
        visible={modalVisible}
        onClose={handleModalClose}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default PricingPlans;