import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Spin, Tag, message } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import {
  useDeleteAllNotificationMutation,
  useDeleteSingleNotificationMutation,
  useGetBusinessOwnerNotificationQuery,
  useGetHRNotificationQuery,
  useReadBusinessOwnerAllNotificationMutation,
  useReadHRAllNotificationMutation
} from '../features/notification/notification';
import { useGetProfileQuery } from '../features/settings/settingApi';
import { baseURL } from "../utils/BaseURL";

const NotificationPopup = () => {
  const path = useLocation();
  const role = localStorage.getItem("role"); // "BUSINESS_OWNER", "DEPARTMENT_MANAGER", "HR"
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);
  const popupRef = useRef(null);
  const iconRef = useRef(null);

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

  const [deleteAllNotification, { isLoading: deleteAllLoading }] = useDeleteAllNotificationMutation();
  const [deleteSingleNotification, { isLoading: singleDeleteLoading }] = useDeleteSingleNotificationMutation();

  // Determine which data to use based on role
  const notificationsData = isBusinessOwner ? businessOwnerNotifications : hrNotifications;
  const isLoading = isBusinessOwner ? businessOwnerLoading : hrLoading;
  const refetch = isBusinessOwner ? refetchBusinessOwner : refetchHR;

  // Extract notifications and calculate unread count
  const notifications = notificationsData || [];


  const unreadCount = notifications?.data?.result?.filter(notif => !notif.read).length;

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

    socketRef.current.on(`notification::${localStorage.getItem("adminLoginId")}`, handleNewNotification);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect");
        socketRef.current.off(`notification::${localStorage.getItem("adminLoginId")}`, handleNewNotification);
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

      if (isBusinessOwner) {
        await readBusinessOwnerAll().unwrap();
      } else {
        await readHRAll().unwrap();
      }

      console.log("All notifications marked as read");
      message.success("All notifications marked as read");

      // Refetch to update the UI
      refetch();
    } catch (error) {
      console.error("Error marking all as read:", error);
      message.error("Failed to mark all as read");
    }
  };

  const deleteAllNotifications = async () => {
    try {
      console.log("Deleting all notifications...");
      await deleteAllNotification().unwrap();
      console.log("All notifications deleted");
      message.success("All notifications deleted");

      // Refetch to update the UI
      refetch();
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      message.error("Failed to delete all notifications");
    }
  };

  const deleteSingleNotif = async (id, e) => {
    e.stopPropagation(); // Prevent triggering the notification click
    try {
      console.log("Deleting notification with ID:", id);
      await deleteSingleNotification(id).unwrap();
      console.log("Notification deleted");
      message.success("Notification deleted");

      // Refetch to update the UI
      refetch();
    } catch (error) {
      console.error("Error deleting notification:", error);
      message.error("Failed to delete notification");
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
        className="w-full p-10 bg-white border border-gray-2 rounded-xl"
      >
        <div>
          {/* Header with action buttons */}
          {notifications?.data?.result.length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Notifications ({unreadCount} unread)
              </h3>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    type="primary"
                    size="small"
                    onClick={markAllAsRead}
                    loading={isBusinessOwner ? readBusinessOwnerLoading : readHRAllLoading}
                  >
                    Mark All as Read
                  </Button>
                )}
                <Popconfirm
                  title="Delete all notifications"
                  description="Are you sure you want to delete all notifications?"
                  onConfirm={deleteAllNotifications}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ loading: deleteAllLoading }}
                >
                  <Button
                    type="default"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                  >
                    Delete All
                  </Button>
                </Popconfirm>
              </div>
            </div>
          )}

          <div className="w-full cursor-pointer">
            {notifications?.data?.result.length === 0 ? (
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
              [...notifications?.data?.result]?.reverse()?.map((notif, index) => (
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
                      <Popconfirm
                        title="Delete notification"
                        description="Are you sure you want to delete this notification?"
                        onConfirm={(e) => deleteSingleNotif(notif._id, e)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ loading: singleDeleteLoading }}
                      >
                        <Button
                          type="text"
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </Popconfirm>
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