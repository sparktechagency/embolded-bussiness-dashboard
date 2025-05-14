import React from 'react';
import { Button, Card, Typography, Space } from 'antd';
import { PlusOutlined, TeamOutlined, RocketOutlined } from '@ant-design/icons';

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

// Plan card component
const PlanCard = ({ icon, title, price, features }) => (
  <Card className="w-full h-full flex flex-col rounded-xl">
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full  mb-4">
        <img src={icon} alt={title} />
      </div>
      <Text className="font-medium text-lg text-primary">{title}</Text>
      <div className="mt-2 mb-1">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-xl text-gray-500">/mth</span>
      </div>
      <Text className="text-gray-500 mb-4">Billed annually.</Text>
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
      className="mt-4 "
    >
      Get started
    </Button>
  </Card>
);

const PricingPlans = () => {
  const plans = [
    {
      icon: "/icons/priceplan/plan1.png",
      title: "Basic plan",
      price: "10",
      features: [
        "Access to all basic features",
        "Basic reporting and analytics",
        "Up to 10 individual users",
        "20GB individual data each user",
        "Basic chat and email support"
      ]
    },
    {
      icon: `/icons/priceplan/plan2.png`,
      title: "Business plan",
      price: "20",
      features: [
        "200+ integrations",
        "Advanced reporting and analytics",
        "Up to 20 individual users",
        "40GB individual data each user",
        "Priority chat and email support"
      ]
    },
    {
      icon: `/icons/priceplan/plan3.png`,
      title: "Enterprise plan",
      price: "40",
      features: [
        "Advanced custom fields",
        "Audit log and data history",
        "Unlimited individual users",
        "Unlimited individual data",
        "Personalised+priority service"
      ]
    }
  ];

  return (
    
        <div className="min-h-screen flex flex-col justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skip button at the top right */}
        <h3 className='text-base cursor-pointer font-medium mb-4 text-end text-primary'>Skip</h3>
        
        {/* Main content */}
        <div className="">
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

          {/* Plans grid - centered with justify-center */}
          <div className="w-10/12 mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div key={index} className="flex">
                  <PlanCard {...plan} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;