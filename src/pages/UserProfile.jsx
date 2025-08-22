import { Tabs } from 'antd';

import Profile from '../components/Settings/Profile';
import ChangePassword from './ChangePassword';

const AdminProfile = () => {

  const items = [
    {
      key: "1",
      label: "Edit Profile",
      children: <Profile />,
    },
    {
      key: "2",
      label: "Change Password ",
      children: <ChangePassword />,
    },
  ];

  return (
    <div className="w-full ">
      <div className="w-full max-w-7xl bg-white p-3 sm:p-5 rounded-xl shadow-sm">
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="responsive-tabs"
          size="large"
          tabBarStyle={{
            marginBottom: '24px',
            borderBottom: '1px solid #f0f0f0'
          }}
        />
      </div>
    </div>
  );
};

export default AdminProfile;