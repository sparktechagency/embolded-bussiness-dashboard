// src/components/Navber.jsx
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Card, Input, Spin, Tag } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  useGetBusinessOwnerNotificationQuery,
  useGetHRNotificationQuery,
  useReadBusinessOwnerAllNotificationMutation,
  useReadHRAllNotificationMutation,
} from "../features/notification/notification";
import { useGetProfileQuery } from "../features/settings/settingApi";
import { baseURL } from "../utils/BaseURL";

const Navber = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const popupRef = useRef(null);
  const iconRef = useRef(null);
  const notificationContainerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const role = localStorage.getItem("role"); // "BUSINESS_OWNER", "DEPARTMENT_MANAGER", "HR"
  const { data: profile } = useGetProfileQuery();

  // Conditionally fetch notifications based on role
  const isBusinessOwner = role === "BUSINESS_OWNER";
  const { data: businessOwnerNotifications, isLoading: businessOwnerLoading, refetch: refetchBusinessOwner } =
    useGetBusinessOwnerNotificationQuery(undefined, { skip: !isBusinessOwner });

  const { data: hrNotifications, isLoading: hrLoading, refetch: refetchHR } =
    useGetHRNotificationQuery(undefined, { skip: isBusinessOwner });

  // Conditionally use the appropriate read all mutation based on role
  const [readBusinessOwnerAll, { isLoading: readBusinessOwnerLoading }] = useReadBusinessOwnerAllNotificationMutation();
  const [readHRAll, { isLoading: readHRAllLoading }] = useReadHRAllNotificationMutation();

  // Determine which data to use based on role
  const notificationsData = isBusinessOwner ? businessOwnerNotifications : hrNotifications;
  const isLoading = isBusinessOwner ? businessOwnerLoading : hrLoading;
  const refetch = isBusinessOwner ? refetchBusinessOwner : refetchHR;

  // Extract notifications and calculate unread count
  const notifications = notificationsData || [];

  const unreadCount = notifications?.data?.result?.filter(notif => !notif.read).length;

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Socket connection
  useEffect(() => {
    socketRef.current = io(baseURL);
    socketRef.current.on("connect", () => console.log("Socket connected"));

    const handleNewNotification = () => {
      refetch();
      setCurrentTime(new Date());
      if (notificationContainerRef.current && visible) {
        notificationContainerRef.current.scrollTop = 0;
      }
    };

    const userId = localStorage.getItem("businessLoginId");
    if (userId) {
      socketRef.current.on(`notification::${userId}`, handleNewNotification);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [refetch, visible]);

  useEffect(() => {
    if (!isLoading) setLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (visible) {
      refetch();
      setCurrentTime(new Date());
      if (notificationContainerRef.current) {
        notificationContainerRef.current.scrollTop = 0;
      }
    }
  }, [visible, refetch]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const searchQuery = encodeURIComponent(e.target.value);
    const path = location.pathname;
    if (!e.target.value) {
      navigate(path);
    } else {
      navigate(`${path}?search=${searchQuery}`);
    }
  };

  const handleNotificationClick = async (notification) => {
    console.log("Notification clicked:", notification);
  };

  const handleViewAllNotifications = () => {
    setVisible(false);
    navigate("/notification");
  };

  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return "Just now";
    return moment(timestamp).add(6, "hours").fromNow(); // BD Time
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case "ALERT": return "red";
      case "INFO": return "blue";
      case "SUCCESS": return "green";
      case "BUSINESS_OWNER": return "purple";
      default: return "gray";
    }
  };

  const markAllAsRead = async () => {
    try {
      if (isBusinessOwner) {
        await readBusinessOwnerAll().unwrap();
      } else {
        await readHRAll().unwrap();
      }
      refetch();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };




  const popupNotifications = notifications?.data?.result?.slice(0, 3);
  const totalNotifications = popupNotifications?.length;
  const hasMoreNotifications = totalNotifications > 3;

  return (
    <div className="flex items-center justify-between border-b py-5 px-6 bg-white  relative">
      {/* Hamburger Menu for Mobile */}
      <button
        className="lg:hidden p-2 text-2xl text-gray-700"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Search Bar (Conditional) */}
      {["/employee-management", "/all-user"].includes(location.pathname) && (
        <div className="flex-1 mx-4 lg:mx-0 lg:w-7/12">
          <Input
            size="large"
            onChange={handleSearch}
            placeholder="Search Here..."
            style={{ borderColor: "#336C79", color: "#333" }}
            suffix={
              <CiSearch className="text-2xl text-opacity-50 text-textPrimary" />
            }
          />
        </div>
      )}

      {/* User & Notification */}
      <div className="flex items-center justify-end gap-5 flex-1">
        <div
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="hidden sm:inline text-gray-700">
            Hello, <b>{profile?.data?.name || "User"}</b>
          </span>
          <Avatar
            src={
              profile?.data?.profileImage
                ? `${baseURL}${profile?.data?.profileImage}`
                : `/avator2.png`
            }
            size={35}
          />
        </div>

        <Badge
          count={unreadCount}
          className="cursor-pointer"
          onClick={() => setVisible(!visible)}
          ref={iconRef}
        >
          <BellOutlined className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300" />
        </Badge>

        {/* Notification Dropdown */}
        {visible && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 top-16 bg-white border border-gray-200 shadow-xl w-80 rounded-xl overflow-hidden z-50 lg:right-6 lg:top-14"
          >
            <Card
              title={
                <div className="flex justify-between items-center">
                  <span>Notifications</span>
                  {totalNotifications > 0 && (
                    <span className="text-sm text-gray-500">
                      {hasMoreNotifications
                        ? `3 of ${totalNotifications}`
                        : `${totalNotifications} total`}
                    </span>
                  )}
                </div>
              }
              className="p-0"
              extra={
                unreadCount > 0 && (
                  <Button
                    size="small"
                    type="link"
                    onClick={markAllAsRead}
                    loading={isBusinessOwner ? readBusinessOwnerLoading : readHRAllLoading}
                  >
                    Mark all read
                  </Button>
                )
              }
            >
              <div
                ref={notificationContainerRef}
                className="max-h-80 overflow-y-auto custom-scrollbar"
              >
                {loading ? (
                  <div className="flex justify-center py-4"><Spin /></div>
                ) : popupNotifications.length === 0 ? (
                  <div className="text-center text-gray-500 py-6">
                    <img src="/icons/notification.png" width={80} alt="No notifications" className="mx-auto mb-2" />
                    <p className="text-sm">No notifications yet</p>
                  </div>
                ) : (
                  popupNotifications.map((notif) => (
                    <div
                      key={notif._id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? "bg-blue-50" : ""}`}
                      onClick={() => handleNotificationClick(notif)}
                    >
                      <div className="flex justify-between mb-1">
                        <h4 className={`text-sm font-medium ${!notif.read ? "text-blue-600" : "text-gray-800"}`}>
                          {notif.title}
                        </h4>
                        <span className="text-xs text-gray-500">{formatTime(notif.createdAt)}</span>
                      </div>
                      <p className={`text-sm mb-2 ${!notif.read ? "font-medium" : "text-gray-600"}`}>
                        {notif.message}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>{!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}</div>
                        <Tag color={getTypeColor(notif.type)} style={{ fontSize: "10px" }}>
                          {notif.type?.replace('_', ' ') || 'INFO'}
                        </Tag>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {(popupNotifications.length > 0 || hasMoreNotifications) && (
                <div className="border-t bg-gray-50 p-3">
                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={handleViewAllNotifications}
                  >
                    {hasMoreNotifications
                      ? `View All (${totalNotifications})`
                      : "View All"}
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navber;