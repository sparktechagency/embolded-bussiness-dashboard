// src/components/Sidebar.jsx
import { Button, Modal } from "antd";
import { useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Contact,
  DashboardIcon,
  DepartmentManagement,
  EmployeeManagement,
  HolidayManagement,
  InstituteManagement,
  LocationMangement,
  LoginCanditad,
  Privacy,
  ProfileSection,
  ShiftManagement,
  Subscription,
  Terms,
} from "../components/Icons/Icons";
import { logout } from "../features/auth/authSlice";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const role = localStorage.getItem("role");

  const allMenuItems = [
    {
      path: "/",
      name: "Dashboard Overview",
      icon: <DashboardIcon />,
      roles: ["BUSINESS_OWNER", "SUPER_ADMIN", "DEPARTMENT_MANAGER", "HR"],
    },
    {
      path: "/institution_management",
      name: "Institution Management",
      icon: <InstituteManagement />,
      roles: ["BUSINESS_OWNER"],
    },
    {
      path: "/department-management",
      name: "Department Management",
      icon: <DepartmentManagement />,
      roles: ["HR"],
    },
    {
      path: "/employee-management",
      name: "Employee Management",
      icon: <EmployeeManagement />,
      roles: ["BUSINESS_OWNER", "SUPER_ADMIN", "DEPARTMENT_MANAGER", "HR"],
    },
    {
      path: "/holiday-management",
      name: "Holiday Management",
      icon: <HolidayManagement />,
      roles: ["BUSINESS_OWNER", "HR"],
    },
    {
      path: "/shift-management",
      name: "Shift Management",
      icon: <ShiftManagement />,
      roles: ["BUSINESS_OWNER", "SUPER_ADMIN", "DEPARTMENT_MANAGER", "HR"],
    },
    {
      path: "/login-credentials",
      name: "Login Credentials",
      icon: <LoginCanditad />,
      roles: ["BUSINESS_OWNER", "HR"],
    },
    {
      path: "/location-management",
      name: "Location Management",
      icon: <LocationMangement />,
      roles: ["BUSINESS_OWNER", "HR"],
    },
    {
      path: "/subscription",
      name: "Subscription",
      icon: <Subscription />,
      roles: ["BUSINESS_OWNER"],
    },
    {
      path: "/help",
      name: "Contact Us",
      icon: <Contact />,
      roles: ["BUSINESS_OWNER"],
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <ProfileSection />,
      roles: ["BUSINESS_OWNER", "SUPER_ADMIN", "DEPARTMENT_MANAGER", "HR"],
    },
    {
      path: "/terms-conditions",
      name: "Terms & Conditions",
      icon: <Terms />,
      roles: ["BUSINESS_OWNER"],
    },
    {
      path: "/privacy-policy",
      name: "Privacy Policy",
      icon: <Privacy />,
      roles: ["BUSINESS_OWNER"],
    },
  ];

  const menuItems = allMenuItems.filter((item) => {
    if (!role) return false;
    return item.roles.includes(role);
  });

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
    localStorage.clear();
    setIsLogoutModalVisible(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <div className="w-72 h-full bg-white flex flex-col border-r border-gray-200">
      {/* Logo Section */}
      <div className="h-52 border-b border-primary flex flex-col justify-center items-center gap-3 bg-white">
        <img
          src="/icons/dashboard_logo.png"
          alt="Company Logo"
          className="w-20 h-20 cursor-pointer"
        />
        <h3 className="font-medium text-lg select-none">Business Dashboard</h3>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto custom-scrollbar2 pl-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 p-3 rounded-l-lg text-sm font-medium  ${location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/")
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            className="flex items-center gap-3 p-3 text-red-600 font-semibold w-full text-left"
            onClick={showLogoutModal}
          >
            <RiLogoutCircleLine size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        open={isLogoutModalVisible}
        centered
        closable={false}
        onCancel={handleLogoutCancel}
        width={400}
        footer={null}
      >
        <div className="text-center pt-5 pb-6">
          <p className="text-xl font-bold">Do you want to Logout?</p>
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={handleLogoutCancel}
              style={{
                borderColor: "#336C79",
                fontWeight: "bold",
                padding: "10px 30px",
              }}
            >
              No
            </Button>
            <Button
              type="primary"
              onClick={handleLogout}
              style={{
                backgroundColor: "#336C79",
                color: "white",
                padding: "10px 30px",
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;