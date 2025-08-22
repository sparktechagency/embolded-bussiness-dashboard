import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from '../features/plan/planApi';
import { useGetProfileQuery } from '../features/settings/settingApi';

export default function CustomersAccount() {
  const urlParams = new URLSearchParams(window.location.search);
  const stripeCustomerId = urlParams.get('stripeCustomerId');
  const { refetch } = useGetProfileQuery();
  const navigate = useNavigate();
  const [createStripeCustomerAccount, { isLoading }] = useCreateAccountMutation();

  const handleCreateStripeAccount = async () => {
    try {
      const response = await createStripeCustomerAccount({ token: stripeCustomerId }).unwrap();
      console.log("Stripe account created:", response);
      message.success(response.message || "Stripe account created successfully!");
      refetch(); // Refetch profile to update customer account status
      navigate('/pricing-plans');
    } catch (error) {
      console.error("Error creating Stripe account:", error);
      message.error(error?.data?.message || "An error occurred while creating the Stripe account.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-8">
        {/* Right Side - Stripe Account Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md p-6 mx-auto border rounded-lg border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <h3 className="text-4xl font-semibold text-center">Logo</h3>
              <h2 className="text-sm font-normal text-center text-gray-800 md:text-base">
                Set up your payment account to get started
              </h2>
              <p className="text-xs text-center text-gray-600 mt-2">
                Create a Stripe account to manage your payments and transactions securely
              </p>
            </div>

            <div className="w-full mt-8">
              <Button
                type="primary"
                onClick={handleCreateStripeAccount}
                loading={isLoading}
                className="w-full"
                size="large"
              >
                Create a Stripe Account
              </Button>

              <div className="flex items-center justify-center mt-6">
                <p className="text-xs text-gray-500 text-center">
                  By creating an account, you agree to Stripe's terms of service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}