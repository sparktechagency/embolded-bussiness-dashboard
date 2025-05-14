import { Link } from "react-router-dom";


export const menuDatas = [
  {
    icon: "dashboard",
    title: "Dashboard",
    link: "/",
    exact: true
  },
  {
    icon: "order",
    title: "Reservation",
    link: "/reservation"
  },
  {
    icon: "shop",
    title: "Parking Management",
    link: "/parking-management"
  },
  {
    icon: "shop",
    title: "Parking Rules",
    link: <Link to={"/parking-rules"}>CLick me</Link>
  },
  {
    icon: "earning",
    title: "Earning",
    link: "/earning"
  },
  {
    icon: "help",
    title: "Help",
    link: "/help"
  },
  {
    icon: "profile",
    title: "Profile",
    link: "/profile"
  },
  {
    icon: "notification",
    title: "Notification",
    link: "/notification"
  },
  {
    icon: "privacy",
    title: "Privacy Policy",
    link: "/privacy-policy"
  },
  {
    icon: "privacy",
    title: "Terms and Conditions",
    link: "/terms-conditions"
  }
];