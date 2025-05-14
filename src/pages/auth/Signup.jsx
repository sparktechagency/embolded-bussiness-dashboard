import { Button, Form, Input, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../features/auth/authApi";
import { baseURL } from "../../utils/BaseURL";

export default function SignupPage() {
  const route = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/api/v1/auth/google`;
  };

  const onFinish = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password
    };

    try {
      const response = await signup(data).unwrap();
      localStorage.setItem("businessLoginId", response?.data?._id);
      route(`/auth/signup/verify?email=${values?.email}`);
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";
      if (error.status === 400) {
        errorMessage = error?.data?.message || errorMessage;
      }
      notification.error({
        message: "Signup Failed",
        description: errorMessage,
      });
    }
  };

  const passwordRules = [
    {
      required: true,
      message: 'Please input your password!'
    },
    () => ({
      validator(_, value) {
        if (!value) {
          return Promise.resolve();
        }

        const errors = [];
        if (value.length < 8) errors.push('at least 8 characters');
        if (!/[a-z]/.test(value)) errors.push('one lowercase letter');
        if (!/[A-Z]/.test(value)) errors.push('one uppercase letter');
        if (!/[0-9]/.test(value)) errors.push('one number');
        if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) errors.push('one special character');

        if (errors.length > 0) {
          return Promise.reject(
            new Error(`Password must contain ${errors.join(', ')}`)
          );
        }
        return Promise.resolve();
      },
    }),
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-7xl flex items-center bg-white rounded-lg">
        <div className="flex flex-col md:flex-row items-center w-full gap-10">
          {/* Form Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/5 xl:w-2/5 2xl:w-1/3 h-[750px] border flex items-center border-primary rounded-lg">
            <div className="flex flex-col items-center w-full max-w-md mx-auto">
              <h3 className="text-4xl font-semibold text-center">Logo</h3>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-center">
                Create an account
              </h2>

              <Form layout="vertical" onFinish={onFinish} className="w-full">
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your full name"
                    className="py-2 px-4 rounded-lg border border-gray-300 focus:border-primary"
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    className="py-2 px-4 rounded-lg border border-gray-300 focus:border-primary"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={passwordRules}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter your password"
                    className="py-2 px-4 rounded-lg border border-gray-300 focus:border-primary"
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    placeholder="Confirm your password"
                    className="py-2 px-4 rounded-lg border border-gray-300 focus:border-primary"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg"
                  >
                    Create Account
                  </Button>
                </Form.Item>

                <div className="flex items-center mb-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <div className="px-3 text-gray-500">or</div>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <Button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center w-full gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg"
                  size="large"
                  disabled={isLoading}
                >
                  <img
                    src="/icons/google.png"
                    className="w-5 h-5"
                    alt="Google logo"
                  />
                  Sign in with Google
                </Button>

                <div className="mt-6 text-center text-gray-600">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="text-primary hover:text-primary-dark font-medium">
                    Login
                  </Link>
                </div>
              </Form>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-3/5 2xl:w-2/3">
            <img
              src="/images/signup.png"
              className="object-cover w-full h-full"
              alt="Signup Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}