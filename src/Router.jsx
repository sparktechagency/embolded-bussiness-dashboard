import { createBrowserRouter } from "react-router-dom";
import CreatePark from "./components/CreatePark";
import EmployeeInformation from "./components/EmployeeManagement/EmployeeInformation";
import EmployeeManagement from "./components/EmployeeManagement/EmployeeManagement";
import NewEmploye from "./components/EmployeeManagement/NewEmploye";
import InstitutionManagement from "./components/Institution Management/InstitutionManagement";
import Layout from "./layouts/Layout";
import CheckEmail from "./pages/auth/CheckEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SetPassword from "./pages/auth/SetPassword";
import Login from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";
import PricingPlans from "./pages/auth/signUp/PriceingPlan";
import SuccessReset from "./pages/auth/SucessReset";
import Verify from "./pages/auth/Verify_user";
import Dashboard from "./pages/dashboard/Dashboard";
import Earning from "./pages/earning/Earning";
import Help from "./pages/help/Help";
import NotFound from "./pages/NotFound";
import Notification from "./pages/Notification";
import ParkingManagement from "./pages/ParkingManagement/ParkingManagement";
import ParkingRules from "./pages/ParkingRules/ParkingRules";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Reservation from "./pages/Reservation/Reservation";
import TermsConditions from "./pages/TermsConditions";
import UserProfile from "./pages/UserProfile";
import HolidayManagement from "./components/HolidayManagement/HolidayManagement";
import ShiftManagement from "./components/ShiftManagement/ShiftManagement";
import RequestManagement from "./components/ShiftManagement/request/RequestManagement";
import LocationManagement from "./components/LocationManagement/LocationManagement";
import SubscriptionManagement from "./components/SubscriptionManagement/SubscriptionManagement";
import Profile from "./components/Settings/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <ProtectedRoute>
      <Layout />
      // </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "reservation",
        element: <Reservation />
      },

      {
        path: "institution_management",
        element: <InstitutionManagement />
      },
      {
        path: "holiday-management",
        element: <HolidayManagement />
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
          {
            path: "details",
            element: <EmployeeInformation />
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
            path: "details",
            element: <EmployeeInformation />
          },
        ]
      },


      {
        path: "parking-management",
        children: [
          {
            index: true,
            element: <ParkingManagement />
          },
          {
            path: "create-new-park",
            element: <CreatePark />
          }
        ]
      },
      {
        path: "parking-rules",
        element: <ParkingRules />
      },


      {
        path: "/settings",
        element: <Profile />
      },
      {
        path: "help",
        element: <Help />
      },
      {
        path: "earning",
        element: <Earning />
      },
      {
        path: "profile",
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
    path: "/auth/login/check_email",
    element: <CheckEmail />
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