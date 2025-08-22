import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Spin, Tag } from "antd";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import moment from "moment";
import io from "socket.io-client";
import { useGetNotificationQuery, useReadAllNotificationMutation } from '../features/notification/notification';
import { useGetProfileQuery } from '../features/settings/settingApi';
import { baseURL } from "../utils/BaseURL";

const NotificationPopup = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

  const { data: profile } = useGetProfileQuery();

  const { data: notificationsData, refetch, isLoading } = useGetNotificationQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  console.log("Notifications Data:", notificationsData?.data?.result);
  const [readAllNotification, { isLoading: readAllLoading }] = useReadAllNotificationMutation();

  // Extract notifications and unread count from API response
  const notifications = notificationsData?.data?.result || [];
  const unreadCount = notificationsData?.data?.unreadCount || 0;

  useEffect(() => {
    socketRef.current = io(baseURL);

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    const handleNewNotification = (notification) => {
      console.log("New notification received:", notification);
      // Refetch notifications when new one arrives
      refetch();
    };

    socketRef.current.on(`notification::${localStorage.getItem("businessLoginId")}`, handleNewNotification);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off(`notification::${localStorage.getItem("businessLoginId")}`, handleNewNotification);
        socketRef.current.disconnect();
      }
    };
  }, [refetch]);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const searchQuery = encodeURIComponent(e.target.value);
    if (!e.target.value) {
      if (path.pathname === "/order") {
        navigate("/order");
      } else if (path.pathname === "/earning") {
        navigate("/earning");
      }
    } else {
      if (path.pathname === "/business-management") {
        navigate(`/business-management?search=${searchQuery}`);
      } else if (path.pathname === "/earning") {
        navigate(`/earning?search=${searchQuery}`);
      }
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      // Handle navigation or any other action for the notification
      console.log("Notification clicked:", notification);

      // You can add navigation logic here based on notification type
      // For example:
      // if (notification.type === "BUSINESS_OWNER") {
      //   navigate("/dashboard");
      // }

    } catch (error) {
      console.error("Error handling notification click:", error);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";

    const bangladeshTime = moment(timestamp).add(6, 'hours');
    return bangladeshTime.fromNow();
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "ALERT":
        return "red";
      case "INFO":
        return "blue";
      case "SUCCESS":
        return "green";
      case "BUSINESS_OWNER":
        return "purple";
      default:
        return "gray";
    }
  };

  const markAllAsRead = async () => {
    try {
      console.log("Marking all notifications as read...");
      await readAllNotification().unwrap();
      console.log("All notifications marked as read");

      // Refetch to update the UI
      refetch();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pt-10">
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full p-10 bg-white border border-gray-200 rounded-xl"
      >
        <div>
          {/* Header with Mark All as Read button */}
          {notifications.length > 0 && unreadCount > 0 && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Notifications ({unreadCount} unread)
              </h3>
              <Button
                type="primary"
                size="small"
                onClick={markAllAsRead}
                loading={readAllLoading}
              >
                Mark All as Read
              </Button>
            </div>
          )}

          <div className="w-full cursor-pointer">
            {notifications.length === 0 ? (
              <div className="text-center text-gray-500">
                <div className="flex justify-center">
                  <img
                    src={"/icons/notification.png"}
                    width={100}
                    height={100}
                    alt="Notification Icon"
                  />
                </div>
                <h3 className="font-bold text-lg leading-[26px] pb-[5px]">
                  There's no notifications
                </h3>
                <p className="pb-[5px]">
                  Your notifications will appear on this page.
                </p>
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={notif._id || index}
                  className={`flex items-start p-3 transition duration-300 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notif.read ? "bg-blue-50" : ""
                    }`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-medium ${!notif.read ? "text-blue-600" : "text-gray-800"}`}>
                          {notif.title}
                        </h4>
                        {notif.type && (
                          <Tag color={getTypeColor(notif.type)} size="small">
                            {notif.type.replace('_', ' ')}
                          </Tag>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTime(notif.createdAt)}
                      </span>
                    </div>

                    <p className={`text-sm mb-2 ${!notif.read ? "font-medium text-gray-700" : "text-gray-600"}`}>
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {notif.read && (
                          <div className="flex items-center text-xs text-gray-500">
                            <CheckCircleOutlined className="mr-1" /> Read
                          </div>
                        )}
                        {!notif.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationPopup;