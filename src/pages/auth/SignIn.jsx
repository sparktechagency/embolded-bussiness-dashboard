import { Button, Form, Input, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { baseURL } from "../../utils/BaseURL";
import { Role } from '../../utils/RoleManage';
import { saveToken } from '../../utils/storage';



export default function LoginPage() {
  const route = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/api/v1/auth/google`;
  };

  const onFinish = async (values) => {
    try {
      const response = await Login(values).unwrap();
      if (response.success) {
        localStorage.setItem("role", response?.data?.user?.role)
        saveToken(response?.data?.token);
        localStorage.setItem("adminLoginId", response?.data?.user?._id);
        route("/");
      }
    } catch (error) {
      message.error(error?.data?.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white ">
      <div className="flex w-full max-w-[1500px] md:flex-row md:items-center md:gap-8 lg:gap-20 border">
        {/* Left Side - Image (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3">
          <img
            src={"/images/login.png"}
            className="object-contain w-full h-auto max-h-[90vh]"
            alt="Login Illustration"
          />


        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3">
          <div className="w-full max-w-md p-6 mx-auto border rounded-lg border-primary md:p-8">
            <div className="flex flex-col items-center justify-center gap-4">
              {/* <img
                src={"/icons/dashboard_logo.png"}
                alt="Ubuntu Bites Logo"
                className="w-auto h-24"
              /> */}
              <h3 className="text-4xl font-semibold text-center">Logo</h3>
              <h2 className="text-sm font-normal text-center text-gray-800 md:text-base">
                Welcome back! Please enter your details.
              </h2>
            </div>

            <Form layout="vertical" onFinish={onFinish} className="w-full mt-6">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Enter your email" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              {/* Role Selection Dropdown */}
              <Form.Item
                name="role"
                label="Select Role"
                rules={[{ required: true, message: "Please select your role!" }]}
              >
                <Select placeholder="Select Your Role" size="large">
                  {Role.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
                </Select>
              </Form.Item>
              <div className="text-end mb-4 select-none">
                <Link
                  to="/auth/login/forgot_password"
                  className="text-gray-800 cursor-pointer hover:underline"
                >
                  Forgot password?
                </Link>
              </div>


              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={isLoading}
              >
                Sign in
              </Button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-2 text-sm text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Button onClick={handleGoogleLogin} className="flex items-center justify-center w-full gap-2 custom-google-btn" size="large">
                <img src={"/icons/google.png"} className="w-[20px] h-[20px]" alt="Google logo" />
                Sign in with Google
              </Button>

              <p className="flex items-center justify-center mt-4 text-sm text-gray-600">
                Don`t have an account?
                <span onClick={() => route('/auth/signup')} className="font-semibold cursor-pointer text-primary hover:underline ml-1">Sign up</span>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}