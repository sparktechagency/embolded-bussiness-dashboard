import { createBrowserRouter } from "react-router-dom";
import CustomersAccount from './components/CustomersAccount';
import DepartmentManagement from "./components/DepartmentManagement/DepartmentManagement";
import EmployeeInformation from "./components/EmployeeManagement/EmployeeInformation";
import EmployeeManagement from "./components/EmployeeManagement/EmployeeManagement";
import NewEmploye from "./components/EmployeeManagement/NewEmploye";
import HolidayManagement from "./components/HolidayManagement/HolidayManagement";
import InstitutionManagement from "./components/Institution Management/InstitutionManagement";
import LocationManagement from "./components/LocationManagement/LocationManagement";
import LoginCredentialsMananement from "./components/LoginCredentials/LoginCredentialsMananement";
import NewRole from "./components/LoginCredentials/NewRole";
import ProtectedRoute from './components/ProtectedRoute';
import RequestManagement from "./components/ShiftManagement/request/RequestManagement";
import ShiftManagement from "./components/ShiftManagement/ShiftManagement";
import AllUserTable from "./components/ShiftManagement/ShiftManagementAllUser/AllUserTable";
import SubscriptionManagement from "./components/SubscriptionManagement/SubscriptionManagement";
import Layout from "./layouts/Layout";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotOtp from './pages/auth/ForgotOtp';
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";
import PricingPlans from "./pages/auth/signUp/PriceingPlan";
import SuccessReset from "./pages/auth/SucessReset";
import Verify from "./pages/auth/Verify_user";
import Dashboard from "./pages/dashboard/Dashboard";
import Help from "./pages/help/Help";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },


      {
        path: "institution_management",
        element: <InstitutionManagement />
      },
      {
        path: "institution_management",
        element: <InstitutionManagement />
      },
      {
        path: "department-management",
        element: <DepartmentManagement />
      },
      {
        path: "holiday-management",
        element: <HolidayManagement />
      },

      {
        path: "all-user",
        element: <AllUserTable />
      },

      {
        path: "shift-management",
        children: [
          {
            index: true,
            element: <ShiftManagement />
          },
          {
            path: "all-shifts-request",
            element: <RequestManagement />
          },
          {
            path: "add-new-Employee/:id",
            element: <NewEmploye />
          },
          // {
          //   path: "details",
          //   element: <EmployeeInformation />
          // },
          {
            path: "all-user",
            element: <AllUserTable />
          },
        ]
      },

      {
        path: "location-management",
        element: <LocationManagement />
      },

      {
        path: "subscription",
        element: <SubscriptionManagement />
      },

      {
        path: "employee-management",
        children: [
          {
            index: true,
            element: <EmployeeManagement />
          },
          {
            path: "add-new-Employee",
            element: <NewEmploye />
          },
          {
            path: "add-new-Employee/:id",
            element: <NewEmploye />
          },
          {
            path: "details/:id",
            element: <EmployeeInformation />
          },
        ]
      },



      {
        path: "login-credentials",
        children: [
          {
            index: true,
            element: <LoginCredentialsMananement />
          },
          {
            path: "new-role",
            element: <NewRole />
          },
          {
            path: "new-role/:id",
            element: <NewRole />
          }
        ]
      },


      // {
      //   path: "/settings",
      //   element: <Profile />
      // },
      {
        path: "help",
        element: <Help />
      },
      {
        path: "settings",
        element: <UserProfile />
      },

      {
        path: "notification",
        element: <Notification />
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "terms-conditions",
        element: <TermsConditions />
      },

    ]
  },
  // Authentication routes
  {
    path: "/auth/login",
    element: <Login />
  },
  {
    path: "/auth/signup",
    element: <Signup />
  },
  {
    path: "/auth/success",
    element: <SuccessReset />
  },
  {
    path: "/auth/signup/verify",
    element: <Verify />
  },
  {
    path: "/auth/login/forgot_password",
    element: <ForgotPassword />
  },
  {
    path: "/pricing-plans",
    element: <PricingPlans />
  },
  {
    path: "customers_account",
    element: <CustomersAccount />
  },
  {
    path: "/auth/login/check_email",
    element: <CheckEmail />
  },
  {
    path: "/auth/forgotOTP",
    element: <ForgotOtp />
  },
  {
    path: "/auth/login/set_password",
    element: <SetPassword />
  },
  // 404 Not Found Route
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;