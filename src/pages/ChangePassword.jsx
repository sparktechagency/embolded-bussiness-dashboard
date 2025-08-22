import { Button, Form, Input, message } from "antd";
import { useChangePasswordMutation } from '../features/settings/settingApi';
// import toast from "react-hot-toast";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = async (values) => {
    try {
      const trimmedValues = {
        currentPassword: values.currentPassword.trim(),
        newPassword: values.newPassword.trim(),
        confirmPassword: values.confirmPassword.trim(),
      };

      // Validate new password and confirm password match
      if (trimmedValues.newPassword !== trimmedValues.confirmPassword) {
        message.error("New password and confirm password do not match");
        return;
      }

      // Validate new password is different from current password
      if (trimmedValues.currentPassword === trimmedValues.newPassword) {
        message.error("New password must be different from current password");
        return;
      }

      // Connect to API to update the password
      const result = await changePassword(trimmedValues).unwrap();
      console.log(result);

      // Show success message and reset form
      message.success("Password updated successfully!");
      form.resetFields();
    } catch (error) {
      // Handle API errors
      if (error.status === 401) {
        message.error("Current password is incorrect");
      } else if (error.data?.message) {
        message.error(error.data.message);
      } else {
        message.error("Failed to update password. Please try again later.");
      }
      console.error("Password update failed:", error);
    }
  };

  // Password validation rules
  const passwordRules = [
    { required: true, message: "Please input your password!" },
    { min: 8, message: "Password must be at least 8 characters long!" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: "Password must contain uppercase, lowercase, number, and special character!",
    },
  ];

  return (
    <div className="w-full bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="w-full bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center sm:text-left">
            Change Password
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 text-center sm:text-left">
            Update your account password to keep your account secure
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={handleChangePassword}
          className="space-y-4 sm:space-y-6"
        >

          {/* Current Password */}
          <Form.Item
            name="currentPassword"
            label={
              <span className="text-sm sm:text-base font-medium text-gray-600">
                Current Password
              </span>
            }
            rules={[
              { required: true, message: "Please input your current password!" },
            ]}
            className="mb-4 sm:mb-6"
          >
            <Input.Password
              placeholder="Enter current password"
              className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
              style={{
                border: "1px solid #E0E4EC",
                borderRadius: "8px",
              }}
              disabled={isLoading}
            />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            name="newPassword"
            label={
              <span className="text-sm sm:text-base font-medium text-gray-600">
                New Password
              </span>
            }
            rules={passwordRules}
            className="mb-4 sm:mb-6"
            hasFeedback
          >
            <Input.Password
              placeholder="Enter new password"
              className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
              style={{
                border: "1px solid #E0E4EC",
                borderRadius: "8px",
              }}
              disabled={isLoading}
            />
          </Form.Item>

          {/* Password Requirements */}
          <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm font-medium text-blue-800 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character (@$!%*?&)</li>
            </ul>
          </div>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label={
              <span className="text-sm sm:text-base font-medium text-gray-600">
                Confirm New Password
              </span>
            }
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords you entered do not match!")
                  );
                },
              }),
            ]}
            className="mb-6 sm:mb-8"
          >
            <Input.Password
              placeholder="Confirm new password"
              className="h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
              style={{
                border: "1px solid #E0E4EC",
                borderRadius: "8px",
              }}
              disabled={isLoading}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="w-full h-10 sm:h-11 lg:h-12 text-sm sm:text-base font-medium bg-primary hover:bg-primary-dark"
              disabled={isLoading}
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </Button>
          </Form.Item>
        </Form>

        {/* Security Note */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs sm:text-sm text-yellow-800">
            <strong>Security Tip:</strong> Choose a strong password that you haven't used elsewhere.
            Consider using a password manager to generate and store secure passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;