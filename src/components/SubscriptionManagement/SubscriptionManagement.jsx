import { useState } from "react";
import { CheckOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Progress, Button, Badge } from "antd";

export default function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState("enterprise");
  
  // Current date info
  const startDate = "March 01, 2025";
  const endDate = "March 30, 2025";
  const daysRemaining = 7;

  
  
  return (
    <div className="max-w-5xl mx-auto p-4 font-sans">
      {/* Header with plan info */}
      <div className="border border-gray-200 rounded-md p-4 mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium text-gray-700">Enterprise Plan</div>
          <Badge 
            className="bg-white" 
            text={<span className="flex items-center text-green-600 font-medium">
              <CheckCircleOutlined className="mr-1" /> Active
            </span>} 
          />
        </div>
        
        <div className="text-xl font-bold mb-2">{daysRemaining}Days Remaining</div>
        
        <Progress 
          percent={Math.round((7/30) * 100)} 
          showInfo={false} 
          strokeColor="#2c6e7e" 
          trailColor="#e6e6e6"
        />
        
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <div>Start Date: {startDate}</div>
          <div>End Date: {endDate}</div>
        </div>
      </div>
      
      {/* Subscription comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Basic Plan */}
        <div className="border border-gray-200 rounded-md p-6 flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c6e7e" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
          </div>
          
          <div className="text-center mb-2 text-gray-600">Basic plan</div>
          <div className="text-center text-3xl font-bold mb-1">$10/mth</div>
          <div className="text-center text-gray-500 text-sm mb-6">Billed annually.</div>
          
          <div className="space-y-3 flex-grow mb-6">
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Access to all basic features</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Basic reporting and analytics</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Up to 10 individual users</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">20GB individual data each user</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Basic chat and email support</span>
            </div>
          </div>
          
          <Button className="w-full" type="default">Choose Plan</Button>
        </div>
        
        {/* Business Plan */}
        <div className="border border-gray-200 rounded-md p-6 flex flex-col">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c6e7e" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12s2 2 4 2 4-2 4-2" />
                <path d="M9 9h.01M15 9h.01" />
              </svg>
            </div>
          </div>
          
          <div className="text-center mb-2 text-gray-600">Business plan</div>
          <div className="text-center text-3xl font-bold mb-1">$20/mth</div>
          <div className="text-center text-gray-500 text-sm mb-6">Billed annually.</div>
          
          <div className="space-y-3 flex-grow mb-6">
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">200+ integrations</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Advanced reporting and analytics</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Up to 20 individual users</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">40GB individual data each user</span>
            </div>
            <div className="flex items-start">
              <CheckOutlined className="text-green-500 mt-1 mr-2" />
              <span className="text-gray-600">Priority chat and email support</span>
            </div>
          </div>
          
          <Button className="w-full" type="default">Choose Plan</Button>
        </div>
        
        {/* Enterprise Plan - Active */}
        <div className="border-0 rounded-md p-6 flex flex-col bg-[#336C79] text-white">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[#336C79] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          
          <div className="text-center mb-2 text-gray-100">Enterprise plan</div>
          <div className="text-center text-3xl font-bold mb-1">$40/mth</div>
          <div className="text-center text-gray-200 text-sm mb-6">Billed annually.</div>
          
          <div className="space-y-3 flex-grow mb-6">
            <div className="flex items-start">
              <CheckCircleOutlined className="text-white mt-1 mr-2" />
              <span>Advanced custom fields</span>
            </div>
            <div className="flex items-start">
              <CheckCircleOutlined className="text-white mt-1 mr-2" />
              <span>Audit log and data history</span>
            </div>
            <div className="flex items-start">
              <CheckCircleOutlined className="text-white mt-1 mr-2" />
              <span>Unlimited individual users</span>
            </div>
            <div className="flex items-start">
              <CheckCircleOutlined className="text-white mt-1 mr-2" />
              <span>Unlimited individual data</span>
            </div>
            <div className="flex items-start">
              <CheckCircleOutlined className="text-white mt-1 mr-2" />
              <span>Personalised priority service</span>
            </div>
          </div>
          
          <Button className="w-full bg-[#336C79] border-0 hover:bg-teal-500 text-white">Running Plan</Button>
        </div>
      </div>
    </div>
  );
}