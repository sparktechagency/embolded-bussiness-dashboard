import { Button, Modal } from "antd";
import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Contact, DashboardIcon, EmployeeManagement, HolidayManagement, InstituteManagement, Privacy, ShiftManagement, Terms, LocationMangement, Subscription, ProfileSection, LoginCanditad, DepartmentManagement } from "../components/Icons/Icons";
import { logout } from "../features/auth/authSlice";

const Sidebar = () => {
  const location = useLocation();
  const router = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const role = localStorage.getItem("role");
  console.log(role)

  // All possible menu items
  const allMenuItems = [
    {
      path: "/",
      name: "Dashboard Overview",
      icon: <DashboardIcon />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer", "Training Supervisor", "Department Heads", "HR/Employee Manager"]
    },
    {
      path: "/institution_management",
      name: "Institution Management",
      icon: <InstituteManagement />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer"]
    },
    {
      path: "/department-management",
      name: "Department Management",
      icon: <DepartmentManagement />,
      roles: ["HR/Employee Manager"]
    },
    {
      path: "/employee-management",
      name: "Employee Management",
      icon: <EmployeeManagement />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer", "HR/Employee Manager", "Training Supervisor", "Department Heads"]
    },
    {
      path: "/holiday-management",
      name: "Holiday Management",
      icon: <HolidayManagement />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer", "HR/Employee Manager"]
    },
    {
      path: "/shift-management",
      name: "Shift Management",
      icon: <ShiftManagement />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer", "HR/Employee Manager", "Training Supervisor", "Department Heads"]
    },
      {
      path: "/login-credentials",
      name: "Login Credentials",
      icon: <LoginCanditad />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer","HR/Employee Manager"]
    },
    {
      path: "/location-management",
      name: "Location Management",
      icon: <LocationMangement />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer", "HR/Employee Manager"]
    },
  
    {
      path: "/subscription",
      name: "Subscription",
      icon: <Subscription />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer"]
    },

     {
      path: "/help",
      name: "Contact Us",
      icon: <Contact />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer"]
    },
    
    {
      path: "/settings",
      name: "Settings",
      icon: <ProfileSection />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer","HR/Employee Manager", "Training Supervisor", "Department Heads"]
    },
    {
      path: "/terms-conditions",
      name: "Terms & Conditions",
      icon: <Terms />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer", ]
    },
    {
      path: "/privacy-policy",
      name: "Privacy Policy",
      icon: <Privacy />,
      roles: ["Chief Executive Officer", "Chief Operating Officer", "Chief Financial Officer"]
    },
   
  ];

  // Filter menu items based on role
  const menuItems = allMenuItems.filter(item => {
    if (!role) return false;
    return item.roles.includes(role);
  });

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutOk = () => {
    setIsLogoutModalVisible(false);
    router("/auth/login");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router("/auth/login");
    localStorage.clear();
  };

  return (
    <div className="w-[300px] border-r border-r-primary h-screen overflow-y-auto custom-scrollbar2">
      <div className="h-[200px] border-b flex flex-col justify-center items-center gap-3 border-b-primary">
        <div className="flex items-center justify-center">
          <img
            src={"/icons/dashboard_logo.png"}
            title="company logo"
            className=" cursor-pointer w-20 h-20"
          />
        </div>
        <h3 className="font-medium text-[18px] select-none leading-[21px]">
          Business Dashboard
        </h3>
      </div>
      <div className="pl-6">
        <ul className="pt-3">
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              {item.subItems ? (
                <div className="flex flex-col">
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 p-3 pl-5 font-medium rounded-l-lg ${location.pathname === item.path ||
                      location.pathname.startsWith(item.path + "/")
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                      }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`flex items-center gap-2 p-3 pl-10 font-medium rounded-l-lg text-sm ${location.pathname === subItem.path ||
                        location.pathname.startsWith(subItem.path + "/")
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                        }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 p-3 pl-5 font-medium rounded-l-lg ${location.pathname === item.path ||
                    location.pathname.startsWith(item.path + "/")
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        <button
          className="flex items-center gap-2 p-3 pl-5 mb-10 font-semibold"
          onClick={showLogoutModal}
        >
          <span>
            <RiLogoutCircleLine size={20} />
          </span>
          <span>Logout</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        open={isLogoutModalVisible}
        onOk={handleLogoutOk}
        centered
        closable={false}
        onCancel={handleLogoutCancel}
        width={400}
        footer={[
          <div key="footer" style={{ display: 'flex', justifyContent: 'center', gap: '5px', paddingBottom: '20px' }}>
            <Button
              className=""
              key="back"
              onClick={handleLogoutCancel}
              style={{
                borderColor: "#336C79",
                fontWeight: "bold",
                paddingLeft: "50px",
                paddingRight: "50px",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              No
            </Button>,
            <Button
              key="submit"
              type="text"
              onClick={handleLogout}
              style={{
                backgroundColor: "#336C79",
                paddingLeft: "50px",
                paddingRight: "50px",
                paddingTop: "20px",
                paddingBottom: "20px",
                color: "white",
              }}
            >
              Yes
            </Button>
          </div>
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <p className="pt-5 pb-3 text-xl font-bold">Do you want to Logout?</p>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;