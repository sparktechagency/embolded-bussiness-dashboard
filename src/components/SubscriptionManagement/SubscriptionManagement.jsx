import { CheckCircleOutlined, CheckOutlined } from "@ant-design/icons";
import { Badge, Button, Progress, Spin } from "antd";
import { useState } from "react";
import { useGetAllPlanQuery, useSubscriptionRemainingQuery } from '../../features/plan/planApi';
import { ActiveICon } from "../Icons/Icons";

export default function SubscriptionManagement() {
  const [activeTab, setActiveTab] = useState("enterprise");
  const { data: plansData, isLoading, error } = useGetAllPlanQuery();
  const { data: remainingData, isLoading: remainingLoading } = useSubscriptionRemainingQuery();

  if (isLoading || remainingLoading) {

    return <div className='h-[400px] flex justify-center items-center'><Spin size='small' /></div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const subscription = remainingData?.data;
  const plans = plansData?.data || [];

  // Find the current active plan based on subscription packageId
  const activePlan = plans.find(plan => plan._id === subscription?.packageId);

  // Format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const startDate = subscription?.currentPeriodStart ? formatDate(subscription.currentPeriodStart) : "";
  const endDate = subscription?.currentPeriodEnd ? formatDate(subscription.currentPeriodEnd) : "";
  const daysRemaining = subscription?.remainingDays || 0;

  // Calculate progress percentage based on billing cycle
  const getProgressPercentage = (plan, daysRemaining) => {
    if (plan?.billingCycle === "YEAR") {
      return Math.round((daysRemaining / 365) * 100);
    } else if (plan?.billingCycle === "MONTH") {
      return Math.round((daysRemaining / 30) * 100);
    }
    return 0;
  };

  const progressPercentage = getProgressPercentage(activePlan, daysRemaining);

  return (
    <div className="max-w-7xl p-4 font-sans">
      {/* Header with plan info - Only show if there's an active subscription */}
      {subscription && activePlan && (
        <div className="border max-w-2xl border-gray-200 rounded-md p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex justify-between w-full">
              <h3 className="font-medium text-primary">
                {activePlan.planName?.replace(/_/g, ' ') || 'Enterprise Plan'}
              </h3>
              <div className="flex items-center gap-2">
                <ActiveICon />
                <h3 className="text-base font-medium">{subscription.status || 'Active'}</h3>
              </div>
            </div>
            <Badge
              className="bg-white"
              text={<span className="flex items-center text-green-600 font-medium">
                <CheckCircleOutlined className="mr-1" /> Active
              </span>}
            />
          </div>

          <div className="text-xl font-bold mb-2">{daysRemaining} Days Remaining</div>

          <Progress
            percent={progressPercentage}
            showInfo={false}
            strokeColor="#2c6e7e"
            trailColor="#e6e6e6"
          />

          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <div>Start Date: {startDate}</div>
            <div>End Date: {endDate}</div>
          </div>
        </div>
      )}

      {/* Subscription comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map(plan => {
          const isActivePlan = subscription && plan._id === subscription.packageId;
          const isDisabled = subscription && !isActivePlan;

          return (
            <div
              key={plan._id}
              className={`border rounded-md p-6 flex flex-col ${isActivePlan
                ? "border-0 bg-[#336C79] text-white"
                : "border-gray-200"
                }`}
            >
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActivePlan ? "bg-white" : "bg-gray-100"
                  }`}>
                  {isActivePlan ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  ) : (
                    <img
                      src={plan.isUnionized ? "/icons/priceplan/plan1.png" : "/icons/priceplan/plan2.png"}
                      alt=""
                    />
                  )}
                </div>
              </div>

              <div className={`text-center mb-2 ${isActivePlan ? "text-white" : "text-primary"}`}>
                {plan.planName?.replace(/_/g, ' ')}
              </div>
              <div className="text-center text-3xl font-bold mb-1">
                ${plan.pricePerEmployee}
                {plan.billingCycle === "MONTH" ? "/mth" : "/yr"}
              </div>
              <div className={`text-center text-sm mb-6 ${isActivePlan ? "text-gray-200" : "text-gray-500"}`}>
                Billed {plan.billingCycle.toLowerCase()}.
                {plan.discountValue && ` Save ${plan.discountValue} months free`}
              </div>

              <div className="space-y-3 flex-grow mb-6">
                <div className="flex items-start">
                  {isActivePlan ? (
                    <CheckCircleOutlined className="mt-1 mr-2" />
                  ) : (
                    <CheckOutlined className="text-green-500 mt-1 mr-2" />
                  )}
                  <span>Access to all basic features</span>
                </div>
                <div className="flex items-start">
                  {isActivePlan ? (
                    <CheckCircleOutlined className="mt-1 mr-2" />
                  ) : (
                    <CheckOutlined className="text-green-500 mt-1 mr-2" />
                  )}
                  <span>Advanced reporting and analytics</span>
                </div>
                <div className="flex items-start">
                  {isActivePlan ? (
                    <CheckCircleOutlined className="mt-1 mr-2" />
                  ) : (
                    <CheckOutlined className="text-green-500 mt-1 mr-2" />
                  )}
                  <span>Up to 20 individual users</span>
                </div>
                <div className="flex items-start">
                  {isActivePlan ? (
                    <CheckCircleOutlined className="mt-1 mr-2" />
                  ) : (
                    <CheckOutlined className="text-green-500 mt-1 mr-2" />
                  )}
                  <span>40GB individual data each user</span>
                </div>
                <div className="flex items-start">
                  {isActivePlan ? (
                    <CheckCircleOutlined className="mt-1 mr-2" />
                  ) : (
                    <CheckOutlined className="text-green-500 mt-1 mr-2" />
                  )}
                  <span>Priority chat and email support</span>
                </div>
              </div>

              <Button
                className={`w-full ${isActivePlan ? "bg-[#336C79] border cursor-auto text-white" : ""
                  }`}
                type={isActivePlan ? "default" : "primary"}
                disabled={isDisabled}
              >
                {isActivePlan ? "Current Plan" : "Choose Plan"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}