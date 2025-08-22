import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Verification = () => {
  const route = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-2xl  w-[882px] py-[100px] text-center">
        <div className="flex justify-center pb-2">
          <img src={"/icons/sucess_sign.png"} alt="" />
        </div>
        <Title level={6} className="text-[40px] pb-2 font-semibold">Sign Up Successful</Title>
        <p className="text-textSecondary font-lg font-medium leading-[40px]">Thank you for log in in to VIP ME! We’re excited to help you buy,<br /> sell, or explore the best car deals.</p>

        <Button
          onClick={() => route('/auth/login')}
          type="primary"
          htmlType="submit"
          className="w-8/12"
          size="large"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default Verification;
